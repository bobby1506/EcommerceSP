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
  calculateDiscountedPrice,
  claimUserUpdate,
} = require("../queries/discountQueries");

const { updateProductDisocunt } = require("../queries/productQueries");
const { findCartByUserId, updateCartPrice } = require("../queries/cartQueries");

const createDiscount = async (ctx) => {
  try {
    const { couponCode, discountedPrice, productId } = ctx.state.shared;
    const { email } = ctx.state.user;
    const user = await findUser(ctx, { email });
    const storeId = user.storeId;
    const product = await getProductByIDStoreId(ctx, storeId);
    if (!product)
      return resHandler(ctx, false, "Product is not of correct owner", 403);
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
    const productUpdated = updateProductDisocunt(ctx, discountedPrice);
    if (!productUpdated.acknowledged)
      return resHandler(ctx, false, "Discount not updated", 400);
    resHandler(ctx, true, "Discount coupon created", 201);
  } catch (err) {
    return resHandler(ctx, false, "Error in creating discount", 500);
  }
};

const deleteDiscount = async (ctx) => {
  try {
    const userId = ctx.state.user?.id;
    const user = await findUser(ctx, { _id: new ObjectId(userId) });
    if (!user) {
      return resHandler(ctx, false, "User not found", 403);
    }
    const storeId = user.storeId;
    const discount = await findDiscountCouponById(ctx);
    if (!discount) {
      return resHandler(ctx, false, "Coupon not found", 500);
    }
    const ownerStoreId = discount.storeId;
    if (storeId != ownerStoreId) {
      return resHandler(ctx, false, "You dont have an access for this", 403);
    }
    const deletedCoupon = await deleteCoupons(ctx);
    if (!deletedCoupon.acknowledged) {
      return resHandler(ctx, false, "Error in deletion", 500);
    }
    resHandler(ctx, true, "Discount coupon deleted", 200, { discountCoupon });
  } catch (err) {
    return resHandler(ctx, false, "Error in deletion", 500);
  }
};

const updateDiscount = async (ctx) => {
  try {
    const userId = ctx.state.user?.id;
    const user = await findUser(ctx, { _id: new ObjectId(userId) });
    if (!user) {
      return resHandler(ctx, false, "User not found", 403);
    }
    const storeId = user.storeId;
    const discount = await findDiscountCouponById(ctx);
    if (!discount) {
      return resHandler(ctx, false, "Coupon not found", 500);
    }
    const ownerStoreId = discount.storeId;
    if (storeId != ownerStoreId) {
      return resHandler(ctx, false, "You dont have an access for this", 403);
    }
    const updatedDiscount = await updateDiscounts(ctx);
    if (updatedDiscount.matchedCount == 0) {
      resHandler(ctx, false, "Dicount not found", 404);
    }
    resHandler(ctx, true, "Discount updated successfully", 200);
  } catch (err) {
    resHandler(ctx, false, "Discount coupon not updated", 500);
  }
};

const applyCoupon = async (ctx) => {
  const { couponCode } = ctx.state.shared;
  const discountCoupon = await findCouponByCouponCode(ctx);
  if (!discountCoupon) {
    return resHandler(ctx, false, "Coupon code does not exits", 404);
  }
  if (discountCoupon.claimedUser.includes(userId)) {
    return resHandler(ctx, false, "Coupon already used by the user", 400);
  }
  const { storeId, productId, discountedPrice } = discountCoupon;
  const finalDiscount = discountedPrice / 100;
  const cart = await findCartByUserId(ctx);
  if (!cart) {
    return resHandler(ctx, false, "Users cart not found", 404);
  }
  const cartItems = cart.items.map(
    (item) =>
      item.productId === productId && item.productDetails.storeId === storeId
  );
  if (!cartItems) {
    return resHandler(ctx, false, "Not applicable for any product", 400);
  }
  const aggregatedCart = await calculateDiscountedPrice(
    ctx,
    finalDiscount,
    productId
  );
  if (aggregatedCart.length > 0) {
    await updateCartPrice(
      { userId, _id: aggregatedCart[0]._id },
      { $set: { items: aggregatedCart[0].items } }
    );
  } else {
  }
  claimUserUpdate({ couponCode }, { $push: { claimedUser: userId } });
  resHandler(ctx, true, "Coupon applied", 200);
};

module.exports = {
  createDiscount,
  updateDiscount,
  deleteDiscount,
  applyCoupon,
};
