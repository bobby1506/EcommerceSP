const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const { resHandler } = require("./errorHandler");
const { findUser } = require("../queries/userQueries");

//verify
const verifyToken = async (ctx, next) => {
  try {
    console.log("Hello");
    const token = ctx.cookies.get("authToken");

    console.log("Token", token);
    if (!token) {
      return resHandler(ctx, false, "Access denied, no token provided", 401);
    }

    console.log("Token ke baad");
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("verifiedToken", verifiedToken);
    ctx.state.user = verifiedToken;
    await next();
  } catch (err) {
    console.log("Token error", err);
    return resHandler(ctx, false, "Invalid or expired token", 401);
  }
};

//sellerAuth
const sellerAuth = async (ctx, next) => {
  try {
    const token = ctx.cookies.get("authToken");
    console.log("token", token);
    if (!token) {
      return resHandler(ctx, false, "Access denied. No token provided", 401);
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("verified token", verifiedToken);

    const userId = verifiedToken.id;
    console.log("userId", userId);

    const user = await findUser(
      ctx,
      { _id: new ObjectId(userId) },
      { isSeller: true }
    );

    if (!user || !user.isSeller) {
      return resHandler(ctx, false, "you are not a seller", 403);
    }

    ctx.state.user = verifiedToken;

    await next();
  } catch (err) {
    console.log(err);
    return resHandler(ctx, false, "Internal server error", 500);
  }
};

const userAuth = async (ctx, next) => {
  try {
    const token = ctx.cookies.get("authToken");

    if (!token) {
      return resHandler(ctx, false, "No token provided", 401);
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = verifiedToken.id;

    const user = await findUser(ctx, { _id: new ObjectId(userId) });

    if (!user || user.isSeller) {
      return resHandler(ctx, false, "you are a seller not a user", 403);
    }

    ctx.state.user = verifiedToken;
    await next();
  } catch (err) {
    console.error("User Auth error:", err);
    return resHandler(ctx, false, "Internal server error", 500);
  }
};

module.exports = { verifyToken, sellerAuth, userAuth };
