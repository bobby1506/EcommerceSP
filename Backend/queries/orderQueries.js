const { ObjectId } = require("mongodb");
const { resHandler } = require("../middlewares/errorHandler");

const findOrderById = async (ctx, orderId) => {
  try {
    if (!ObjectId.isValid(orderId)) {
      return resHandler(ctx, false, "Invalid order ID");
    }
    const orderCollection = ctx.db.collection("orders");
    const result = await orderCollection.findOne({
      _id: new ObjectId(orderId),
    });
    if (!result) {
      return resHandler(ctx, false, "Order not found");
    }
    return result;
  } catch (error) {
    console.log(error.message);
    return resHandler(ctx, false, "Error fetching order");
  }
};

const findOrdersByUserId = async (ctx) => {
  try {
    const userId = ctx.state.user?.id;
    const orderCollection = ctx.db.collection("orders");
    const result = await orderCollection.find({ userId }).toArray();
    if (result.length === 0) {
      return resHandler(ctx, false, "No orders found for this user");
    }
    return result;
  } catch (error) {
    console.log(error.message);
    return resHandler(ctx, false, "Error fetching orders");
  }
};

const findOrdersByStoreId = async (ctx) => {
  try {
    const orderCollection = ctx.db.collection("orders");
    const { user } = ctx.state.shared;
    const storeId = user.storeId.toString();
    const result = await orderCollection
      .find({ "orderedItems.productDetails.storeId": storeId })
      .toArray();
    return result;
  } catch (error) {
    console.log(error.message);
    return resHandler(ctx, false, "Error fetching orders", 500);
  }
};

const updateOrderDeliveryStatus = async (
  ctx,
  orderId,
  storeId,
  productId,
  deliveryStatus
) => {
  try {
    if (!ObjectId.isValid(orderId)) {
      return resHandler(ctx, false, "Invalid order ID", 403);
    }
    const orderCollection = ctx.db.collection("orders");
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
  } catch (error) {
    console.log(error.message);
    return resHandler(ctx, false, "Error updating delivery status", 500);
  }
};

const insertOrder = async (ctx, orderData) => {
  try {
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
    const result = await ctx.db.collection("orders").insertOne(newOrder);
    return result;
  } catch (error) {
    console.log("Error inserting order", error);
    return resHandler(ctx, false, "Error inserting order", 500);
  }
};

const calculateStoreBalance = async (ctx, orderId) => {
  try {
    if (!ObjectId.isValid(orderId)) {
      return resHandler(ctx, false, "Invalid order ID", 403);
    }
    const orderCollection = ctx.db.collection("orders");
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
  } catch (error) {
    console.log("Error in calculateStoreBalance:", error.message);
    return resHandler(ctx, false, "Error calculating store balance", 500);
  }
};

const updateStoreBalance = async (ctx, balanceUpdates) => {
  try {
    if (balanceUpdates.length === 0) {
      return resHandler(ctx, false, "No balance updates provided", 400);
    }
    return await ctx.db.collection("store").bulkWrite(balanceUpdates);
  } catch (error) {
    return resHandler(ctx, false, "Error updating store balance", 500);
  }
};

const deleteCart = async (ctx, userId) => {
  try {
    const result = await ctx.db
      .collection("carts")
      .deleteOne({ userId: userId });
    if (result.deletedCount === 0) {
      return resHandler(ctx, false, "No cart found for this user", 401);
    }
    return result;
  } catch (error) {
    console.log("Error deleting cart", error);
    return resHandler(ctx, false, "Error deleting cart", 500);
  }
};

const decreaseStock = async (ctx) => {
  const { orderedItems } = ctx.state.shared;
  const productCollection = ctx.db.collection("products");
  for (const item of orderedItems) {
    console.log(item.productId);
    const product = await productCollection.findOne({
      _id: new ObjectId(item.productId),
    });
    if (!product) {
      ctx.status = 404;
      ctx.body = {
        success: false,
        message: `Product with ID ${item.productId} not found`,
      };
      return;
    }
    if (product.stocks < item.quantity) {
      console.log(
        product.stocks < item.quantity,
        "console hor r ah ahi ya nahi"
      );
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
