const { ObjectId } = require("mongodb");
const { resHandler } = require("../middlewares/errorHandler");
const { eventEmitter } = require("../utils/socket");
// const { uploadProductLogo } = require("../queries/productQueries");
const {
  deleteStoreById,
  insertNewStore,
  updateUserStore,
  findStoreByGstNumber,
  findStoreById,
  updatedStore,
} = require("../queries/storeQueries");
const { findUser } = require("../queries/userQueries");
const { client } = require("../config/db");
const storeCollection = client.db(process.env.DB_NAME).collection("store");
// const { getData, setData, close, deleteCache } = require("../utils/redisUtils");

const createStore = async (ctx) => {
  const userId = ctx.state.user.email;

  let isTimeOver = false;
  let isResponseSent = false;

  const TIME = 1 * 1000;

  const timeout = setTimeout(() => {
    console.log("Enter in settimeout");
    isTimeOver = true;
    if (!isResponseSent) {
      eventEmitter(userId, "delayRes", {
        message: "Too long time taken",
        success: false,
        status: 200,
      });
    }
    isResponseSent = true;
  }, TIME);

  try {
    // const myCloud = await uploadProductLogo(ctx.request.files.logo.filepath);

    const {
      storeName,
      ownerName,
      address,
      description,
      category,
      openTime,
      closeTime,
      gstNumber,
      isBranch,
      upiId,
    } = ctx.state.shared;

    const { logo } = ctx.request.body;

    const store = await findStoreByGstNumber(ctx, gstNumber);
    // if (storeExisting) {
    //   if (isBranch) {
    //     const existingBranch = await collectionStore.findOne({
    //       gstNumber,
    //       address,
    //     });

    //     if (existingBranch) {
    //       clearTimeout(timeout);
    //       (ctx.status = 400),
    //         (ctx.body = {
    //           success: true,
    //           message: "A branch with same number and address already exists",
    //         });
    //     }
    //     return;
    //   }
    // } else {
    //   clearTimeout(timeout);
    //   (ctx.status = 400),
    //     (ctx.body = {
    //       success: false,
    //       message: "This GST number is already resgistered",
    //     });
    //   return;
    // }

    const newStore = {
      storeName,
      ownerName,
      address,
      description,
      logo,
      category,
      openTime,
      closeTime,
      gstNumber,
      upiId,
      isBranch: isBranch || false,
      createdAt: new Date(),
      Balance: 0,
      Credits: 0,
    };

    const userId = ctx.state.user?.email;
    if (!userId) {
      return resHandler(ctx, false, "Userid not valid", 403);
    }

    const result = await insertNewStore(ctx, newStore);
    await updateUserStore(ctx, userId, result.insertedId);

    clearTimeout(timeout);

    if (isTimeOver) {
      eventEmitter(userId, "resultRes", {
        success: true,
        message: "Store created via socket",
        store: newStore,
      });
      resHandler(ctx, true, "Store created via socket", 201, {
        isSocket: true,
      });
    }

    resHandler(ctx, true, "Store created via api", 201, {
      store: newStore,
      isSocket: false,
    });

    //invalidate cache data
    // await deleteCache("storeList");

    // ctx.status = 201;
    // ctx.body = {
    //   success: true,
    //   message: "Store created successfully",
    //   store: { ...newStore, _id: result.insertedId },
    // };
  } catch (err) {
    clearTimeout(timeout);
    console.log("Registration Failed", err.message);
    resHandler(ctx, false, "Internal server error by socket", 500);
  }
};

const storeList = async (ctx) => {
  try {
    // const redisKey = "storelist";
    //one way
    // const db = await connectDB();
    // const collectionStore = db.collection("store");

    // const cachedStore = await getData(redisKey);
    // if (cachedStore) {
    //   ctx.status = 200;
    //   ctx.body = {
    //     message: "Store list fetched successfully",
    //     store: cachedStore,
    //   };
    //   return;
    // }
    const store = await storeCollection.find().toArray();
    // await setData(redisKey, store, 3600);
    resHandler(ctx, true, "Store list fetch successfully", 200);
    ctx.body = {
      store,
    };
  } catch (err) {
    resHandler(ctx, false, "Internal server error", 500);
  }
};

const ownerDashboardDetail = async (ctx) => {
  try {
    const userId = ctx.state.user?.id;
    if (!userId) {
      return resHandler(ctx, false, "User not found", 403);
    }
    // console.log(userId);
    // const redisKey = `storeDetail:${storeId}`;
    // const cachedData = await getData(redisKey);
    // if (cachedData) {
    //   ctx.status = 200;
    //   ctx.body = {
    //     message: "Store detail fetched",
    //     store: cachedData,
    //   };
    //   return;
    // }

    const user = await findUser(ctx, { _id: new ObjectId(userId) });
    const storeId = user.storeId;
    const store = await findStoreById(ctx, storeId);
    if (!store) {
      resHandler(ctx, false, "Store not found", 404);
    }
    // await setData(redisKey, store, 3600);
    resHandler(ctx, true, "Store details fetched successfully", 200);
    ctx.body = {
      store,
    };
  } catch (err) {
    resHandler(ctx, false, err, 500);
  }
};

const updateStore = async (ctx) => {
  try {
    const userId = ctx.state.user?.id;
    const { storeId } = ctx.state.shared;
    const user = await findUser(ctx, { _id: new ObjectId(userId) });
    if (!user) {
      return resHandler(ctx, false, "User not found", 404);
    }
    const OwnerstoreId = user.storeId;
    if (OwnerstoreId.toString() != storeId.toString()) {
      return resHandler(ctx, false, "You are a hacker", 403);
    }
    if (!storeId) {
      return resHandler(ctx, false, "store id required", 404);
    }
    const updatedData = ctx.request.body;
    const updatedDoc = await updatedStore(ctx, updatedData, storeId);

    if (updatedDoc.modifiedCount === 0) {
      return resHandler(ctx, false, "Samee name already there", 404);
    }
    resHandler(ctx, true, "Store updated successfully", 200);
  } catch (err) {
    console.log(err);
    resHandler(ctx, false, "Store updation failed", 403);
  }
};

const deleteStoreOwner = async (ctx) => {
  try {
    const userId = ctx.state.user?.id;
    const { storeId } = ctx.state.shared;
    const user = await findUser(ctx, { _id: new ObjectId(userId) });
    if (!user) {
      return resHandler(ctx, false, "User not found", 404);
    }
    const OwnerstoreId = user.storeId;
    if (OwnerstoreId.toString() != storeId.toString()) {
      console.log("You are a hacker");
      return;
    }
    if (!storeId) {
      return resHandler(ctx, false, "Store id required", 404);
    }
    const deletedStore = await deleteStoreById(ctx, storeId);
    if (deletedStore.deletedCount == 0) {
      return resHandler(ctx, false, "Store not found", 403);
    }
    resHandler(ctx, true, "Store deleted successfully", 200);
  } catch (err) {
    resHandler(ctx, false, "Internal server error", 500);
  }
};

module.exports = {
  createStore,
  storeList,
  ownerDashboardDetail,
  updateStore,
  deleteStoreOwner,
};
