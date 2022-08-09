const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  role: String,
  userPhone: String,
});

module.exports = model("User", userSchema);
