const { client } = require("../config/db");
const { ObjectId } = require("mongodb");

const cartCollection = client.db(process.env.DB_NAME).collection("carts");

const productCollection = client.db(process.env.DB_NAME).collection("products");

const findProductById = async (ctx, productId) =>
  await productCollection.findOne({
    _id: new ObjectId(productId),
  });

const updateCart = async (ctx, userId, product, quantity) =>
  await cartCollection.updateOne(
    { userId },
    {
      $push: {
        items: {
          productId: product._id.toString(),
          quantity,
          productDetails: product,
          totalPrice: product.price,
        },
      },
    },
    { upsert: true }
  );

const removeProductFromCart = async (ctx, userId, productId) =>
  await cartCollection.updateOne(
    { userId: userId },
    { $pull: { items: { productId } } }
  );

const updateCartProduct = async (ctx, cartId, productId, updatedFields) =>
  await cartCollection.updateOne(
    { _id: cartId, "items.productId": productId },
    { $set: updatedFields }
  );

const findCartByUserId = async (ctx) => {
  const userId = ctx.state.user?.id;
  if (!userId) {
    return resHandler(ctx, false, "Unauthorized user", 403);
  }
  return await cartCollection.findOne({ userId });
};

const updateCartPrice = async (ctx) =>
  await cartCollection.updateOne(filterone, filtertwo);

module.exports = {
  findProductById,
  updateCart,
  removeProductFromCart,
  updateCartProduct,
  findCartByUserId,
  updateCartPrice,
};
