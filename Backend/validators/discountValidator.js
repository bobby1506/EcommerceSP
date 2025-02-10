const { findCouponByCouponCode } = require("../queries/discountQueries");
const { isEmpty } = require("../sharedFunction/authShared");

const discountIdValidator = (ctx) => {
  const { discountId } = ctx.request.body;
  const emptyError = isEmpty(discountId, "discountId");
  if (emptyError) return emptyError;
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    discountId,
  };
  return null;
};

const isCouponExist = async (ctx) => {
  const { discountId } = ctx.state.shared;
  const discount = await findCouponByCouponCode(ctx, discountId);
  if (!discount)
    return {
      field: "discountId",
      message: "Discount Coupon not exist",
    };
  return null;
};

const couponCodeValidator = (ctx) => {
  const { couponCode } = ctx.request.body;
  const emptyError = isEmpty(couponCode, "couponCode");
  if (emptyError) return emptyError;
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    couponCode,
  };
  return null;
};

const discountedPriceValidator = (ctx) => {
  const { discountedPrice } = ctx.request.body;
  const emptyError = isEmpty(discountedPrice, "discountedPrice");
  if (emptyError) return emptyError;

  if (typeof discountedPrice != "number" || discountedPrice < 0) {
    return {
      field: "discountedPrice",
      message: "Enter correct figure",
    };
  }
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    discountedPrice,
  };
  return null;
};

module.exports = {
  discountIdValidator,
  isCouponExist,
  discountedPriceValidator,
  couponCodeValidator,
};
