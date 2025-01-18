const connectDB = require("../config/db");
const error = require("../middlewares/error");
const { ObjectId } = require("mongodb");
// const { getData, setData, close, deleteCache } = require("../utils/redisUtils");

//create store for users
const createStore = async (ctx) => {
  try {
    // const myCloud = await cloudinary.v2.uploader.upload(ctx.request.body.logo, {
    //   folder: "EcommerceSP",
    //   width: 150,
    //   crop: "scale",
    // });

    const {
      storeName,
      ownerName,
      address,
      description,
      category,
      timmings,
      mediaLinks,
      gstNumber,
      isBranch,
      upiId,
    } = ctx.request.body;

    //one way
    // const db = await connectDB();
    // const collectionStore = db.collection("store");

    const collectionStore = ctx.db.collection("store");
    const collectionUser = ctx.db.collection("users");

    const storeExisting = await collectionStore.findOne({
      gstNumber,
    });

    if (storeExisting) {
      if (isBranch) {
        const existingBranch = await collectionStore.findOne({
          gstNumber,
          address,
        });

        if (existingBranch) {
          (ctx.status = 400),
            (ctx.body = {
              success: true,
              message: "A branch with same number and address already exists",
            });
          return;
        }
      } else {
        (ctx.status = 400),
          (ctx.body = {
            success: false,
            message: "This GST number is already resgistered",
          });
        return;
      }
    }

    const newStore = {
      storeName,
      ownerName,
      address,
      description,
      // logo: {
      //   public_id: myCloud.public_id,
      //   url: myCloud.secure_url,
      // },
      mediaLinks,
      category,
      timmings,
      gstNumber,
      upiId,
      isBranch: isBranch || false,
      createdAt: new Date(),
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

    //invalidate cache data
    // await deleteCache("storeList");

    console.log("UpdatedData", updatedData);

    ctx.status = 201;
    ctx.body = {
      success: true,
      message: "Store created successfully",
      data: { ...newStore, _id: result.insertedId },
    };
  } catch (err) {
    console.log("Registration Failed", err.message);
    error(ctx, 500, "Internal server error");
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
    console.log(store);

    if (!store) {
      console.log(error);
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

module.exports = { createStore, storeList, ownerDashboardDetail };
