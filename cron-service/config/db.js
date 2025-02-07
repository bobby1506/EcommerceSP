const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.URI);

const connectCronDB = async () => {
  try {
    console.log("hello");
    await client.connect();
    console.log("Mongo db successfully connected");
  } catch (err) {
    process.exit(1);
  }
};

module.exports = { connectCronDB, client };
