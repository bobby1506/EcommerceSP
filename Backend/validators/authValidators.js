const { resHandler } = require("../middlewares/errorHandler");
const { findUser } = require("../queries/userQueries");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

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

const passwordValidators = (ctx) => {
  let { password } = ctx.request.body;

  const emptyError = isEmpty(password, "password");
  if (emptyError) return emptyError;

  password = password.trim();

  if (!isValidPassword(password)) {
    return {
      field: "password",
      message:
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.",
    };
  }

  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    password,
  };

  return null;
};

//password validators
const passwordValidator = async (ctx) => {
  let { password, email } = ctx.request.body;
  console.log(ctx.request.body);

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

  const user = await findUser(ctx, { email });
  console.log(user, "user");

  const ismatchPassword = await bcrypt.compare(password, user.password);

  console.log("Hello4");

  if (!ismatchPassword) {
    resHandler(
      ctx,
      false,
      "Incorrect password",
      401,
      null,
      "Password mismatch in login."
    );
    return;
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
const getUserValidator = async (ctx) => {
  const userId = ctx.state.user?.id;

  if (isEmpty(userId, "userId")) {
    return {
      field: "userId",
      message: "User ID is required to fetch user details",
    };
  }

  const userCollection = ctx.db.collection("users");
  const user = await userCollection.findOne({ _id: new ObjectId(userId) });

  if (!user) {
    return {
      field: "user",
      message: "User not found",
    };
  }

  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    user,
  };

  return null;
};

module.exports = {
  emailValidator,
  passwordValidator,
  usernameValidator,
  getUserValidator,
  passwordValidators,
};
