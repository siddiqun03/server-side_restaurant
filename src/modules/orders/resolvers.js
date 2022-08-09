const model = require("./model");
const checkAuth = require("../../utils/check.auth");

module.exports = {
  Query: {
    getOrders: async (_, __) => {
      try {
        const orders = await model.find();

        return orders || [];
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    addOrder: async (_, { orderInput: data }, context) => {
      const user = checkAuth(context);
      if (user.role) {
        const newOrder = new model({
          id: user.id,
          userName: user.user_name,
          phoneNumber: user.phone_number,
          orders: data,
        });

        return newOrder;
      }
    },
  },
  order: {
    food_name: (global) => global.foodName,
    food_price: (global) => global.foodPrice,
    food_count: (global) => global.foodCount,
  },

  aboutOrders: {
    id: (global) => global.id,
    user_name: (global) => global.userName,
    phone_number: (global) => global.phoneNumber,
    orders: (global) => global.orders,
  },
};
