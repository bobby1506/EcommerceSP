const validateOrder = (ctx) => {
  const { shippingInformation, orderedItems, isCart } = ctx.request.body;

  if (!shippingInformation || orderedItems.length === 0) {
    return {
      success: false,
      message: "Invalid input data",
    };
  }

  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    shippingInformation,
    orderedItems,
  };

  return null;
};

const validateOrderStatus = (ctx) => {
  const { orderId, productId, deliveryStatus } = ctx.request.body;

  if (!orderId || !productId || !deliveryStatus) {
    return {
      success: false,
      message: "Invalid input",
    };
  }

  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    orderId,
    productId,
    deliveryStatus,
  };

  return null;
};

module.exports = {
  validateOrder,
  validateOrderStatus,
};
