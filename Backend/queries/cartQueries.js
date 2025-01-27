const { ObjectId } = require("mongodb");
const { resHandler } = require("../middlewares/errorHandler");

const findProductById = async (ctx, productId) => {
  const productCollection = ctx.db.collection("products");
  const foundProduct = await productCollection.findOne({
    _id: new ObjectId(productId),
  });

  if (!foundProduct) return resHandler(ctx, false, "Product not found", 404);
  return foundProduct;
};

//update or create a cart
const updateCart = async (db, userId, product) => {
  const cartCollection = db.collection("carts");

  const updatedCart = await cartCollection.updateOne(
    { userId },
    {
      $push: {
        items: {
          productId: product._id.toString(),
          quantity: 1,
          productDetails: product,
          totalPrice: product.price,
        },
      },
    },
    { upsert: true }
  );

  return updatedCart;
};

//remove a product from cart
const removeProductFromCart = async (ctx, userId, productId) => {
  const collection = ctx.collection("carts");
  const result = await collection.updateOne(
    { userId },
    { $pull: { items: { productId } } }
  );

  if (result.modifiedCount === 0) {
    return resHandler(ctx, false, "Product not found in cart", 500);
  }

  return result;
};

// Update a specific product in the cart
const updateCartProduct = async (ctx, cartId, productId, updatedFields) => {
  const collection = ctx.db.collection("carts");
  const result = await collection.updateOne(
    { _id: cartId, "items.productId": productId },
    { $set: updatedFields }
  );

  if (result.modifiedCount === 0) {
    return resHandler(ctx, false, "Product update failed", 404);
  }

  return result;
};

//find the user's cart
const findCartByUserId = async (db, userId) => {
  const cartCollection = db.collection("carts");

  const cart = await cartCollection.findOne({ userId });
  return cart;
};

module.exports = {
  findProductById,
  updateCart,
  removeProductFromCart,
  updateCartProduct,
  findCartByUserId,
};
