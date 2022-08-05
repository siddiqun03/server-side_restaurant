const { generateToken } = require("../../utils/generateToken");
const model = require("./model");

module.exports = {
  Query: {
    getFoods: async (_, {}) => {
      try {
        const foods = await model.find();

        return foods;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    createFood: async (_, { createFood: { name, price, img } }) => {
      if (!name) throw new Error("invalid name");
      if (!img) throw new Error("invalid img");
      if (price < 0) throw new Error("invalid price");

      const newFood = new model({
        foodName: name.trim(),
        foodPrice: price * 1,
        foodImg: img.trim(),
      });
      const res = await newFood.save();
      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
  Food: {
    id: (global) => global.id,
    name: (global) => global.foodName,
    price: (global) => global.foodPrice,
    img: (global) => global.foodImg,
  },
};
