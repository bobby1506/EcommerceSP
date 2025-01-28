const { ObjectId } = require("mongodb");
const { resHandler } = require("../middlewares/errorHandler");

const findUser = async (ctx, filter) => {
  const userCollection = ctx.db.collection("users");

  const user = await userCollection.findOne(filter);
  console.log(user);

  if (!user) return resHandler(ctx, false, "User exist", 401);

  // const { password, ...safeUser } = user;

  // return {
  //   ...safeUser,
  //   password,
  // };
  return user;
};

// Create a new user
const createUser = async (db, userData) => {
  const userCollection = db.collection("users");

  const user = await userCollection.insertOne(userData);

  return user;
};

module.exports = { findUser, createUser };
