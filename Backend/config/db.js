const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.URI, {});

const connectDB = async () => {
  try {
    await client.connect();
  } catch (err) {
    process.exit(1);
  }
};

module.exports = { connectDB, client };
