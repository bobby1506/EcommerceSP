class ErrorHandler extends Error {
  constructor(status, message) {
    super(message);
    this.status = status || 500;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
