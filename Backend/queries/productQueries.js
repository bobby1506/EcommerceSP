const { ObjectId } = require("mongodb");
const cloudinary = require("cloudinary");

const getProductById = async (ctx) => {
  const { productId } = ctx.state.shared;
  const product = await ctx.db.collection("products").findOne({
    _id: new ObjectId(productId),
  });
  return product;
};

const getProductByIDStoreId = async (ctx, storeId) => {
  const { productId } = ctx.state.shared;
  const productCollection = ctx.db.collection("products");

  const product = await productCollection.findOne({
    _id: new ObjectId(productId),
    storeId: storeId,
  });
  return product;
};

const updateProductDisocunt = async (ctx) => {
  const { couponCode, discountedPrice, productId } = ctx.state.shared;
  const productCollection = ctx.db.collection("products");
  const updatedProduct = productCollection.updateOne(
    {
      _id: new ObjectId(productId),
    },
    {
      $set: {
        isDiscount: true,
        discountedPrice: discountedPrice,
        couponCode: couponCode,
      },
    }
  );
  return updatedProduct;
};

const uploadProductLogo = async (filepath) => {
  return await cloudinary.v2.uploader.upload(filepath, {
    folder: "EcommerceSP",
    width: 150,
    crop: "scale",
  });
};

const findUserById = async (ctx, userId) => {
  return await ctx.db
    .collection("users")
    .findOne(
      { _id: new ObjectId(userId), isSeller: true },
      { projection: { storeId: 1, isSeller: 1 } }
    );
};

const findProductByName = async (ctx, productName, storeId) => {
  const result = await ctx.db.collection("products").findOne({
    productName: productName,
    storeId: storeId,
  });
  return result;
};

const createProductInDB = async (ctx, product) => {
  const result = await ctx.db.collection("products").insertOne(product);
  return result;
};

const getProductsByStoreId = async (ctx, storeId) => {
  return await ctx.db
    .collection("products")
    .find({ storeId: new ObjectId(storeId) })
    .toArray();
};

const deleteProductById = async (ctx) => {
  const { productId } = ctx.state.shared;
  return await ctx.db.collection("products").deleteOne({
    _id: new ObjectId(productId),
  });
};

const updateProductById = async (ctx, productData) => {
  const { productId } = ctx.state.shared;
  return await ctx.db
    .collection("products")
    .updateOne(
      { _id: new ObjectId(productId) },
      { $set: productData.productData }
    );
};

module.exports = {
  updateProductById,
  uploadProductLogo,
  findUserById,
  getProductByIDStoreId,
  createProductInDB,
  getProductsByStoreId,
  getProductById,
  deleteProductById,
  updateProductDisocunt,
  findProductByName,
};
