const { MongoClient } = require("mongodb");
require("dotenv").config();

let dbInstance;

const client = new MongoClient(process.env.URI, {});

const connectDB = async () => {
  //har baar connect db naa karna pade, how to do that?
  if (dbInstance) return dbInstance;

  try {
    await client.connect();
    console.log("MongoDB Succesfully connected");

    dbInstance = client.db(process.env.DB_NAME);
    return dbInstance;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

//another way

module.exports = connectDB;
