const cron = require("node-cron");
const dbConnect = require("../config/db");
const resHandler = require("../middlewares/errorHandler");

const updateCreditAndBalance = async () => {
  try {
    const db = await dbConnect();
    const storeCollection = db.collection("store");
    const result = await storeCollection
      .find({ Credits: { $gte: 0 } })
      .toArray();
    if (result.length === 0) {
      console.log("No store credits to update");
      return;
    }
    const updateCredits = result.map((store) => ({
      updateOne: {
        filter: { _id: store._id },
        update: {
          $inc: { Balance: store.Credits },
          $set: { Credits: 0 },
        },
      },
    }));
    await storeCollection.bulkWrite(updateCredits);
  } catch (err) {
    return resHandler(ctx, false, "Error updating balance", 403);
  }
};

const cronScheduler = async () => {
  cron.schedule("*/1 * * * *", () => {
    updateCreditAndBalance();
  });
};

module.exports = { cronScheduler };
