const findUser = async (db, filter) => {
  const userCollection = db.collection("users");

  const user = await userCollection.findOne(filter);

  if (!user) return null;

  const { password, ...safeUser } = user;

  return {
    ...safeUser,
    password,
  };
};

// Create a new user
const createUser = async (db, userData) => {
  const userCollection = db.collection("users");

  const user = await userCollection.insertOne(userData);

  return user;
};

module.exports = { findUser, createUser };
