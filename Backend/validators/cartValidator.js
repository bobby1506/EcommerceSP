const isEmpty = require("../sharedFunction/authShared");

const validateProductId = (ctx) => {
  const { productId } = ctx.request.body;
  const emptyError = isEmpty(productId, "productId");
  if (emptyError) return emptyError;
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    productId,
  };
  return null;
};

const validateCartUpdate = (ctx) => {
  const { quantity } = ctx.request.body;
  const emptyError = isEmpty(quantity, "quantity");
  if (emptyError) return emptyError;
  if (typeof quantity !== "number" || quantity <= 0) {
    return {
      field: "quantity",
      message: "Quantity must be a positive number",
    };
  }
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    quantity,
  };
  return null;
};

module.exports = {
  validateProductId,
  validateCartUpdate,
};
