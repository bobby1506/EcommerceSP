const Bluebird = require("bluebird");
const { Promise } = Bluebird;

const validateAll = (validations) => {
  return async (ctx, next) => {
    const err = await Promise.mapSeries(validations, async (validator) => {
      return await validator(ctx);
    });
    const error = err.filter((val) => val !== null);
    if (error.length > 0) {
      ctx.status = 400;
      ctx.body = error;
      return;
    }
    await next();
  };
};
module.exports = { validateAll };
