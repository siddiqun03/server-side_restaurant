const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  role: String,
});

module.exports = model("User", userSchema);
