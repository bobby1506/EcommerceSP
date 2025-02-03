const createDiscountCoupon = async (ctx, newDiscount) => {
  const discountCollection = ctx.db.collection("discounts");
  const discount = await discountCollection.insertOne(newDiscount);
  return discount;
};

const findDiscountCouponById = async (ctx) => {
  const { discountId } = ctx.state.shared;
  const discountCollection = ctx.db.collection("discounts");
  const discount = await discountCollection.findOne({ discountId });
  return discount;
};

const deleteCoupons = async (ctx) => {
  const { discountId } = ctx.state.shared;
  const deleteCoupon = await discountCollection.deleteOne({
    _id: new ObjectId(discountId),
  });
  return deleteCoupon;
};

const updateDiscounts = async (ctx) => {
  const { discountId, discountedPrice } = ctx.state.shared;
  const discountCollection = ctx.db.collection("discounts");
  const updatedDiscount = await discountCollection.updateOne(
    {
      _id: new ObjectId(discountId),
    },
    {
      $set: {
        discountedprice: discountedPrice,
      },
    }
  );

  return updatedDiscount;
};

const findCouponByCouponCode = async (ctx) => {
  const { couponCode } = ctx.state.shared;
  const discountCollection = ctx.db.collection("discounts");
  const discountCoupon = await discountCollection.findOne({
    couponCode: couponCode,
  });
  return discountCoupon;
};

const calculateDiscountedPrice = async (ctx, finalDiscount, productId) => {
  const userId = ctx.state.user?.id;

  if (!userId) {
    return resHandler(ctx, false, "Unauthorized user", 403);
  }

  const cartCollection = ctx.db.collection("cart");

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

  return aggregatedCart;
};

const claimUserUpdate = async (ctx, filterone, filtertwo) => {
  return await discountCollection.updateOne(filterone, filtertwo);
};

module.exports = {
  createDiscountCoupon,
  findDiscountCouponById,
  deleteCoupons,
  updateDiscounts,
  findCouponByCouponCode,
  calculateDiscountedPrice,
  claimUserUpdate,
};
