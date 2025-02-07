const { ObjectId } = require("mongodb");
const { findUser } = require("../queries/userQueries");
const { getProductByIDStoreId } = require("../queries/productQueries");
const { resHandler } = require("../middlewares/errorHandler");
const {
  createDiscountCoupon,
  findDiscountCouponById,
  updateDiscounts,
  findCouponByCouponCode,
  deleteCoupons,
  claimUserUpdate,
  updateProductDiscountDetails,
  updateDiscountOnProduct,
  findDiscountCouponByProductId,
  updateDiscountOnCart,
} = require("../queries/discountQueries");

const { updateProductDisocunt } = require("../queries/productQueries");
const { findCartByUserId } = require("../queries/cartQueries");
const { client } = require("../config/db");
const cartCollection = client.db(process.env.DB_NAME).collection("carts");
const discountCollection = client
  .db(process.env.DB_NAME)
  .collection("discounts");

const createDiscount = async (ctx) => {
  try {
    const { couponCode, discountedPrice, productId } = ctx.state.shared;
    console.log(ctx.state.shared);
    const { email } = ctx.state.user;
    const user = await findUser(ctx, { email });
    console.log(user);
    const storeId = user.storeId;
    const product = await getProductByIDStoreId(ctx, storeId);
    if (!product)
      return resHandler(ctx, false, "Product is not of correct owner", 401);
    const newDiscount = {
      couponCode: couponCode,
      discountedPrice,
      claimedUser: [],
      productId,
      storeId,
    };
    const discountCoupon = await createDiscountCoupon(ctx, newDiscount);
    if (!discountCoupon.acknowledged) {
      return resHandler(ctx, false, "Disount coupon not created", 500);
    }
    const productUpdated = await updateProductDisocunt(ctx);
    if (!productUpdated.acknowledged)
      return resHandler(ctx, false, "Discount not updated", 500);
    resHandler(ctx, true, "Discount coupon created", 201);
  } catch (err) {
    return resHandler(ctx, false, "Error in creating discount", 500);
  }
};

const deleteDiscount = async (ctx) => {
  try {
    const discountDoc = await findDiscountCouponByProductId(ctx);
    console.log(discountDoc, "discountDoc");
    const res = await updateProductDiscountDetails(ctx);
    console.log(res, "res");

    const userId = ctx.state.user?.id;
    const user = await findUser(ctx, { _id: new ObjectId(userId) });
    if (!user) {
      return resHandler(ctx, false, "User not found", 403);
    }
    const storeId = user.storeId;
    const discount = await findDiscountCouponById(ctx, discountDoc._id);
    console.log("discount", discount);
    if (!discount) {
      return resHandler(ctx, false, "Coupon not found", 404);
    }
    const ownerStoreId = discount.storeId;
    if (storeId.toString() != ownerStoreId.toString()) {
      return resHandler(ctx, false, "You dont have an access for this", 403);
    }
    const deletedCoupon = await deleteCoupons(ctx, discountDoc._id);
    if (deletedCoupon.deletedCount === 0) {
      return resHandler(ctx, false, "Coupon not found", 404);
    }
    if (!deletedCoupon.acknowledged) {
      return resHandler(ctx, false, "Error in deletion", 500);
    }
    resHandler(ctx, true, "Discount coupon deleted", 200);
  } catch (err) {
    console.log(err);
    return resHandler(ctx, false, "Error in deletion", 500);
  }
};

const updateDiscount = async (ctx) => {
  try {
    const { couponCode, discountedPrice } = ctx.state.shared;
    console.log(ctx.state.shared);
    const discountDoc = await findDiscountCouponByProductId(ctx);
    const updatedData = {
      couponCode,
      discountedPrice,
    };
    const userId = ctx.state.user?.id;
    const user = await findUser(ctx, { _id: new ObjectId(userId) });
    if (!user) {
      return resHandler(ctx, false, "User not found", 403);
    }
    const storeId = user.storeId;
    const discount = await findDiscountCouponById(ctx, discountDoc._id);
    if (!discount) {
      return resHandler(ctx, false, "Coupon not found", 404);
    }
    const ownerStoreId = discount.storeId.toString();
    if (storeId.toString() != ownerStoreId) {
      return resHandler(ctx, false, "You dont have an access for this", 403);
    }
    const updatedDiscount = await updateDiscounts(
      ctx,
      discountDoc._id,
      updatedData
    );
    if (updatedDiscount.matchedCount == 0) {
      resHandler(ctx, false, "Dicount not found", 404);
    }

    await updateDiscountOnProduct(ctx);

    resHandler(ctx, true, "Discount updated successfully", 200);
  } catch (err) {
    resHandler(ctx, false, "Discount coupon not updated", 500);
  }
};

const applyCoupon = async (ctx) => {
  const { couponCode } = ctx.request.body;
  const userId = ctx.state.user?.id;
  if (!userId) {
    ctx.status = 401;
    ctx.body = { success: false, message: "Unauthorized user" };
    return;
  }
  const discountCoupon = await discountCollection.findOne({
    couponCode: couponCode,
  });
  console.log(discountCoupon, "discountcoupon");
  if (!discountCoupon) {
    ctx.status = 404;
    ctx.body = { success: false, message: "Coupon does not exist" };
    return;
  }
  if (discountCoupon.claimedUser.includes(userId)) {
    ctx.status = 400;
    ctx.body = { success: false, message: "Coupon already used by the user" };
    return;
  }
  const { storeId, productId, discountedPrice } = discountCoupon;
  console.log(discountedPrice);
  const finalDiscount = discountedPrice / 100;
  const cart = await cartCollection.findOne({ userId });
  console.log(cart, "cart");
  if (!cart) {
    ctx.status = 404;
    ctx.body = { success: false, message: "User's cart not found" };
    return;
  }
  const updatedCart = await cartCollection.updateOne(
    {
      userId,
      "items.productId": productId,
      "items.productDetails.storeId": storeId,
    },
    {
      $mul: { "items.$.totalPrice": 1 - finalDiscount },
    }
  );
  const newCart = await cartCollection.findOne({ userId: userId });
  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Discount applied successfully",
    newCart,
  };
};

module.exports = {
  createDiscount,
  updateDiscount,
  deleteDiscount,
  applyCoupon,
};
