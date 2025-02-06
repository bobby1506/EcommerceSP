const { ObjectId } = require("mongodb");

const findProductById = async (ctx, productId) => {
  const productCollection = ctx.db.collection("products");
  const foundProduct = await productCollection.findOne({
    _id: new ObjectId(productId),
  });
  return foundProduct;
};

const updateCart = async (ctx, userId, product, quantity) => {
  const cartCollection = ctx.db.collection("carts");
  const updatedCart = await cartCollection.updateOne(
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
  return updatedCart;
};

const removeProductFromCart = async (ctx, userId, productId) => {
  console.log("hello");
  const collection = ctx.db.collection("carts");
  console.log(userId, "userId");
  const result = await collection.updateOne(
    { userId: userId },
    { $pull: { items: { productId } } }
  );
  return result;
};

const updateCartProduct = async (ctx, cartId, productId, updatedFields) => {
  const collection = ctx.db.collection("carts");
  const result = await collection.updateOne(
    { _id: cartId, "items.productId": productId },
    { $set: updatedFields }
  );
  return result;
};

const findCartByUserId = async (ctx) => {
  const userId = ctx.state.user?.id;
  if (!userId) {
    return resHandler(ctx, false, "Unauthorized user", 403);
  }
  const cartCollection = ctx.db.collection("carts");
  const cart = await cartCollection.findOne({ userId });
  return cart;
};

const updateCartPrice = async (ctx) => {
  const cartCollection = ctx.db.collection("carts");
  const updateCart = await cartCollection.updateOne(filterone, filtertwo);
  return updateCart;
};

module.exports = {
  findProductById,
  updateCart,
  removeProductFromCart,
  updateCartProduct,
  findCartByUserId,
  updateCartPrice,
};
