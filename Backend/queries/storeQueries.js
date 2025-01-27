const { ObjectId } = require("mongodb");
const { resHandler } = require("../middlewares/errorHandler");

const findStoreByGstNumber = async (ctx, gstNumber) => {
  try {
    const collection = ctx.db.collection("store");
    const result = await collection.findOne({ gstNumber });
    if (!result) {
      return resHandler(
        ctx,
        false,
        null,
        "Store not found with the given GST number"
      );
    }
    return result;
  } catch (err) {
    return resHandler(ctx, false, 500, err.message);
  }
};

const findStoreByAddress = async (ctx, gstNumber, address) => {
  try {
    const collection = ctx.db.collection("store");
    const store = await collection.findOne({ gstNumber, address });
    if (!store) {
      return resHandler(
        ctx,
        false,
        null,
        "Store not found with the given GST number and address"
      );
    }
    return store;
  } catch (err) {
    return resHandler(ctx, false, null, err.message);
  }
};

const insertNewStore = async (ctx, storeData) => {
  try {
    const collection = ctx.db.collection("store");
    const result = await collection.insertOne(storeData);
    if (!result.insertedId) {
      // return result
    }

    return result;
  } catch (err) {
    return resHandler(false, null, err.message);
  }
};

const findUserByEmail = async (ctx, email) => {
  try {
    const collection = ctx.db.collection("users");
    const user = await collection.findOne({ email });
    if (!user) {
      return resHandler(false, null, "User not found");
    }
    return user;
  } catch (err) {
    return resHandler(ctx, false, err.message, 500);
  }
};

const updateUserStore = async (ctx, userId, storeId) => {};

const findStoreById = async (ctx, storeId) => {};

const deleteStoreById = async (ctx, storeId) => {};

module.exports = {
  findStoreByGstNumber,
  findStoreByAddress,
  insertNewStore,
  findUserByEmail,
  updateUserStore,
  findStoreById,
  deleteStoreById,
};
