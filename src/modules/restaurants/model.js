const { Schema, model } = require("mongoose");

const restaurantSchema = new Schema({
  restaurantName: String,
  restaurantImg: String,
});

module.exports = model("restaurant", restaurantSchema);
