const {
  isEmpty,
  isValidEmail,
  isValidPassword,
} = require("../sharedFunction/authShared");

const emailValidator = (ctx) => {
  let { email } = ctx.request.body;

  const emptyError = isEmpty(email, "email");
  if (emptyError) return emptyError;

  email = email.trim();

  if (!isValidEmail(email)) {
    return {
      field: "email",
      message: "Enter a valid email address",
    };
  }

  // Storing valid email in shared state for further processing
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    email,
  };

  return null;
};

//password validators
const passwordValidator = (ctx) => {
  let { password } = ctx.request.body;

  const emptyError = isEmpty(password, "password");
  if (emptyError) return emptyError;

  password = password.trim();

  if (!isValidPassword(password)) {
    return {
      field: "password",
      message:
        "Password must be at least 8 characters long, include a number, an uppercase, and a lowercase letter",
    };
  }

  // Storing valid password in shared state for further processing
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    password,
  };

  return null;
};

const usernameValidator = (ctx) => {
  const { username } = ctx.request.body;

  const emptyError = isEmpty(username, "username");
  if (emptyError) return emptyError;

  // Storing valid username in shared state for further processing
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    username: username.trim(),
  };

  return null;
};

//userId validator
const getUserValidator = (ctx) => {
  const userId = ctx.state.user?.id;

  // Validate if userId exists
  if (isEmpty(userId, "userId")) {
    return {
      field: "userId",
      message: "User ID is required to fetch user details",
    };
  }

  // If all validations pass, store userId in shared state
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    userId,
  };

  return null;
};

module.exports = {
  emailValidator,
  passwordValidator,
  usernameValidator,
  getUserValidator,
};
