const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwtUtils");
const { ObjectId } = require("mongodb");
const { createUser, findUser } = require("../queries/userQueries");
const { resHandler } = require("../middlewares/errorHandler");

// const { close, getData, setData, deleteCache } = require("../utils/redisUtils");

//Registration API
const registerUser = async (ctx) => {
  try {
    console.log("Hello");
    const { username, email, password } = ctx.state.shared;
    const { isSeller } = ctx.request.body;
    console.log(isSeller);

    const userExist = await findUser(ctx, { email }); //validator

    const salt = 10;
    const hashed = await bcrypt.hash(password, salt);

    const newUser = {
      username,
      email,
      isSeller,
      storeId: null,
      password: hashed,
      createdAt: new Date(),
    };
    const user = await createUser(ctx.db, newUser);

    console.log("User", user);

    const userNew = await findUser(ctx, { email });

    const token = generateToken(userNew);

    ctx.cookies.set("authToken", token, {
      httpOnly: true, // Makes it inaccessible to client-side JavaScript
      // eslint-disable-next-line no-undef
      // secure: process.env.NODE_ENV === "production", // Ensures it's sent over HTTPS in production
      secure: false,
      sameSite: "none", // Protects against CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    resHandler(ctx, true, "User retrieved successfully", 200, {
      token,
      user: {
        id: userNew._id,
        username: userNew.username,
        email: userNew.email,
        isSeller: userNew.isSeller,
        storeId: newUser.storeId,
      },
    });
  } catch (err) {
    console.log("Registration Failed", err.message);
    resHandler(ctx, false, "Internal server error", 500, null, err.message);
  }
};

//login api
const login = async (ctx) => {
  try {
    console.log(ctx.request.body);
    const { email, password } = ctx.state.shared;
    console.log(email);
    console.log("Hello2");

    const user = await findUser(ctx, { email });

    console.log("Hello3");

    const token = generateToken(user);

    ctx.cookies.set("authToken", token, {
      httpOnly: true,
      // eslint-disable-next-line no-undef
      // secure: process.env.NODE_ENV === "production",
      secure: false,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    resHandler(ctx, true, "Login successfully", 200, {
      token,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        isSeller: user.isSeller,
        storeId: user.storeId,
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    resHandler(ctx, false, "Internal server error", 500, null, err.message);
  }
};

//logout
const logout = async (ctx) => {
  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "User logout successfully",
  };
};

//getUser

const getUser = async (ctx) => {
  try {
    console.log("Hello");

    const { user } = ctx.state.shared;
    console.log(user);
    // const user = await findUser(ctx.db, { _id: new ObjectId(userId) });

    resHandler(ctx, true, "User fetched", 200, {
      user: {
        username: user.username,
        email: user.email,
        isSeller: user.isSeller,
      },
    });
  } catch (err) {
    console.log("User fetched error", err);
    resHandler(ctx, false, "Internal server error", 500, null, err.message);
  }
};

module.exports = { registerUser, login, logout, getUser };
