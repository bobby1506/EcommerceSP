const { ObjectId } = require("mongodb");

const createDiscount = async (ctx) => {
  try {
    const { couponCode, discountedPrice, productId } = ctx.request.body;

    if (!couponCode || !discountedPrice) {
      console.log("Invalid details");
      ctx.body = {
        status: 400,
        message: "Invalid details",
      };
      return;
    }

    const userId = ctx.state.user?.id;
    const userCollection = ctx.db.collection("users");
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });
    console.log(user, "user");
    const storeId = user.storeId;
    console.log("storeId", storeId);

    const productCollection = ctx.db.collection("products");
    const product = await productCollection.findOne({
      _id: new ObjectId(productId),
      storeId: storeId,
    });

    if (!product) {
      console.log("This i snot yours product");
      return;
    }
    //iss storeid ko

    if (typeof discountedPrice != "number" || discountedPrice < 0) {
      console.log("Invalid details");
      ctx.status = 404;
      ctx.body = {
        success: false,
        message: "Invalid details",
      };
      return;
    }

    const newDiscount = {
      couponCode: couponCode,
      discountedPrice,
      claimedUser: [],
      productId,
      storeId,
    };

    const discountCollection = ctx.db.collection("discounts");
    const newCoupon = await discountCollection.insertOne(newDiscount);

    ctx.status = 201;
    ctx.body = {
      success: true,
      message: "Dicount coupon created",
      newCoupon,
    };
  } catch (err) {
    console.log("Error in creating the discount coupon", err);
  }
};

//delete coupon

const deleteDiscount = async (ctx) => {
  try {
    const { discountId } = ctx.request.body;

    if (!discountId) {
      console.log("Give a valid dicountId");
      ctx.status = 403;
      return;
    }

    const userId = ctx.state.user?.id;
    const userCollection = ctx.db.collection("users");
    const user = userCollection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return;
    }
    const storeId = user.storeId;

    const discountCollection = ctx.db.collection("discounts");

    const discount = await discountCollection.findOne({
      _id: new ObjectId(discountId),
    });
    if (!discount) {
      return;
    }

    const ownerStoreId = discount.storeId;

    if (storeId != ownerStoreId) {
      console.log("you are a hacker");
      return;
    }

    const deleteCoupon = await discountCollection.deleteOne({
      _id: new ObjectId(discountId),
    });

    if (deleteCoupon.deletedCount === 0) {
      ctx.status = 404;
      ctx.body = {
        success: false,
        message: "Coupon not found",
      };
      return;
    }

    ctx.status = 200;
    ctx.body = {
      message: "Discount coupon deleted",
      success: true,
      deleteCoupon,
    };
  } catch (err) {
    console.log("Error in deleting the disocunt creation", err);
    ctx.status = 500;
  }
};

//update discount
const updateDiscount = async (ctx) => {
  try {
    const { discountId, discountPrice } = ctx.request.body;

    if (!discountId || discountPrice == undefined) {
      console.log("Invalid details");
      ctx.status = 404;
      ctx.body = {
        success: false,
        message: "Invalid input",
      };
      return;
    }

    if (typeof discountPrice !== "number" || discountPrice <= 0) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: "Invalid 'discountPrice'. It must be a positive number.",
      };
      return;
    }

    const discountCollection = ctx.db.collection("discounts");

    const userId = ctx.state.user?.id;
    const userCollection = ctx.db.collection("users");
    const user = userCollection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return;
    }
    const storeId = user.storeId;

    const discount = await discountCollection.findOne({
      _id: new ObjectId(discountId),
    });
    if (!discount) {
      return;
    }

    const ownerStoreId = discount.storeId;

    if (storeId != ownerStoreId) {
      console.log("you are a hacker");
      return;
    }

    const updatedDiscount = await discountCollection.updateOne(
      {
        _id: new ObjectId(discountId),
      },
      {
        $set: {
          discountedprice: discountPrice,
        },
      }
    );

    if (updatedDiscount.matchedCount == 0) {
      ctx.status = 404;
      ctx.body = {
        success: false,
        message: "Discount not found. Please check the 'discountId'.",
      };
      return;
    }

    ctx.status = 200;
    ctx.body = {
      success: true,
      message: "Discount updated successfully",
    };
  } catch (err) {
    console.log("Error in updating the discount");
    ctx.staus = 500;
    ctx.body = {
      success: false,
      message: err,
    };
  }
};

//apply discount
//step-1 mujhe coupon name milegaa
//step-2 mujhe vo dicount collection check karna hai exist karta hai ya nahi
//step-3 agar exist karta hai to storeid or product uthaalo or discount bhi uthaalo
//step-4 ab cart mein user ka cart nikaalo or storeid, product id match karo, agar kuch milaa to uspe
//total price pe utna discount dede

const applyCoupon = async (ctx) => {
  const { couponCode } = ctx.request.body;

  const userId = ctx.state.user?.id;

  if (!userId) {
    ctx.status = 401;
    ctx.body = { success: false, message: "Unauthorized user" };
    return;
  }

  const discountCollection = ctx.db.collection("discounts");
  const cartCollection = ctx.db.collection("carts");

  const discountCoupon = await discountCollection.findOne({
    couponCode: couponCode,
  });
  console.log(discountCoupon, "discountcoupon");

  if (!discountCoupon) {
    ctx.status = 404;
    ctx.body = { success: false, message: "Coupon does not exist" };
    return;
  }

  //if exist then check user already used it or not
  if (discountCoupon.claimedUser.includes(userId)) {
    ctx.status = 400;
    ctx.body = { success: false, message: "Coupon already used by the user" };
    return;
  }

  //if not then coupon se storeid or productid lo
  const { storeId, productId, discountedPrice } = discountCoupon;

  console.log(discountedPrice);

  const finalDiscount = discountedPrice / 100;

  //ab user ki cart mein jaoo and check karo if uss store kaa vo product ho to uska total price pe utna discount lagaa do
  const cart = await cartCollection.findOne({ userId });

  console.log(cart, "cart");

  if (!cart) {
    ctx.status = 404;
    ctx.body = { success: false, message: "User's cart not found" };
    return;
  }

  const cartItems = cart.items.map(
    (item) =>
      item.productId === productId && item.productDetails.storeId === storeId
  );

  if (!cartItems) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: "not applicable for any product in cart",
    };
    return;
  }

  const aggregatedCart = await cartCollection
    .aggregate([
      {
        $match: {
          userId,
          "items.productId": productId,
        },
      },
      {
        $unwind: "$items",
      },
      {
        $match: {
          "items.productId": productId,
        },
      },
      {
        $set: {
          "items.totalPrice": {
            $subtract: [
              "$items.totalPrice",
              { $multiply: ["$items.totalPrice", finalDiscount] },
            ],
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          items: { $push: "$items" },
        },
      },
    ])
    .toArray();

  if (aggregatedCart.length > 0) {
    const updatedCart = await cartCollection.updateOne(
      { userId, _id: aggregatedCart[0]._id },
      { $set: { items: aggregatedCart[0].items } }
    );

    console.log("Cart updated successfully:", updatedCart);
  } else {
    console.log("Cart not found for the user or product not in cart.");
  }

  await discountCollection.updateOne(
    { couponCode },
    { $push: { claimedUser: userId } }
  );

  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Discount applied successfully",
    aggregatedCart,
  };
};

module.exports = {
  createDiscount,
  updateDiscount,
  deleteDiscount,
  applyCoupon,
};
