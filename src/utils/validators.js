module.exports.loginValidate = (user_name, password) => {
  const errors = {};

  if (user_name.trim() === "") {
    errors.user_name = "Username must not be empty";
  }

  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateRegisterInput = (
  user_name,
  password,
  confirm_password
) => {
  const errors = {};
  if (user_name.trim() === "") {
    errors.user_name = "Username must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  } else if (password !== confirm_password) {
    errors.confirm_password = "Password must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
