const { ObjectId } = require("mongodb");
const { resHandler } = require("../middlewares/errorHandler");
const { client } = require("../config/db");
const DB_NAME = process.env.DB_NAME;
const cartCollection = client.db(DB_NAME).collection("carts");
const orderCollection = client.db(DB_NAME).collection("orders");
const storeCollection = client.db(DB_NAME).collection("store");
const productCollection = client.db(DB_NAME).collection("products");

const findOrderById = async (ctx, orderId) => {
  if (!ObjectId.isValid(orderId)) {
    return resHandler(ctx, false, "Invalid order ID");
  }
  const result = await orderCollection.findOne({
    _id: new ObjectId(orderId),
  });
  if (!result) {
    return resHandler(ctx, false, "Order not found");
  }
  return result;
};

const findOrdersByUserId = async (ctx) => {
  const userId = ctx.state.user?.id;
  const result = await orderCollection.find({ userId }).toArray();
  if (result.length === 0) {
    return resHandler(ctx, false, "No orders found for this user");
  }
  return result;
};

const findOrdersByStoreId = async (ctx) => {
  const { user } = ctx.state.shared;
  const storeId = user.storeId.toString();
  const result = await orderCollection
    .find({ "orderedItems.productDetails.storeId": storeId })
    .toArray();
  return result;
};

const updateOrderDeliveryStatus = async (
  ctx,
  orderId,
  storeId,
  productId,
  deliveryStatus
) => {
  if (!ObjectId.isValid(orderId)) {
    return resHandler(ctx, false, "Invalid order ID", 403);
  }
  const result = await orderCollection.updateOne(
    {
      _id: new ObjectId(orderId),
      "orderedItems.storeId": storeId,
      "orderedItems.productId": productId.toString(),
    },
    {
      $set: {
        "orderedItems.$[elem].deliveryStatus": deliveryStatus,
      },
    },
    {
      arrayFilters: [
        {
          "elem.storeId": storeId,
          "elem.productId": productId.toString(),
        },
      ],
    }
  );
  if (result.matchedCount === 0) {
    return resHandler(
      ctx,
      false,
      "Order or item not found to update delivery status",
      403
    );
  }
  if (result.modifiedCount === 0) {
    return resHandler(ctx, false, "Order or product not found", 403);
  }
  return result;
};

const insertOrder = async (ctx) => {
  const { orderedItems, shippingInformation } = ctx.state.shared;
  const userId = ctx.state.user?.id;
  const newOrder = {
    orderedItems,
    userId: userId,
    shippingInformation,
    shippingPrice: 50,
    paidAt: new Date(),
    paymentStatus: "Pending",
  };
  return await orderCollection.insertOne(newOrder);
};

const calculateStoreBalance = async (ctx, orderId) => {
  if (!ObjectId.isValid(orderId)) {
    return resHandler(ctx, false, "Invalid order ID", 403);
  }
  await orderCollection.findOne({ _id: orderId });
  const result = await orderCollection
    .aggregate([
      { $match: { _id: new ObjectId(orderId) } },
      { $unwind: "$orderedItems" },
      {
        $group: {
          _id: "$orderedItems.productDetails.storeId",
          totalAmount: {
            $sum: {
              $multiply: [
                "$orderedItems.productDetails.price",
                "$orderedItems.quantity",
              ],
            },
          },
        },
      },
    ])
    .toArray();
  if (result.length === 0) {
    return resHandler(ctx, false, "No store balance data found", 403);
  }
  return result;
};

const updateStoreBalance = async (ctx, balanceUpdates) => {
  if (balanceUpdates.length === 0) {
    return resHandler(ctx, false, "No balance updates provided", 400);
  }
  return await storeCollection.bulkWrite(balanceUpdates);
};

const deleteCart = async (ctx, userId) => {
  const result = await cartCollection.deleteOne({ userId: userId });
  if (result.deletedCount === 0) {
    return resHandler(ctx, false, "No cart found for this user", 401);
  }
  return result;
};

const decreaseStock = async (ctx) => {
  const { orderedItems } = ctx.state.shared;
  for (const item of orderedItems) {
    const product = await productCollection.findOne({
      _id: new ObjectId(item.productId),
    });
    if (!product) {
      return resHandler(
        ctx,
        false,
        `Product with ID ${item.productId} not found`
      );
    }
    if (product.stocks < item.quantity) {
      return resHandler(ctx, false, "Not enough stock", 400);
    }
    for (const item of orderedItems) {
      await productCollection.updateOne(
        {
          _id: new ObjectId(item.productId),
        },
        { $inc: { stocks: -item.quantity } }
      );
    }
  }
  return true;
};

module.exports = {
  findOrderById,
  findOrdersByUserId,
  findOrdersByStoreId,
  insertOrder,
  updateStoreBalance,
  deleteCart,
  calculateStoreBalance,
  updateOrderDeliveryStatus,
  decreaseStock,
};
