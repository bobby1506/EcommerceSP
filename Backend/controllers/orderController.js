const { ObjectId } = require("mongodb");

const createOrder = async (ctx) => {
  try {
    const {
      shippingInformation,
      orderedItems,
      shippingPrice,
      paidAt,
      paymentStatus,
      isCart,
    } = ctx.request.body;

    if (
      !shippingInformation ||
      orderedItems.length === 0 ||
      !shippingPrice || // Fixed spelling here
      !paymentStatus
    ) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: "Invalid input data",
      };
      return;
    }
    const userId = ctx.state.user?.id;
    const productCollection = ctx.db.collection("products");
    console.log("Step1");

    //check if the stock is avaivlable or not
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
        ctx.status = 400;
        ctx.body = {
          success: false,
          message: "Not enough stock",
        };
        return;
      }

      //decrease stock
      for (const item of orderedItems) {
        const product = await productCollection.updateOne(
          {
            _id: new ObjectId(item.productId),
          },
          { $inc: { stocks: -item.quantity } }
        );
      }
    }

    const newOrder = {
      shippingInformation,
      orderedItems,
      userId,
      shippingPrice: shippingPrice || 50,
      paidAt,
      paymentStatus: paymentStatus || "Pending",
    };

    const orderCollection = ctx.db.collection("orders");

    const Order = await orderCollection.insertOne(newOrder);
    console.log("Step 2");

    const storeCollection = ctx.db.collection("store");

    const newBalance = await orderCollection
      .aggregate([
        {
          $match: { _id: Order.insertedId },
        },

        {
          $unwind: "$orderedItems",
        },
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

    console.log("newBalance", newBalance);

    console.log("Step-3");

    const balanceUpdate = newBalance.map((data) => ({
      updateOne: {
        filter: {
          _id: new ObjectId(data._id),
        },
        update: {
          $inc: {
            Credits: data.totalAmount,
          },
        },
      },
    }));
    console.log(balanceUpdate);

    console.log("Step-4");

    const bulkResult = await storeCollection.bulkWrite(balanceUpdate);
    console.log(bulkResult);
    console.log("Step-5");

    // if (bulkResult.modifiedCount === 0) {
    // }

    if (Order.insertedCount === 0) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: "Error in order creation",
      };
      return;
    }

    //cart delete karni hai
    const cartCollection = ctx.db.collection("carts");
    if (isCart) {
      const cart = await cartCollection.deleteOne({ userId: userId });
      console.log("cart", cart);
    }

    ctx.status = 200;
    ctx.body = {
      success: true,
      message: "Order created Successfully",
    };
  } catch (err) {
    console.log("Order creation failed", err);
    (ctx.status = 500),
      (ctx.body = {
        success: false,
        message: "Order creation failed",
      });
  }
};

//fetch all order details for users
const orderDetails = async (ctx) => {
  try {
    const userId = ctx.state.user?.id;
    console.log("userId", userId);

    if (!userId) {
      console.log("User id not fetched from token");
    }

    const orderCollection = ctx.db.collection("orders");
    // console.log(orderCollection);
    const orders = await orderCollection
      .find({
        userId,
      })
      .toArray();

    console.log("orders", orders);
    (ctx.status = 200),
      (ctx.body = {
        success: true,
        message: "Order fetched",
        orders,
      });
  } catch (err) {
    console.log("Orderdetail not fetched", err);
    (ctx.status = 404), (ctx.message = "Orderdetails not fetched");
  }
};

//orders fetched for owner
const orderDetailOwner = async (ctx) => {
  try {
    const ownerId = ctx.state.user?.id;

    console.log(ownerId);

    if (!ownerId) {
      (ctx.status = 404),
        (ctx.body = {
          success: false,
          message: "Sellerid is invalid",
        });
    }

    const userCollection = ctx.db.collection("users");
    const user = await userCollection.findOne({ _id: new ObjectId(ownerId) });
    console.log(user, "user");
    const storeId = user.storeId.toString();
    console.log("storeId", storeId);

    const orderCollection = ctx.db.collection("orders");
    // console.log("orderCollection", orderCollection);
    const orders = await orderCollection
      .find({
        "orderedItems.storeId": storeId,
      })
      .toArray();

    // console.log("orders", orders);

    if (!orders.length) {
      ctx.status = 404;
      ctx.body = {
        success: false,
        message: "No orders found for your store.",
      };
      return;
    }

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
    ctx.status = 200;
    ctx.body = {
      success: true,
      message: "Orders fetched successfully",
      filteredItems,
    };
  } catch (err) {
    console.log("Order fetch error of owner", err);
    ctx.status = 403;
    ctx.body = {
      success: false,
      message: "Order not fetched successfully",
    };
  }
};

//onwer changing status of orders for admin
const orderStatusChange = async (ctx) => {
  try {
    console.log("Hello owner");
    const { orderId, productId, deliveryStatus } = ctx.request.body;

    if (!orderId || !deliveryStatus || !productId) {
      console.log("Invalid input");
      ctx.status = 400;
      ctx.body = {
        message: "Invalid input",
        success: false,
      };
    }

    const userId = ctx.state.user?.id;

    const userCollection = ctx.db.collection("users");
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });

    const storeId = user.storeId.toString();
    const productCollection = ctx.db.collection("products");
    const product = await productCollection.findOne({
      _id: new Object(productId),
    });
    if (!product) {
      return;
    }
    const storeOwner = product.storeId;

    if (storeOwner != storeId) {
      console.log("You are a hacker");
      return;
    }
    console.log("storeId", storeId);

    const orderCollection = ctx.db.collection("orders");

    const order = await orderCollection.updateOne(
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
    console.log("order", order);

    if (!order) {
      console.log("Order not found");
      ctx.status = 404;
      ctx.body = {
        success: true,
        message: "Order not found",
      };
    }

    if (order.modifiedCount === 0) {
      ctx.status = 404;
      ctx.body = {
        success: false,
        message: "Order or product not found for the given storeId.",
      };
      return;
    }

    ctx.status = 200;
    ctx.body = {
      success: true,
      message: "Order delivery status updated successfully",
    };
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: err,
    };
  }
};

module.exports = {
  createOrder,
  orderDetailOwner,
  orderStatusChange,
  orderDetails,
};
