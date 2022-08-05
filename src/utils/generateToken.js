require("dotenv").config();
const { sign } = require("jsonwebtoken");

module.exports.generateToken = (data) => {
  return sign(
    {
      id: data.id,
      user_name: data.username,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "24h",
    }
  );
};