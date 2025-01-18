const connectDB = require("../config/db");

const dbMiddleware = async (ctx, next) => {
  if (!global.db) {
    global.db = await connectDB();
    console.log("Mongo db connected successfully");
  }
  ctx.db = global.db;
  await next();
};

module.exports = dbMiddleware;

//on read file delete the file in between
//timer
//cardinality karna hai lookup mein   and unwind
//count execution
//distinct
//lookup with condition inside or pipeline
//difference between in and elematch operator
//bulkwrite : how insert will occur of 100  documents
//what if one operation throw an error
