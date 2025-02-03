const bcrypt = require("bcrypt");
const { findUser } = require("../queries/userQueries");

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
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    email,
  };
  return null;
};

const isSellerValidator = (ctx) => {
  let { isSeller } = ctx.request.body;
  const emptyError = isEmpty(isSeller, "seller");
  if (emptyError) return emptyError;
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    isSeller,
  };
  return null;
};

const passwordValidator = (ctx) => {
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

const passwordMatchValidator = async (ctx) => {
  let { password, email } = ctx.state.shared;
  const user = await findUser(ctx, { email });
  const ismatchPassword = await bcrypt.compare(password, user.password);
  if (!ismatchPassword) {
    return {
      field: "email",
      message: "Enter a valid email address",
    };
  }
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
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    username: username.trim(),
  };
  return null;
};

const isuserExistValidator = async (ctx) => {
  const { email } = ctx.state.shared;
  const userCollection = ctx.db.collection("users");
  const user = await userCollection.findOne({ email });
  if (!user) {
    return {
      field: "user",
      message: "User not exist",
    };
  }
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    user,
  };
  return null;
};

const userExist = async (ctx) => {
  const { email } = ctx.state.shared;
  const userCollection = ctx.db.collection("users");
  const user = await userCollection.findOne({ email });
  if (user) {
    return {
      field: "userExist",
      message: "User already exist",
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
  passwordValidator,
  passwordMatchValidator,
  isSellerValidator,
  isuserExistValidator,
  userExist,
};
