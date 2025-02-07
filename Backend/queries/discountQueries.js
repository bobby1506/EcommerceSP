const { client } = require("../config/db");
const { ObjectId } = require("mongodb");
const discountCollection = client
  .db(process.env.DB_NAME)
  .collection("discounts");

const productCollection = client.db(process.env.DB_NAME).collection("products");
const cartCollection = client.db(process.env.DAB_NAME).collection("carts");

const createDiscountCoupon = async (ctx, newDiscount) =>
  await discountCollection.insertOne(newDiscount);

const findDiscountCouponById = async (ctx, discountId) =>
  await discountCollection.findOne({ _id: discountId });

const findDiscountCouponByProductId = async (ctx) => {
  const { productId } = ctx.state.shared;
  console.log(productId, "productId");
  return await discountCollection.findOne({
    productId: productId,
  });
};

// const updateProductDiscountDetails = async (ctx) => {
//   // const productCollection = ctx.db.collection("products");
//   const { productId } = ctx.state.shared;
//   console.log(ctx.state.shared);
//   console.log("hello");
//   const updatedProduct = await productCollection.updateOne(
//     {
//       _id: new ObjectId(productId),
//     },
//     {
//       $set: { isDiscount: false, couponCode: "", discountedPrice: 0 },
//     }
//   );
//   console.log(updatedProduct, "updatedProduct");
//   return updatedProduct;
// };

const updateProductDiscountDetails = async (ctx) => {
  // const productCollection = ctx.db.collection("products"); // Ensure this line is not commented out
  const { productId } = ctx.state.shared;

  console.log("Shared State:", ctx.state.shared);
  console.log("Product ID:", productId);

  if (!ObjectId.isValid(productId)) {
    console.error("Invalid ObjectId:", productId);
    return;
  }

  const updatedProduct = await productCollection.updateOne(
    { _id: new ObjectId(productId) },
    { $set: { isDiscount: false, couponCode: "", discountedPrice: 0 } }
  );

  console.log("Updated Product:", updatedProduct);
  console.log("Matched Count:", updatedProduct.matchedCount);
  console.log("Modified Count:", updatedProduct.modifiedCount);

  return updatedProduct;
};

const updateDiscountOnProduct = async (ctx) => {
  const { productId, couponCode, discountedPrice } = ctx.state.shared;
  return await productCollection.updateOne(
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
};

const updateDiscountOnCart = async (ctx, finalDiscount, storeId, productId) => {
  const userId = ctx.state.user.id;
  console.log(userId);

  const result = await cartCollection.updateOne(
    {
      userId,
      "items.productId": productId,
      "items.productDetails.storeId": storeId,
    },
    {
      $mul: { "items.$.totalPrice": 1 - finalDiscount },
    }
  );
  console.log(result);
  return result;
};

const deleteCoupons = async (ctx, discountId) =>
  await discountCollection.deleteOne({
    _id: discountId,
  });

const updateDiscounts = async (ctx, discountId, updatedData) =>
  await discountCollection.updateOne(
    {
      _id: discountId,
    },
    {
      $set: {
        ...updatedData,
      },
    }
  );

const findCouponByCouponCode = async (ctx) => {
  const { couponCode } = ctx.state.shared;
  return await discountCollection.findOne({
    couponCode: couponCode,
  });
};

const claimUserUpdate = async (ctx, filterone, filtertwo) =>
  await discountCollection.updateOne(filterone, filtertwo);

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
