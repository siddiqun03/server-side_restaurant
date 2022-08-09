const { UserInputError } = require("apollo-server");
const checkAuth = require("../../utils/check.auth");
const { validateCreateCategory } = require("../../utils/validators");
const model = require("./model");
const restaurantModel = require("../restaurants/model");

module.exports = {
  Query: {
    getRestaurantCategories: async (_, { restaurant_id }) => {
      const restaurant = await restaurantModel.findById(restaurant_id);
      if (restaurant) {
        const categories = await model.find();

        const data = categories.filter((e) => e.restaurantID == restaurant_id);

        return data;
      } else {
        return [];
      }
    },
  },
  Mutation: {
    createCategory: async (
      _,
      { categoryInput: { name, img, products, restaurant_id } },
      context
    ) => {
      const user = checkAuth(context);

      if (user && user?.role == "Admin") {
        const { errors, valid } = validateCreateCategory(
          name,
          img,
          products,
          restaurant_id
        );

        if (!valid) throw new UserInputError("Errors", { errors });

        if (restaurant_id.trim()) {
          const restaurant = await restaurantModel.findById(restaurant_id);
          if (restaurant)
            throw new UserInputError("Error", {
              error: "Restaurant does not exist!",
            });
        }

        const category = await model.findOne({ categoryName: name });

        if (category)
          throw new UserInputError("Category name is taken", {
            errors: {
              name: "This category name is taken",
            },
          });

        const newCategory = new model({
          categoryName: name.trim(),
          categoryImg: img.trim(),
          restaurantID: restaurant_id.trim(),
        });

        const res = await newCategory.save();

        return {
          ...res._doc,
          id: res._id,
        };
      }
      throw new UserInputError("Error", { error: "You are not admin" });
    },
    deleteCategory: async (_, { categoryID }, context) => {
      try {
        const user = checkAuth(context);

        if (user && user?.role == "Admin") {
          const res = await model.findByIdAndDelete(categoryID);
          return "Successfully deleted!";
        }

        return "You are not admin!";
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Category: {
    id: (global) => global.id,
    name: (global) => global.categoryName,
    img: (global) => global.categoryImg,
  },
};
