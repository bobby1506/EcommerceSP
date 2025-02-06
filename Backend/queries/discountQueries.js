const createDiscountCoupon = async (ctx, newDiscount) => {
  const discountCollection = ctx.db.collection("discounts");
  const discount = await discountCollection.insertOne(newDiscount);
  return discount;
};

const findDiscountCouponById = async (ctx, discountId) => {
  const discountCollection = ctx.db.collection("discounts");
  const discount = await discountCollection.findOne({ _id: discountId });
  return discount;
};

const findDiscountCouponByProductId = async (ctx) => {
  const { productId } = ctx.request.shared;
  const discountCollection = ctx.db.collection("discounts");
  const discountDoc = await discountCollection.findOne({
    productId: productId,
  });
  return discountDoc;
};

const updateProductDiscountDetails = async (ctx) => {
  const productCollection = ctx.db.collection("products");
  const updatedProduct = await productCollection.updateOne(
    {
      _id: new ObjectId(productId),
    },
    {
      $set: { isDiscount: false, couponCode: "", discountedPrice: 0 },
    }
  );
  return updatedProduct;
};

const updateDiscountOnProduct = async (ctx) => {
  const { productId, couponCode, discountedPrice } = ctx.state.shared;
  const productCollection = ctx.db.collection("products");
  const updateDiscount = await productCollection.updateOne(
    {
      _id: new ObjectId(productId),
    },
    {
      $set: {
        couponCode: couponCode,
        discountedPrice: discountedPrice,
      },
    }
  );
  return updateDiscount;
};

const updateDiscountOnCart = async (ctx, finalDiscount, storeId, productId) => {
  const cartCollection = await ctx.db.collection("carts");
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
  return updatedCart;
};

const deleteCoupons = async (ctx, discountId) => {
  const discountCollection = ctx.db.collection("discounts");
  const deleteCoupon = await discountCollection.deleteOne({
    _id: discountId,
  });
  return deleteCoupon;
};

const updateDiscounts = async (ctx, discountId, updatedData) => {
  const discountCollection = ctx.db.collection("discounts");
  const updatedDiscount = await discountCollection.updateOne(
    {
      _id: discountId,
    },
    {
      $set: {
        ...updatedData,
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

const claimUserUpdate = async (ctx, filterone, filtertwo) => {
  const discountCollection = ctx.db.collection("discounts");
  return await discountCollection.updateOne(filterone, filtertwo);
};

module.exports = {
  createDiscountCoupon,
  findDiscountCouponById,
  deleteCoupons,
  updateDiscounts,
  findCouponByCouponCode,
  updateDiscountOnProduct,
  claimUserUpdate,
  findDiscountCouponByProductId,
  updateProductDiscountDetails,
  updateDiscountOnCart,
};
