const { ObjectId } = require("mongodb");
const {
  insertOrder,
  deleteCart,
  updateStoreBalance,
  calculateStoreBalance,
  findOrdersByUserId,
  findOrdersByStoreId,
  updateOrderDeliveryStatus,
} = require("../queries/orderQueries");

const {
  findProductById,
  updateProductStock,
} = require("../queries/productQueries");

const { findUserById } = require("../queries/userQueries");

const { resHandler } = require("../middlewares/errorHandler");

const createOrder = async (ctx) => {
  try {
    const { orderedItems } = ctx.state.shared;

    const userId = ctx.state.user?.id;

    // const productCollection = ctx.db.collection("products");
    // console.log("Step1");

    // //check if the stock is avaivlable or not
    // for (const item of orderedItems) {
    //   console.log(item.productId);
    //   const product = await productCollection.findOne({
    //     _id: new ObjectId(item.productId),
    //   });

    //   if (!product) {
    //     ctx.status = 404;
    //     ctx.body = {
    //       success: false,
    //       message: `Product with ID ${item.productId} not found`,
    //     };
    //     return;
    //   }

    //   if (product.stocks < item.quantity) {
    //     ctx.status = 400;
    //     ctx.body = {
    //       success: false,
    //       message: "Not enough stock",
    //     };
    //     return;
    //   }

    //   //decrease stock
    //   for (const item of orderedItems) {
    //     const product = await productCollection.updateOne(
    //       {
    //         _id: new ObjectId(item.productId),
    //       },
    //       { $inc: { stocks: -item.quantity } }
    //     );
    //   }
    // }

    // const newOrder = {
    //   shippingInformation,
    //   orderedItems,
    //   userId,
    //   shippingPrice: shippingPrice || 50,
    //   paidAt,
    //   paymentStatus: paymentStatus || "Pending",
    // };

    // const orderCollection = ctx.db.collection("orders");

    // const Order = await orderCollection.insertOne(newOrder);
    // console.log("Step 2");

    // const storeCollection = ctx.db.collection("store");

    // const newBalance = await orderCollection
    //   .aggregate([
    //     {
    //       $match: { _id: Order.insertedId },
    //     },

    //     {
    //       $unwind: "$orderedItems",
    //     },
    //     {
    //       $group: {
    //         _id: "$orderedItems.storeId",
    //         totalAmount: {
    //           $sum: {
    //             $multiply: ["$orderedItems.price", "$orderedItems.quantity"],
    //           },
    //         },
    //       },
    //     },
    //   ])
    //   .toArray();

    // console.log("newBalance", newBalance);

    // console.log("Step-3");

    // const balanceUpdate = newBalance.map((data) => ({
    //   updateOne: {
    //     filter: {
    //       _id: new ObjectId(data._id),
    //     },
    //     update: {
    //       $inc: {
    //         Credits: data.totalAmount,
    //       },
    //     },
    //   },
    // }));
    // console.log(balanceUpdate);

    // console.log("Step-4");

    // const bulkResult = await storeCollection.bulkWrite(balanceUpdate);
    // console.log(bulkResult);
    // console.log("Step-5");

    // // if (bulkResult.modifiedCount === 0) {
    // // }

    // if (Order.insertedCount === 0) {
    //   ctx.status = 400;
    //   ctx.body = {
    //     success: false,
    //     message: "Error in order creation",
    //   };
    //   return;
    // }

    // //cart delete karni hai
    // const cartCollection = ctx.db.collection("carts");
    // if (isCart) {
    //   const cart = await cartCollection.deleteOne({ userId: userId });
    //   console.log("cart", cart);
    // }

    // ctx.status = 200;
    // ctx.body = {
    //   success: true,
    //   message: "Order created Successfully",
    // };

    for (const item of orderedItems) {
      const product = await findProductById(ctx, item.productId);

      if (product.stocks < item.quantity) {
        resHandler(ctx, false, "Not enough stock", 400);
        return;
      }

      await updateProductStock(ctx.db, item.productId, item.quantity);
    }

    const newOrder = { ...orderedItems, userId: userId };

    const insertedOrder = await insertOrder(ctx, newOrder);
    if (insertedOrder.insertedCount === 0) {
      resHandler(ctx, false, "Error in order creation", 400);
      return;
    }

    const newBalance = await calculateStoreBalance(
      ctx.db,
      insertedOrder.insertedId
    );
    const balanceUpdate = newBalance.map((data) => ({
      updateOne: {
        filter: { _id: new ObjectId(data._id) },
        update: { $inc: { Credits: data.totalAmount } },
      },
    }));

    await updateStoreBalance(ctx, balanceUpdate);

    if (orderedItems.isCart) {
      await deleteCart(ctx.db, userId);
    }

    resHandler(ctx, true, "Order created successfully", 200);
  } catch (err) {
    console.log("Order creation failed", err);
    resHandler(ctx, false, "Order creation denied", 401);
  }
};

//fetch all order details for users
const orderDetails = async (ctx) => {
  try {
    const userId = ctx.state.user?.id;

    // console.log(orderCollection);
    const orders = await findOrdersByUserId(ctx, userId);

    console.log("orders", orders);
    resHandler(ctx, true, "Order fetched successfully", 200, orders);
  } catch (err) {
    console.log("Orderdetail not fetched", err);
    resHandler(ctx, false, "Orders not fetched", 500);
  }
};

//orders fetched for owner
const orderDetailOwner = async (ctx) => {
  try {
    // const ownerId = ctx.state.user?.id;

    // console.log(ownerId);
    // const userCollection = ctx.db.collection("users");
    // const user = await userCollection.findOne({ _id: new ObjectId(ownerId) });
    // console.log(user, "user");

    // const user = await findUserById(ctx, ownerId);
    const { user } = ctx.state.shared;

    const storeId = user.storeId.toString();
    console.log("storeId", storeId);

    const orderCollection = ctx.db.collection("orders");
    // console.log("orderCollection", orderCollection);
    const orders = await findOrdersByStoreId(orderCollection, user.storeId);

    // console.log("orders", orders);

    const filteredItems = orders.map((order) => {
      console.log("order", order);
      const filteredItem = order.orderedItems.filter((item) => {
        // console.log(item);
        console.log("storeId", item.storeId);
        console.log("storeId", storeId);
        return item.storeId == storeId;
        // console.log(item.orderedItems.storeId);
      });
      console.log("filterItems", filteredItem);
      return {
        shippingInformation: order.shippingInformation,
        orderedItems: filteredItem,
        orderId: order._id,
        createdAt: new Date(),
      };
    });

    // console.log("orderedItems", orderedItems);
    resHandler(ctx, true, "Order fetch successfully", 200, filteredItems);
  } catch (err) {
    console.log("Order fetch error of owner", err);
    resHandler(ctx, false, "Order not fetched", 403);
  }
};

//onwer changing status of orders for admin
const orderStatusChange = async (ctx) => {
  try {
    console.log("Hello owner");
    const { orderId, productId, deliveryStatus } = ctx.state.shared;

    const { user } = ctx.state.shared;

    // const user = await findUser(ctx, userId);

    const storeId = user.storeId.toString();
    // const product = await productCollection.findOne({
    //   _id: new Object(productId),
    // });
    const product = await findProductById(ctx, productId);

    if (!product || product.storeId !== storeId) {
      resHandler(ctx, false, "Unauthorized access", 403);
      return;
    }

    // const storeOwner = product.storeId;

    // if (storeOwner != storeId) {
    //   console.log("You are a hacker");
    //   return;
    // }
    // console.log("storeId", storeId);

    // const orderCollection = ctx.db.collection("orders");

    // const order = await orderCollection.updateOne(
    //   {
    //     _id: new ObjectId(orderId),
    //     "orderedItems.storeId": storeId,
    //     "orderedItems.productId": productId.toString(),
    //   },
    //   {
    //     $set: {
    //       "orderedItems.$[elem].deliveryStatus": deliveryStatus,
    //     },
    //   },
    //   {
    //     arrayFilters: [
    //       {
    //         "elem.storeId": storeId,
    //         "elem.productId": productId.toString(),
    //       },
    //     ],
    //   }
    // );
    // console.log("order", order);

    const result = await updateOrderDeliveryStatus(
      ctx.db,
      orderId,
      user.storeId,
      productId,
      deliveryStatus
    );

    // if (!order) {
    //   console.log("Order not found");
    //   ctx.status = 404;
    //   ctx.body = {
    //     success: true,
    //     message: "Order not found",
    //   };
    // }

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
