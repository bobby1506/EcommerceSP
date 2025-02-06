const bcrypt = require("bcrypt");
const { findUser } = require("../queries/userQueries");

const {
  isEmpty,
  isValidEmail,
  isValidPassword,
} = require("../sharedFunction/authShared");

const emailValidator = (ctx) => {
  const { email } = ctx.state.user;
  console.log(email, "email1");
  const emptyError = isEmpty(email, "email");
  if (emptyError) return emptyError;
  if (!isValidEmail(email)) {
    return {
      field: "email",
      message: "Enter a valid email address",
    };
  }
  console.log("good");
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    email,
  };
  return null;
};

const emailValidatorSignIn = (ctx) => {
  let { email } = ctx.request.body;
  console.log(email, "email1");
  const emptyError = isEmpty(email, "email");
  if (emptyError) return emptyError;
  if (!isValidEmail(email)) {
    return {
      field: "email",
      message: "Enter a valid email address",
    };
  }
  console.log("good");
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    email,
  };
  return null;
};

const isSellerValidator = (ctx) => {
  const { isSeller } = ctx.request.body;
  console.log(isSeller, "isSeller");
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
  console.log("password", password);
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
  const { email } = ctx.state.user;
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

const isuserExistValidatorSignIn = async (ctx) => {
  const { email } = ctx.request.body;
  const userCollection = ctx.db.collection("users");
  const user = await userCollection.findOne({ email: email });
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
  const { email } = ctx.request.body;
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
  emailValidatorSignIn,
  isuserExistValidatorSignIn,
};
