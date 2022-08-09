const { hash, compare } = require("bcrypt");
const { UserInputError } = require("apollo-server");
const User = require("./model");
const { generateToken } = require("../../utils/generateToken");
const {
  loginValidate,
  validateRegisterInput,
} = require("../../utils/validators");

module.exports = {
  Mutation: {
    login: async (_, { user_name, password }) => {
      const { errors, valid } = loginValidate(user_name, password);

      if (!valid) throw new UserInputError("Errors", { errors });

      const user = await User.findOne({ username: user_name });
      if (!user) {
        errors.general = "Wrong Username or Password";
        throw new UserInputError("Wrong credentials", { errors });
      }

      const mutch = compare(password, user.password);
      if (!mutch) {
        errors.general = "Wrong Username or Password";
        throw new UserInputError("Wrong Credentials", { errors });
      }
      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    register: async (
      _,
      { registerInput: { user_name, user_phone, password, confirm_password } }
    ) => {
      console.log(user_name, user_phone, password, confirm_password);
      const { errors, valid } = validateRegisterInput(
        user_name,
        password,
        confirm_password
      );

      if (!valid) throw new UserInputError("Errors", { errors });

      const user = await User.findOne({ username: user_name });
      if (user)
        throw new UserInputError("Username is taken", {
          errors: {
            user_name: "This username is taken",
          },
        });

      password = await hash(password, 12);

      const newUser = new User({
        username: user_name,
        password,
        role: "User",
        userPhone: user_phone,
      });

      const res = await newUser.save();
      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
        userPhone: res.userPhone,
      };
    },
  },
  User: {
    id: (global) => global.id,
    user_name: (global) => global.username,
    token: (global) => global.token,
    role: (global) => global.role,
    user_phone: (global) => global.userPhone,
  },
};
