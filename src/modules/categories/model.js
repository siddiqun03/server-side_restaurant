const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  categoryName: String,
  categoryImg: String,
  productId: [
    {
      type: Schema.Types.ObjectId,
      ref: "foods",
    },
  ],
});

module.exports = model('category', categorySchema);
