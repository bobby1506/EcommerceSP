const { ObjectId } = require("mongodb");
const { resHandler } = require("../middlewares/errorHandler");

// Find order by ID
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

const findOrdersByUserId = async (ctx, userId) => {
  try {
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

const findOrdersByStoreId = async (ctx, storeId) => {
  try {
    const orderCollection = ctx.db.collection("orders");
    const result = await orderCollection
      .find({ "orderedItems.storeId": storeId })
      .toArray();

    if (result.length === 0) {
      return resHandler(ctx, false, "No orders found for this store");
    }

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

// Insert new order
const insertOrder = async (ctx, orderData) => {
  try {
    const result = await ctx.db.collection("orders").insertOne(orderData);
    return result;
  } catch (error) {
    console.log("Error inserting order", error);
    return resHandler(ctx, false, "Error inserting order", 500);
  }
};

// Calculate store balance
const calculateStoreBalance = async (ctx, orderId) => {
  try {
    if (!ObjectId.isValid(orderId)) {
      return resHandler(ctx, false, "Invalid order ID", 403);
    }

    const result = await ctx.db
      .collection("orders")
      .aggregate([
        { $match: { _id: new ObjectId(orderId) } },
        { $unwind: "$orderedItems" },
        {
          $group: {
            _id: "$orderedItems.storeId",
            totalAmount: {
              $sum: {
                $multiply: ["$orderedItems.price", "$orderedItems.quantity"],
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
    console.log(error.message);
    return resHandler(ctx, false, "Error calculating store balance", 500);
  }
};

// Update store balance
const updateStoreBalance = async (ctx, balanceUpdates) => {
  try {
    if (balanceUpdates.length === 0) {
      return resHandler(ctx, false, "No balance updates provided", 403);
    }

    const result = await ctx.db.collection("store").bulkWrite(balanceUpdates);
    return result;
  } catch (error) {
    console.log("Error updating store balance", error);
    return resHandler(ctx, false, "Error updating store balance");
  }
};

// Delete cart for user
const deleteCart = async (ctx, userId) => {
  try {
    const result = await ctx.db.collection("carts").deleteOne({ userId });
    if (result.deletedCount === 0) {
      return resHandler(ctx, false, "No cart found for this user", 401);
    }
    return result;
  } catch (error) {
    console.log("Error deleting cart", error);
    return resHandler(ctx, false, "Error deleting cart", 500);
  }
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
};
