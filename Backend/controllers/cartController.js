const { resHandler } = require("../middlewares/errorHandler");
const {
  findProductById,
  updateCart,
  removeProductFromCart,
  updateCartProduct,
  findCartByUserId,
} = require("../queries/cartQueries");

const addToCart = async (ctx) => {
  try {
    const { productId } = ctx.state.shared;
    const product = await findProductById(ctx, productId);
    if (!product) return resHandler(ctx, false, "Product not found", 404);
    const updatedCart = await updateCart(ctx, ctx.state.user?.id, product, 1);
    if (updatedCart.modifiedCount == 0)
      return resHandler(ctx, true, "No updation happend", 204);
    resHandler(ctx, true, "Cart updated", 200);
  } catch (error) {
    return resHandler(ctx, false, "Failed to add to cart", 500);
  }
};

const removeFromCart = async (ctx) => {
  try {
    const { productId } = ctx.state.shared;
    console.log(productId);
    const removedProduct = await removeProductFromCart(
      ctx,
      ctx.state.user.id,
      productId
    );
    if (!removedProduct.acknowledged) {
      return resHandler(ctx, false, "Updation failed", 500);
    }
    resHandler(ctx, true, "Product removed from cart", 200);
  } catch (error) {
    return resHandler(ctx, false, "Failed to remove product", 500);
  }
};

const updateCarts = async (ctx) => {
  try {
    const { productId, quantity } = ctx.state.shared;
    const cart = await findCartByUserId(ctx);
    if (!cart) return resHandler(ctx, false, "Cart not found", 404);
    const productIndex = cart.items.findIndex(
      (item) => item.productId === productId
    );
    if (productIndex === -1) {
      return resHandler(ctx, false, "Product not found", 404);
    }
    const product = cart.items[productIndex];
    const updatedFields = {
      "items.$.quantity": quantity,
      "items.$.totalPrice": product.productDetails.price * quantity,
    };
    const updatedCart = await updateCartProduct(
      ctx,
      cart._id,
      productId,
      updatedFields
    );
    if (updatedCart.acknowledged === 0) {
      return resHandler(ctx, false, "Product update failed", 400);
    }
    resHandler(ctx, true, "Cart updated successfully", 200);
  } catch (error) {
    return resHandler(ctx, false, "Failed to update cart", 500);
  }
};

const getCart = async (ctx) => {
  try {
    const cart = await findCartByUserId(ctx, ctx.state.user?.id);
    if (!cart) return resHandler(ctx, false, "Cart not found", 404);
    const cartResponse = cart || { userId: ctx.state.user.id, items: [] };
    resHandler(ctx, true, "Cart retrieved successfully", 200, cartResponse);
  } catch (error) {
    return resHandler(ctx, false, "Failed to fetch cart", 500);
  }
};

module.exports = { addToCart, removeFromCart, updateCarts, getCart };
