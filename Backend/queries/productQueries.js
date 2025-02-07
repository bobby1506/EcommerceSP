const { ObjectId } = require("mongodb");
const cloudinary = require("cloudinary");
const { client } = require("../config/db");
const productCollection = client.db(process.env.DB_NAME).collection("products");
const userCollection = client.db(process.env.DB_NAME).collection("users");

const getProductById = async (ctx) => {
  const { productId } = ctx.state.shared;
  return await productCollection.findOne({
    _id: new ObjectId(productId),
  });
};

const getProductByIDStoreId = async (ctx, storeId) => {
  const { productId } = ctx.state.shared;
  return await productCollection.findOne({
    _id: new ObjectId(productId),
    storeId: storeId,
  });
};

const updateProductDisocunt = async (ctx) => {
  const { couponCode, discountedPrice, productId } = ctx.state.shared;
  const res = await productCollection.updateOne(
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
  console.log(res, "res");
  return res;
};

const uploadProductLogo = async (filepath) => {
  return await cloudinary.v2.uploader.upload(filepath, {
    folder: "EcommerceSP",
    width: 150,
    crop: "scale",
  });
};

const findUserById = async (ctx, userId) => {
  return await userCollection.findOne(
    { _id: new ObjectId(userId), isSeller: true },
    { projection: { storeId: 1, isSeller: 1 } }
  );
};

const findProductByName = async (ctx, productName, storeId) =>
  await productCollection.findOne({
    productName: productName,
    storeId: storeId,
  });

const createProductInDB = async (ctx, product) => {
  const res = await productCollection.insertOne(product);
  console.log(res, "resulted product");
};

const getProductsByStoreId = async (ctx, storeId) =>
  await productCollection.find({ storeId: new ObjectId(storeId) }).toArray();

const deleteProductById = async (ctx) => {
  const { productId } = ctx.state.shared;
  return await productCollection.deleteOne({
    _id: new ObjectId(productId),
  });
};

const updateProductById = async (ctx, productData) => {
  const { productId } = ctx.state.shared;
  return productCollection.updateOne(
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
