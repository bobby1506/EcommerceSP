const cron = require("node-cron");
const dbConnect = require("../config/db");

const updateCreditAndBalance = async () => {
  try {
    console.log("Step 1");
    const db = await dbConnect();
    // console.log("db", db);
    console.log("Step 2");
    const storeCollection = db.collection("store");
    // console.log("store collection", storeCollection);

    //fetch all store having credits greater than 0
    const result = await storeCollection
      .find({ Credits: { $gte: 0 } })
      .toArray();
    console.log("result", result);
    if (result.length === 0) {
      console.log("No store credits to update");
      return;
    }

    console.log("result", result);

    const updateCredits = result.map((store) => ({
      updateOne: {
        filter: { _id: store._id },
        update: {
          $inc: { Balance: store.Credits },
          $set: { Credits: 0 },
        },
      },
    }));

    console.log("updateCredits", updateCredits);

    const bulk = await storeCollection.bulkWrite(updateCredits);
    console.log(bulk);
    console.log("Successfully update the balance");
  } catch (err) {
    console.log("Error in updating the balance", err);
  }
};

// const printConsole = async () => {
//   console.log("Hello");
// };

const cronScheduler = async () => {
  cron.schedule("*/1 * * * *", () => {
    console.log("Credit updating");
    // printConsole();
    updateCreditAndBalance();
  });
};

module.exports = { cronScheduler };
