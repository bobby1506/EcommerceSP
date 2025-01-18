const jwt = require("jsonwebtoken");
const error = require("../middlewares/error");
const { ObjectId } = require("mongodb");
const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      // isSeller: user.isSeller || false,
      // storeId: user.storeId || null,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  return token;
};

//verify
const verifyToken = async (ctx, next) => {
  try {
    console.log("Hello");
    // const token = ctx.headers.authorization.split(" ")[0];
    const token = ctx.cookies.get("authToken");

    console.log("Token", token);
    if (!token) {
      // error(ctx, 401, "Access denied. No token provided");
      return;
    }
    console.log("Token ke baad");
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("verifiedToken", verifiedToken);
    ctx.state.user = verifiedToken;
    await next();
  } catch (err) {
    console.log("Token error");
    console.log(err);
    // error(ctx, 401, "Invalid or expired token");
  }
};

//sellerAuth
const sellerAuth = async (ctx, next) => {
  try {
    // const token = ctx.headers.authorization?.split(" ")[0];
    const token = ctx.cookies.get("authToken");
    console.log("token", token);
    if (!token) {
      console.log("User is not a seller");
      return;
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("verified token", verifiedToken);

    const userId = verifiedToken.id;
    console.log("userId", userId);

    const userCollection = ctx.db.collection("users");

    const checkSeller = await userCollection.findOne(
      { _id: new ObjectId(userId) },
      { isSeller: true }
    );
    console.log("checkSeller", checkSeller);

    if (!checkSeller) {
      (ctx.status = 403),
        (ctx.body = {
          message: "Access denied, you are not a seller",
        });
      return;
    }
    ctx.state.user = verifiedToken;

    await next();
  } catch (err) {
    console.log(err);
    error(ctx, 500, "Internal server error");
  }
};

module.exports = { generateToken, verifyToken, sellerAuth };
