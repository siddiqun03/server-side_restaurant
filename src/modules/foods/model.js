const { model, Schema } = require("mongoose");

const foodSchema = new Schema({
  foodName: String,
  foodPrice: Number,
  foodImg: String,
  categoryID: String,
});

module.exports = model("foods", foodSchema);
