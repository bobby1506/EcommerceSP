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
