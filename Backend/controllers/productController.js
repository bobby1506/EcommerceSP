const { ObjectId } = require("mongodb");
const cloudinary = require("cloudinary");
const { resHandler } = require("../middlewares/errorHandler");
const {
  uploadProductLogo,
  findUserById,
  findProductByName,
  createProductInDB,
  getProductById,
  getProductsByStoreId,
  deleteProductById,
  updateProductById,
} = require("../queries/productQueries");
const { findUser } = require("../queries/userQueries");

const createProduct = async (ctx) => {
  try {
    const { productName, category, description, price, stocks } =
      ctx.state.shared;
    uploadProductLogo(ctx.request.files.logo.filepath);
    const userId = ctx.state.user?.id;
    const seller = findUserById(ctx, userId);
    if (!seller || !seller.isSeller) {
      return resHandler(
        ctx,
        false,
        "Access denied. Only sellers can create products",
        403
      );
    }
    const { storeId } = seller;
    const existingProduct = await findProductByName(ctx, productName);
    if (existingProduct) {
      return resHandler(
        ctx,
        false,
        "A product with the same name already exist in your store",
        400
      );
    }
    const newProduct = {
      productName,
      category,
      description,
      price: parseInt(price),
      stocks: parseInt(stocks),
      storeId,
      logo: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      isDiscount: true,
      discountPrice: 0,
    };
    const result = await createProductInDB(newProduct);
    resHandler(ctx, true, "Product created successfully", 201, {
      productId: result.insertedId,
      product: newProduct,
    });
  } catch (err) {
    resHandler(ctx, false, "Product not created", 500);
  }
};

const getProductsOfStore = async (ctx) => {
  try {
    const { storeId } = ctx.state.shared;
    if (!storeId) {
      resHandler(ctx, false, "Invalid store id", 404);
    }
    const products = await getProductsByStoreId(ctx, storeId);
    resHandler(ctx, true, "Product fetched successfully", 200, { products });
  } catch (err) {
    resHandler(ctx, false, "Product fetched error", 400);
  }
};

const getProductsDetails = async (ctx) => {
  try {
    const productDetails = await getProductById(ctx);
    if (!productDetails) {
      return resHandler(ctx, false, "Product not found", 404);
    }
    resHandler(ctx, true, "Product details fetched successfully", 200, {
      productDetails,
    });
  } catch (err) {
    resHandler(ctx, false, "Product details fetched fail for user", 403);
  }
};

const getstoreProductAdmin = async (ctx) => {
  try {
    const ownerId = ctx.state.user?.id;
    const user = await findUser(ctx, { _id: new ObjectId(ownerId) });
    if (!user) return resHandler(ctx, false, "User not found", 404);
    const storeId = user.storeId;
    if (!storeId) {
      return resHandler(ctx, false, "please provide the storeid", 400);
    }
    const products = await getProductsByStoreId(ctx, storeId);
    resHandler(ctx, true, "Products fetched successfully", 200, { products });
  } catch (err) {
    resHandler(ctx, false, "Error in getting owners product", 500);
  }
};

const deleteProductOwner = async (ctx) => {
  try {
    const userId = ctx.state.user?.id;
    const user = await findUser(ctx, { _id: new ObjectId(userId) });
    if (!user) {
      return resHandler(ctx, false, "User not found", 404);
    }
    const storeId = user.storeId.toString();
    // const { productId } = ctx.params;
    // const productCollection = ctx.db.collection("products");
    const product = await getProductById(ctx); //get
    if (!product) {
      return resHandler(ctx, false, "Product not found", 404);
    }
    const storeOwnerId = product.storeId;
    if (storeId.toString() != storeOwnerId.toString()) {
      return resHandler(
        ctx,
        false,
        "You dont have an access of this store",
        403
      );
    }
    const deletedProduct = await deleteProductById(ctx);
    if (deletedProduct.deletedCount === 0) {
      resHandler(ctx, false, "Product not found", 404);
    }
    resHandler(ctx, true, "Product deleted successfully", 200);
  } catch (err) {
    resHandler(ctx, false, "Error in deleting product");
  }
};

const updatedProductOwner = async (ctx) => {
  try {
    const updatedData = ctx.request.body;
    const userId = ctx.state.user?.id;
    const user = await findUser(ctx, { _id: new ObjectId(userId) });
    if (!user) {
      return resHandler(ctx, false, "User not found", 404);
    }
    const storeId = user.storeId;
    const product = await getProductById(ctx);
    if (!product) {
      return resHandler(ctx, false, "Product not found", 404);
    }
    const storeOwnerId = product.storeId;
    if (storeId.toString() != storeOwnerId.toString()) {
      return resHandler(
        ctx,
        false,
        "You dont have an access of thsi store",
        403
      );
    }
    const products = await updateProductById(ctx, updatedData);
    if (products.matchedCount == 0) {
      return resHandler(ctx, false, "product not found", 404);
    }
    resHandler(ctx, true, "Product not found", 200);
  } catch (err) {
    resHandler(ctx, false, "Update product failed", 500);
  }
};

module.exports = {
  createProduct,
  getProductsDetails,
  getProductsOfStore,
  getstoreProductAdmin,
  deleteProductOwner,
  updatedProductOwner,
};
