const { ObjectId } = require("mongodb");
const { resHandler } = require("../middlewares/errorHandler");
const { client } = require("../config/db");

const DB_NAME = process.env.DB_NAME;
const storeCollection = client.db(DB_NAME).collection("store");
const userCollection = client.db(DB_NAME).collection("users");

const findStoreByGstNumber = async (ctx, gstNumber) => {
  const result = await storeCollection.findOne({ gstNumber });
  if (!result) {
    return resHandler(
      ctx,
      false,
      "Store not found with the given GST number",
      401
    );
  }
  return result;
};

const findStoreByAddress = async (ctx, gstNumber, address) => {
  const store = await storeCollection.findOne({ gstNumber, address });
  if (!store) {
    return resHandler(
      ctx,
      false,
      "Store not found with the given GST number and address",
      404
    );
  }
  return store;
};

const insertNewStore = async (ctx, storeData) =>
  await storeCollection.insertOne(storeData);

const findUserByEmail = async (ctx, email) => {
  const user = await userCollection.findOne({ email });
  if (!user) {
    return resHandler(false, null, "User not found");
  }
  return user;
};

const updateUserStore = async (ctx, userId, storeId) =>
  await userCollection.updateOne(
    {
      email: userId,
    },
    {
      $set: {
        isSeller: true,
        storeId: storeId,
      },
    }
  );

const findStoreById = async (ctx, storeId) =>
  await storeCollection.findOne({ _id: storeId });

const deleteStoreById = async (ctx, storeId) =>
  await storeCollection.deleteOne({
    _id: new ObjectId(storeId),
  });

const updatedStore = async (ctx, updatedData, storeId) =>
  await storeCollection.updateOne(
    {
      _id: new ObjectId(storeId),
    },
    { $set: updatedData }
  );

module.exports = {
  findStoreByGstNumber,
  findStoreByAddress,
  insertNewStore,
  findUserByEmail,
  updateUserStore,
  findStoreById,
  deleteStoreById,
  updatedStore,
};
