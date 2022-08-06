const checkAuth = require("../../utils/check.auth");
const model = require("./model");
const categoryModel = require("../categories/model");
const { UserInputError } = require("apollo-server");

module.exports = {
  Query: {
    getFood: async (_, { foodID }, context) => {
      try {
        const user = checkAuth(context);

        if (user) {
          const foods = await model.findById(foodID);

          return foods;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    getCategoryFoods: async (_, { category_id }, context) => {
      const user = checkAuth(context);

      if (user) {
        if (category_id) {
          const categoryFoods = await model.find({
            category_id: category_id.toString(),
          });

          const data = categoryFoods.filter((e) => e.categoryID == category_id);

          return data;
        }
      }
    },
  },
  Mutation: {
    createFood: async (
      _,
      { createFood: { name, price, img, category_id } },
      context
    ) => {
      const user = checkAuth(context);

      if (user && user.role == "Admin") {
        if (!name) throw new Error("Invalid name");

        if (!img) throw new Error("Invalid img");

        if (price < 0) throw new Error("Invalid price");

        if (category_id.trim() == "") throw new Error("Invalid ID");

        if (category_id.trim()) {
          const category = await categoryModel.findById(category_id);
          if (!category)
            throw new UserInputError("Error", {
              error: "Categoriy does not exist!",
            });
        }

        const newFood = new model({
          foodName: name.trim(),
          foodPrice: price * 1,
          foodImg: img.trim(),
          categoryID: category_id.trim(),
        });
        const res = await newFood.save();

        return {
          ...res._doc,
          id: res._id,
        };
      }
      throw new UserInputError("Error", {
        Error: { message: "You are not admin" },
      });
    },
    deleteFood: async (_, { foodID: id }, context) => {
      try {
        const user = checkAuth(context);

        if (user && user.role == "Admin") {
          const res = await model.findByIdAndDelete({ id });

          return "Successfully deleted!";
        }
        throw new Error({ Error: { message: "You are not admin" } });
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Food: {
    id: (global) => global.id,
    name: (global) => global.foodName,
    price: (global) => global.foodPrice,
    img: (global) => global.foodImg,
  },
};
