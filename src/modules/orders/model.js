const { model, Schema } = require("mongoose");

const ordersSchema = new Schema({
  userName: String,
  phoneNumber: Number,
  orders: [
    {
      foodName: String,
      foodPrice: Number,
      foodCount: Number,
    },
  ],
});

module.exports = model("orders", ordersSchema);
