const { connectCronDB } = require("./config/db");
const { cronScheduler } = require("./controller/cronController");

const databaseConnection = async () => {
  await connectCronDB();
};

databaseConnection();

cronScheduler();
