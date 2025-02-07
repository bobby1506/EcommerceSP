const { client } = require("../config/db");

const userCollection = client.db(process.env.DB_NAME).collection("users");

const findUser = async (ctx, filter) => await userCollection.findOne(filter);

const createUser = async (ctx, userData) =>
  await userCollection.insertOne(userData);

module.exports = { findUser, createUser };
