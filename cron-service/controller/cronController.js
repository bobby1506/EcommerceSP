const { client } = require("../config/db");
const cron = require("node-cron");

const storeCollection = client.db(process.env.DB_NAME).collection("store");

const updateCreditAndBalance = async () => {
  try {
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
    console.log("done");
  } catch (err) {
    // return resHandler(ctx, false, "Error updating balance", 500);
  }
};

const cronScheduler = async () => {
  cron.schedule("*/1 * * * *", () => {
    updateCreditAndBalance();
  });
};

module.exports = { cronScheduler };
