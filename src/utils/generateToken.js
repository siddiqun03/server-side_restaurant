require("dotenv").config();
const { sign } = require("jsonwebtoken");

module.exports.generateToken = (data) => {
  return sign(
    {
      id: data.id,
      user_name: data.username,
      role: data.role,
      phone_number: data.userPhone,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "24h",
    }
  );
};
