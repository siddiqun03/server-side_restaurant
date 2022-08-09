// require modules
const userModule = require("./users");
const foodModule = require("./foods");
const categoriesModule = require("./categories");
const restaurantModule = require("./restaurants");
const ordersModule = require("./orders");

// export modules in arr
module.exports = [
  userModule,
  foodModule,
  categoriesModule,
  restaurantModule,
  ordersModule,
];
