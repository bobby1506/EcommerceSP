const { ObjectId } = require("mongodb");
const cloudinary = require("cloudinary");

//1
const getProductById = async (ctx) => {
  const { productId } = ctx.state.shared;
  const product = await ctx.db.collection("products").findOne({
    _id: new ObjectId(productId),
  });
  return product;
};

//2
const getProductByIDStoreId = async (ctx, storeId) => {
  const { productId } = ctx.state.shared;
  const productCollection = ctx.db.collection("products");

  const product = await productCollection.findOne({
    _id: new ObjectId(productId),
    storeId: storeId,
  });
  return product;
};

//3
const updateProductDisocunt = async (ctx, discountedPrice) => {
  const productCollection = ctx.db.collection("products");
  const updatedProduct = productCollection.updateOne({
    $set: {
      isDiscount: true,
      discountedPrice: discountedPrice,
      couponCode: couponCode,
    },
  });
  return updatedProduct;
};

//4
const uploadProductLogo = async (filepath) => {
  return await cloudinary.v2.uploader.upload(filepath, {
    folder: "EcommerceSP",
    width: 150,
    crop: "scale",
  });
};

//5
const findUserById = async (ctx, userId) => {
  return await ctx.db
    .collection("users")
    .findOne(
      { _id: new ObjectId(userId), isSeller: true },
      { projection: { storeId: 1, isSeller: 1 } }
    );
};

//6
const findProductByName = async (ctx, productName, productId) => {
  return await ctx.db.collection("products").findOne({
    productName,
    storeId,
  });
};

//7
const createProductInDB = async (ctx, product) => {
  return await ctx.db.collection("products").insertOne(product);
};

//8
const getProductsByStoreId = async (ctx, storeId) => {
  return await ctx.db
    .collection("products")
    .find({ storeId: new ObjectId(storeId) })
    .toArray();
};

//9
const deleteProductById = async (ctx, productId) => {
  const { productId } = ctx.state.shared;
  return await ctx.db.collection("products").deleteOne({
    _id: new ObjectId(productId),
  });
};

//10
const updateProductById = async (ctx, updatedData) => {
  const { productId } = ctx.state.shared;
  return await ctx.db
    .collection("products")
    .updateOne({ _id: new ObjectId(productId) }, { $set: updatedData });
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
