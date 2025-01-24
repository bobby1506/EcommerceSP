const resHandler = (
  ctx,
  success,
  message,
  status,
  data = null,
  error = null
) => {
  ctx.status = status;
  ctx.body = {
    success,
    message,
    data,
    error,
  };
};

module.exports = { resHandler };
