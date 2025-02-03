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

const {
  findProductById,
  getProductById,
} = require("../queries/productQueries");

const { findUserById } = require("../queries/userQueries");

const { resHandler } = require("../middlewares/errorHandler");

const createOrder = async (ctx) => {
  try {
    const { orderedItems } = ctx.state.shared;
    const userId = ctx.state.user?.id;

    await decreaseStock(ctx);

    const insertedOrder = await insertOrder(ctx);
    if (!insertedOrder.acknowledge) {
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
    if (orderedItems.isCart) {
      await deleteCart(ctx, userId);
    }
    resHandler(ctx, true, "Order created successfully", 200);
  } catch (err) {
    console.log("Order creation failed", err);
    resHandler(ctx, false, "Order creation denied", 401);
  }
};

const orderDetails = async (ctx) => {
  try {
    const orders = await findOrdersByUserId(ctx);
    resHandler(ctx, true, "Order fetched successfully", 200, orders);
  } catch (err) {
    resHandler(ctx, false, "Orders not fetched", 500);
  }
};

const orderDetailOwner = async (ctx) => {
  try {
    const { user } = ctx.state.shared;

    const storeId = user.storeId.toString();
    const orders = await findOrdersByStoreId(ctx);
    const filteredItems = orders?.map((order) => {
      const filteredItem = order.orderedItems.filter((item) => {
        return item.storeId == storeId;
      });
      const orderss = filteredItem ? filteredItem : [];
      return {
        shippingInformation: order.shippingInformation,
        orderss,
        orderId: order._id,
        createdAt: new Date(),
      };
    });
    resHandler(ctx, true, "Order fetch successfully", 200, filteredItems);
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
