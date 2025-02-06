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
        "Store not found with the given GST number",
        401
      );
    }
    return result;
  } catch (err) {
    return resHandler(ctx, false, err.message, 500);
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
        "Store not found with the given GST number and address",
        404
      );
    }
    return store;
  } catch (err) {
    return resHandler(ctx, false, err.message, 500);
  }
};

const insertNewStore = async (ctx, storeData) => {
  try {
    const collection = ctx.db.collection("store");
    const result = await collection.insertOne(storeData);
    if (!result.insertedId) {
    }
    return result;
  } catch (err) {
    return resHandler(ctx, false, err.message, 500);
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

const updateUserStore = async (ctx, userId, storeId) => {
  const collectionUser = ctx.db.collection("users");
  const updatedData = await collectionUser.updateOne(
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
  return updatedData;
};

const findStoreById = async (ctx, storeId) => {
  const storeCollection = ctx.db.collection("store");
  const result = await storeCollection.findOne({ _id: storeId });
  return result;
};

const deleteStoreById = async (ctx, storeId) => {
  const storeCollection = ctx.db.collection("store");
  return await storeCollection.deleteOne({
    _id: new ObjectId(storeId),
  });
};

const updatedStore = async (ctx, updatedData, storeId) => {
  const storeCollection = ctx.db.collection("store");
  return await storeCollection.updateOne(
    {
      _id: new ObjectId(storeId),
    },
    { $set: updatedData }
  );
};

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
