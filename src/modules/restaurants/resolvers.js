const { validateCreateRestaurant } = require("../../utils/validators");
const { UserInputError } = require("apollo-server");
const model = require("./model");
const checkAuth = require("../../utils/check.auth");
const categoryModel = require("../categories/model");

module.exports = {
  Query: {
    getRestaurants: async (_, {}, context) => {
      try {
        console.log("1 ok", context)

        if (true) {
          const restaurants = await model.find();

          return restaurants;
        }
        return "You are not user";
      } catch (err) {
        throw new Error(err);
      }
    },
    getRestaurant: async (_, { restaurantID: id }, context) => {
      try {
        const user = checkAuth(context);
        if (user) {
          const restaurant = await model.findById({ id });

          return restaurant;
        }
        return "You are not user";
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    createRestaurant: async (
      _,
      { restaurantInput: { name, img, brends } },
      context
    ) => {
      const user = checkAuth(context);

      if (user) {
        const { valid, errors } = validateCreateRestaurant(name, img, brends);

        if (!valid) throw new UserInputError("Error", { errors });

        const restaurant = await model.findOne({ name });
        if (restaurant)
          throw new UserInputError("Category name is taken", {
            errors: {
              name: "This category name is taken",
            },
          });

        const newRestaurant = new model({
          restaurantName: name.trim(),
          restaurantImg: img.trim(),
        });

        const res = await newRestaurant.save();

        return {
          ...res._doc,
          id: res._id,
        };
      }
      return { Error: { message: "You are not admin" } };
    },
    deleteRestaurant: async (_, { restaurantID: id }, context) => {
      try {
        const user = checkAuth(context);

        if (user) {
          const res = await model.findByIdAndDelete({ id });

          return "Successfully deleted!";
        }

        return "You are not admin";
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Restaurant: {
    id: (global) => global.id,
    name: (global) => global.restaurantName,
    img: (global) => global.restaurantImg,
  },
};
