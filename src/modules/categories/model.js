const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  categoryName: String,
  categoryImg: String,
  restaurantID: String,
});

module.exports = model("category", categorySchema);
