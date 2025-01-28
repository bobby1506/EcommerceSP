const { ObjectId } = require("mongodb");
const cloudinary = require("cloudinary");
const { resHandler } = require("../middlewares/errorHandler");
const { eventEmitter } = require("../middlewares/socketMiddleware");
// const { getData, setData, close, deleteCache } = require("../utils/redisUtils");

//create store for users
const createStore = async (ctx) => {
  const userId = ctx.state.user.email;

  let isTimeOver = false;
  const TIME = 1 * 1000;

  const timeout = setTimeout(() => {
    (isTimeOver = true),
      eventEmitter(userId, "delayRes", {
        message: "Too long time taken",
      });
  }, TIME);

  try {
    console.log(ctx.request.body);
    // console.log(ctx.request.files);
    console.log("first");
    console.log(ctx.request.files.logo);
    const myCloud = await cloudinary.v2.uploader.upload(
      ctx.request.files.logo.filepath,
      {
        folder: "EcommerceSP",
        width: 150,
        crop: "scale",
      }
    );
    console.log("second");
    const {
      storeName,
      ownerName,
      address,
      description,
      category,
      openTime,
      closeTime,
      mediaLinks,
      gstNumber,
      isBranch,
      upiId,

      // credits,
    } = ctx.request.body;
    console.log("third");

    //validations rahe gaye

    //one way
    // const db = await connectDB();
    // const collectionStore = db.collection("store");

    const collectionStore = ctx.db.collection("store");
    const collectionUser = ctx.db.collection("users");

    const storeExisting = await collectionStore.findOne({
      gstNumber,
    });
    console.log("fourth");

    if (storeExisting) {
      if (isBranch) {
        const existingBranch = await collectionStore.findOne({
          gstNumber,
          address,
        });

        if (existingBranch) {
          clearTimeout(timeout);
          (ctx.status = 400),
            (ctx.body = {
              success: true,
              message: "A branch with same number and address already exists",
            });
          return;
        }
      } else {
        clearTimeout(timeout);
        (ctx.status = 400),
          (ctx.body = {
            success: false,
            message: "This GST number is already resgistered",
          });
        return;
      }
    }

    console.log("fifth");

    const newStore = {
      storeName,
      ownerName,
      address,
      description,
      logo: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      mediaLinks,
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

    console.log("Hello userid se phele");
    const userId = ctx.state.user?.email;
    if (!userId) {
      return;
    }
    console.log(userId);

    const result = await collectionStore.insertOne(newStore);
    console.log("Update se phele");
    // const findObj = await collectionStore.findOne({ email: userId });
    // console.dir({ findObj }, { depth: null });
    const updatedData = await collectionUser.updateOne(
      {
        email: userId,
      },
      {
        $set: {
          isSeller: true,
          storeId: result.insertedId,
        },
      }
    );

    clearTimeout(timeout);

    if (isTimeOver) {
      eventEmitter(userId, "resultRes", {
        success: true,
        message: "Store created via socket",
        store: { ...newStore },
      });
    } else {
      console.log("UpdatedData", updatedData);
      resHandler(ctx, true, "Store created via api", 201);
    }

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

    if (isTimeOver) {
      resHandler(ctx, false, "Internal server error by socket", 500);
    } else {
      resHandler(ctx, false, "Internal server error by api", 500);
    }
    // error(ctx, 500, "Internal server error");
  }
};

//Normal store listing
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
    //two way
    const collectionStore = ctx.db.collection("store");
    const store = await collectionStore.find().toArray();
    console.log(store);

    // await setData(redisKey, store, 3600);

    ctx.status = 200;
    ctx.body = {
      message: "Store list fetch successfully",
      store,
    };
  } catch (err) {
    console.log(500, "Internal server error");
    (ctx.status = 500),
      (ctx.body = {
        success: false,
        message: err,
      });
  }
};

//store owner store details
const ownerDashboardDetail = async (ctx) => {
  try {
    // const userId = ctx.state.user;
    console.log("Hello userid se phele");
    const userId = ctx.state.user?.id;
    console.log("hello", userId);
    // if (!userId) {
    //   return;
    // }
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

    // const db = await dbConnect();
    const userCollection = await ctx.db.collection("users");
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });
    console.log(user);
    const storeId = user.storeId;
    const storeCollection = ctx.db.collection("store");
    const store = await storeCollection.findOne({ _id: storeId });
    console.log(store, "store");

    if (!store) {
      console.log("store not found");
      // error(ctx, 404, "Store not found");
    }
    // await setData(redisKey, store, 3600);

    ctx.status = 200;
    ctx.body = {
      message: "Store details fetched successfully",
      store,
    };
  } catch (err) {
    // error(500, "Internal Server Error");
    console.log(err);
  }
};

//update store
const updateStore = async (ctx) => {
  console.log("first");
  try {
    console.log("first");
    const { storeId } = ctx.params;
    const userId = ctx.state.user?.id;
    const userCollection = ctx.db.collection("users");
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return;
    }
    console.log(user);

    const OwnerstoreId = user.storeId;

    if (OwnerstoreId != storeId) {
      console.log("You are a hacker");
      return;
    }

    if (!storeId) {
      console.log("Store id required");
      (ctx.status = 404),
        (ctx.body = {
          message: "Store id required",
          success: false,
        });
      return;
    }

    const updatedData = ctx.request.body;
    console.log(updatedData);

    const storeCollection = ctx.db.collection("store");

    const updatedDoc = await storeCollection.updateOne(
      {
        _id: new ObjectId(storeId),
      },
      {
        $set: updatedData,
      }
    );

    console.log(updatedDoc);
    if (updatedDoc.modifiedCount === 0) {
      return resHandler(ctx, false, "Samee name already there", 404);
    }
    resHandler(ctx, true, "Store updated successfully", 200);
  } catch (err) {
    console.log(err);
    resHandler(ctx, false, "Store updation failed", 403);
  }
};

//store delete
const deleteStoreOwner = async (ctx) => {
  try {
    const { storeId } = ctx.params;
    const userId = ctx.state.user?.id;
    const userCollection = ctx.db.collection("users");
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return;
    }

    const OwnerstoreId = user.storeId;

    if (OwnerstoreId.toString() != storeId.toString()) {
      console.log("You are a hacker");
      return;
    }

    if (!storeId) {
      console.log("Store id required");
      (ctx.status = 404),
        (ctx.body = {
          message: "Store id required",
          success: false,
        });
      return;
    }

    const storeCollection = ctx.db.collection("store");
    const deletedStore = await storeCollection.deleteOne({
      _id: new ObjectId(storeId),
    });

    if (deletedStore.deletedCount == 0) {
      (ctx.status = 403),
        (ctx.body = {
          message: "Store not found",
          success: false,
        });
      return;
    }

    ctx.status = 200;
    ctx.body = {
      message: "Store deleted successfully",
      success: true,
    };
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.body = {
      message: "Internal error",
      success: false,
    };
  }
};

module.exports = {
  createStore,
  storeList,
  ownerDashboardDetail,
  updateStore,
  deleteStoreOwner,
};
