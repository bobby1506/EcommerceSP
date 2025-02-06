const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwtUtils");
const { createUser, findUser } = require("../queries/userQueries");
const { resHandler } = require("../middlewares/errorHandler");

const registerUser = async (ctx) => {
  try {
    const { username, email, password, isSeller } = ctx.state.shared;
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
    const user = await createUser(ctx, newUser);
    if (!user.acknowledged)
      return resHandler(ctx, false, "User creation failed", 500);

    const userNew = await findUser(ctx, { email });
    if (!userNew) return resHandler(ctx, false, "User exist", 409);

    const token = generateToken(userNew);

    ctx.cookies.set("authToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
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
    return resHandler(
      ctx,
      false,
      "Internal server error",
      500,
      null,
      err.message
    );
  }
};

const login = async (ctx) => {
  try {
    let { password, email } = ctx.state.shared;
    const user = await findUser(ctx, { email });
    console.log(user);
    if (!user) {
      return resHandler(ctx, false, "User doesn't exist", 404);
    }
    const ismatchPassword = await bcrypt.compare(password, user.password);
    if (!ismatchPassword) {
      resHandler(ctx, false, "Invalid details", 400);
    }
    const token = generateToken(user);
    ctx.cookies.set("authToken", token, {
      httpOnly: true,
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
    return resHandler(
      ctx,
      false,
      "Internal server error",
      500,
      null,
      err.message
    );
  }
};

const getUser = async (ctx) => {
  try {
    const { user } = ctx.state.shared;
    console.log(user, "user");
    resHandler(ctx, true, "User fetched", 200, {
      user: {
        username: user.username,
        email: user.email,
        isSeller: user.isSeller,
      },
    });
  } catch (err) {
    return resHandler(
      ctx,
      false,
      "Internal server error",
      500,
      null,
      err.message
    );
  }
};

module.exports = { registerUser, login, getUser };
