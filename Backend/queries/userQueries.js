const findUser = async (ctx, filter) => {
  const userCollection = ctx.db.collection("users");
  const user = await userCollection.findOne(filter);
  return user;
};

const createUser = async (ctx, userData) => {
  const userCollection = ctx.db.collection("users");
  const user = await userCollection.insertOne(userData);
  return user;
};

module.exports = { findUser, createUser };
