const { resHandler } = require("../middlewares/errorHandler");
const {
  findProductById,
  updateCart,
  removeProductFromCart,
  updateCartProduct,
  findCartByUserId,
} = require("../queries/cartQueries");

// Add to cart
const addToCart = async (ctx) => {
  try {
    const { productId } = ctx.request.body;

    // const productCollection = ctx.db.collection("products");
    // const cartCollection = ctx.db.collection("carts");
    const product = await findProductById(ctx.db, productId);
    if (!product) return resHandler(ctx, false, "Product not found", 404);

    // Find product details
    // const product = await productCollection.findOne({
    //   _id: new ObjectId(productId),
    // });
    const result = await updateCart(ctx.db, ctx.state.user.id, product);
    return resHandler(ctx, true, "Product added to cart", 200, result);

    // console.log(product);
    // if (!product) {
    //   ctx.status = 404;
    //   ctx.body = {
    //     success: false,
    //     message: "Product not found",
    //   };
    //   return;
    // }

    // const result = await cartCollection.updateOne(
    //   { userId: ctx.state.user?.id },
    //   {
    //     $push: {
    //       items: {
    //         productId,
    //         quantity: 1,
    //         productDetails: product,
    //         totalPrice: product.price * 1,
    //       },
    //     },
    //   },
    //   { upsert: true }
    // );

    // ctx.status = 200;
    // ctx.body = {
    //   success: true,
    //   message: "Product added to cart",
    //   result,
    // };
  } catch (error) {
    console.log("Error adding to cart:", error);
    return resHandler(ctx, false, "Failed to add to cart", 500);
  }
};

// Remove from cart
const removeFromCart = async (ctx) => {
  try {
    const { productId } = ctx.request.body;

    // if (!productId) {
    //   ctx.status = 400;
    //   ctx.body = { success: false, message: "Missing productId" };
    //   return;
    // }

    // const cartCollection = ctx.db.collection("carts");

    // Remove product from cart
    // const result = await cartCollection.updateOne(
    //   { userId: ctx.state.user?.id },
    //   {
    //     $pull: { items: { productId } },
    //   }
    // );

    // if (result.modifiedCount === 0) {
    //   ctx.status = 404;
    //   ctx.body = { success: false, message: "Product not found in cart" };
    //   return;
    // }

    const result = await removeProductFromCart(
      ctx.db,
      ctx.state.user.id,
      productId
    );

    if (result.modifiedCount === 0) {
      return resHandler(ctx, false, "Product not found in cart", 500);
    }
    return resHandler(ctx, true, "Product removed from cart", 200);

    // ctx.status = 200;
    // ctx.body = {
    //   success: true,
    //   message: "Product removed from cart",
    // };
  } catch (error) {
    console.log("Error removing from cart", error);
    return resHandler(ctx, false, "Failed to remove product", 500);
  }
};

// Update cart
// const updateCart = async (ctx) => {
//   const { productId, quantity } = ctx.request.body;

//   try {
//     console.log("first");

//     const cartCollection = ctx.db.collection("carts");

//     const result = await cartCollection.updateOne({});
//     console.log(result);

//     if (result.modifiedCount === 0) {
//       ctx.status = 404;
//       ctx.body = { message: "Product not found in cart", success: false };
//     } else {
//       ctx.status = 200;
//       ctx.body = { message: "Cart updated successfully", success: true };
//     }
//   } catch (error) {
//     ctx.status = 500;
//     ctx.body = { message: "Failed to update cart", success: false };
//   }
// };
const updateCarts = async (ctx) => {
  const { productId, quantity } = ctx.request.body;

  try {
    console.log("first");

    const cart = await findCartByUserId(ctx.db, ctx.state.user.id);
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

    const result = await updateCartProduct(
      ctx.db,
      cart._id,
      productId,
      updatedFields
    );
    if (result.modifiedCount === 0) {
      return resHandler(ctx, false, "Product update failed", 404);
    }

    return resHandler(ctx, true, "Cart updated successfully", 200);

    // const cartCollection = ctx.db.collection("carts");

    // const cart = await cartCollection.findOne({ userId: ctx.state.user?.id });

    // if (!cart) {
    //   ctx.status = 404;
    //   ctx.body = { message: "Cart not found", success: false };
    //   return;
    // }

    // const productIndex = cart.items.findIndex(
    //   (item) => item.productId === productId
    // );
    // if (productIndex === -1) {
    //   ctx.status = 404;
    //   ctx.body = { message: "Product not found in cart", success: false };
    //   return;
    // }

    // const product = cart.items[productIndex];
    // const productPrice = product.productDetails.price;

    // const newTotalPrice = productPrice * quantity;

    // const result = await cartCollection.updateOne(
    //   { _id: cart._id, "items.productId": productId },
    //   {
    //     $set: {
    //       "items.$.quantity": quantity,
    //       "items.$.totalPrice": newTotalPrice,
    //     },
    //   }
    // );

    // console.log(result);

    // if (result.modifiedCount === 0) {
    //   ctx.status = 404;
    //   ctx.body = { message: "Product not found in cart", success: false };
    // } else {
    //   ctx.status = 200;
    //   ctx.body = { message: "Cart updated successfully", success: true };
    // }
  } catch (error) {
    console.log("Error updating cart", error);
    return resHandler(ctx, false, "Failed to update cart", 500);
  }
};

//get cart
const getCart = async (ctx) => {
  try {
    const cart = await findCartByUserId(ctx.db, ctx.state.user?.id);
    const cartResponse = cart || { userId: ctx.state.user.id, items: [] };

    return resHandler(
      ctx,
      true,
      "Cart retrieved successfully",
      200,
      cartResponse
    );
    // const userId = ctx.state.user?.id;

    // if (!userId) {
    //   ctx.status = 401;
    //   ctx.body = {
    //     success: false,
    //     message: "Invalid user",
    //   };
    // }

    // const cartCollection = ctx.db.collection("carts");
    // const cart = await cartCollection.findOne({
    //   userId: userId,
    // });

    // const cartResponse = cart || { userId, items: [] };

    // (ctx.status = 200),
    //   (ctx.body = {
    //     success: true,
    //     message: "Cart found for the given user",
    //     cartResponse,
    //   });
  } catch (error) {
    //   console.log("Internal error", err);
    //   (ctx.status = 500),
    //     (ctx.body = {
    //       message: "Internal server",
    //       success: false,
    //     });
    // }
    console.log("error in fetching cart", error);
    return resHandler(ctx, false, "Failed to fetch cart", 500);
  }
};

module.exports = { addToCart, removeFromCart, updateCarts, getCart };
