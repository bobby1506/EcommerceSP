const validateProductId = (ctx) => {
  const { productId } = ctx.request.body;

  if (!productId) {
    return {
      field: "productId",
      message: "ProductId is required",
    };
  }
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    productId,
  };

  return null;
};

const validateCartUpdate = (ctx) => {
  const { productId, quantity } = ctx.request.body;

  if (!productId) {
    return {
      field: "productId",
      message: "ProductId is required",
    };
  }

  if (typeof quantity !== "number" || quantity <= 0) {
    return {
      field: "quantity",
      message: "Quantity must be a positive number",
    };
  }
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    productId,
    quantity,
  };

  return null;
};

module.exports = {
  validateProductId,
  validateCartUpdate,
};
