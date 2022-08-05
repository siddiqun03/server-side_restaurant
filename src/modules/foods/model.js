const { model, Schema } = require("mongoose");

const foodSchema = new Schema({
  foodName: String,
  foodPrice: Number,
});

module.exports = model("foods", foodSchema);
