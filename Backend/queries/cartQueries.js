const { ObjectId } = require("mongodb");

const findProductById = async (db, productId) => {
  const productCollection = db.collection("products");
  const foundProduct = await productCollection.findOne({
    _id: new ObjectId(productId),
  });
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
const removeProductFromCart = async (db, userId, productId) => {
  const collection = db.collection("carts");
  const result = await collection.updateOne(
    { userId },
    { $pull: { items: { productId } } }
  );
  return result;
};

// Update a specific product in the cart
const updateCartProduct = async (db, cartId, productId, updatedFields) => {
  const collection = db.collection("carts");
  const result = await collection.updateOne(
    { _id: cartId, "items.productId": productId },
    { $set: updatedFields }
  );
  return result;
};

// Query to find the user's cart
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
