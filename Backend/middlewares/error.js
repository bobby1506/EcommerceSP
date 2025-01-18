//Error handling middleware
const ErrorHandler = require("../utils/errorHandler");

const error = (ctx, statusCode, errorMessage) => {
  ctx.status = statusCode || 500;
  ctx.body = {
    success: false,
    message: errorMessage || "Internal Server Error",
  };
};

module.exports = { error };
