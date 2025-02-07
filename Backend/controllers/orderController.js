const { ObjectId } = require("mongodb");
const {
  insertOrder,
  deleteCart,
  updateStoreBalance,
  calculateStoreBalance,
  findOrdersByUserId,
  findOrdersByStoreId,
  updateOrderDeliveryStatus,
  decreaseStock,
} = require("../queries/orderQueries");

const { getProductById } = require("../queries/productQueries");

const { resHandler } = require("../middlewares/errorHandler");

const createOrder = async (ctx) => {
  try {
    const { isCart } = ctx.request.body;
    const userId = ctx.state.user?.id;
    const result = await decreaseStock(ctx);
    if (!result) {
      return resHandler(ctx, false, "Not enough stocks", 400);
    }
    const insertedOrder = await insertOrder(ctx);
    console.log(insertedOrder);
    if (!insertedOrder.acknowledged) {
      return resHandler(ctx, false, "Error in order creation", 400);
    }
    const newBalance = await calculateStoreBalance(
      ctx,
      insertedOrder.insertedId
    );
    const balanceUpdate = newBalance?.map((data) => ({
      updateOne: {
        filter: { _id: new ObjectId(data._id) },
        update: { $inc: { Credits: data.totalAmount } },
      },
    }));
    await updateStoreBalance(ctx, balanceUpdate);
    if (isCart) {
      await deleteCart(ctx, userId);
    }
    resHandler(ctx, true, "Order created successfully", 200);
  } catch (err) {
    resHandler(ctx, false, "Order creation denied", 500);
  }
};

const orderDetails = async (ctx) => {
  try {
    const orders = await findOrdersByUserId(ctx);
    resHandler(ctx, true, "Order fetched successfully", 200);
    ctx.body = {
      orders,
    };
  } catch (err) {
    resHandler(ctx, false, "Orders not fetched", 500);
  }
};

const orderDetailOwner = async (ctx) => {
  try {
    const { user } = ctx.state.shared;
    console.log(user);
    const storeId = user.storeId.toString();
    const orders = await findOrdersByStoreId(ctx);
    console.log(orders);
    const filteredItems = orders?.map((order) => {
      const filteredItem = order.orderedItems.filter((item) => {
        return item.productDetails.storeId == storeId;
      });
      return {
        shippingInformation: order.shippingInformation,
        orderedItems: filteredItem,
        orderId: order._id,
        createdAt: new Date(),
      };
    });
    const orderss = filteredItems ? filteredItems : [];
    console.log(filteredItems);
    resHandler(ctx, true, "Order detail fetched for owner", 200);
    ctx.body = {
      orderss,
    };
  } catch (err) {
    resHandler(ctx, false, "Order not fetched", 403);
  }
};

const orderStatusChange = async (ctx) => {
  try {
    const { orderId, productId, deliveryStatus } = ctx.state.shared;
    const { user } = ctx.state.shared;
    const storeId = user.storeId.toString();
    const product = await getProductById(ctx);
    if (!product || product.storeId !== storeId) {
      resHandler(ctx, false, "Unauthorized access", 403);
      return;
    }
    const storeOwner = product.storeId;
    if (storeOwner != storeId) {
      console.log("You are a hacker");
      return;
    }
    await updateOrderDeliveryStatus(
      ctx.db,
      orderId,
      user.storeId,
      productId,
      deliveryStatus
    );
    resHandler(ctx, true, "Order deliever status updated successfully", 200);
  } catch (err) {
    console.log(err);
    resHandler(ctx, false, "Internal server error", 500);
  }
};

module.exports = {
  createOrder,
  orderDetailOwner,
  orderStatusChange,
  orderDetails,
};
