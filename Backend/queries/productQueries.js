const { ObjectId } = require("mongodb");
const cloudinary = require("cloudinary");


  const uploadProductLogo= async (filepath) => {
    return await cloudinary.v2.uploader.upload(filepath, {
      folder: "EcommerceSP",
      width: 150,
      crop: "scale",
    });
  },

  const findUserById= async (db, userId) => {
    return await db.collection("users").findOne(
      { _id: new ObjectId(userId) },
      { projection: { storeId: 1, isSeller: 1 } }
    );
  },

  const checkExistingProduct = async (db, productName, storeId) => {
    return await db.collection("products").findOne({ productName, storeId });
  },

  const createProductInDB= async (db, product) => {
    return await db.collection("products").insertOne(product);
  },

  const getProductsByStoreId= async (db, storeId) => {
    return await db
      .collection("products")
      .find({ storeId: new ObjectId(storeId) })
      .toArray();
  },

  const getProductById=async (db, productId) => {
    return await db.collection("products").findOne({
      _id: new ObjectId(productId),
    });
  },

const updateProductById= async (db, productId, updatedData) => {
    return await db.collection("products").updateOne(
      { _id: new ObjectId(productId) },
      { $set: updatedData }
    );
  },

  const deleteProductById= async (db, productId) => {
    return await db.collection("products").deleteOne({
      _id: new ObjectId(productId),
    });
  },


module.exports = {updateProductById,
   uploadProductLogo,findUserById,
   checkExistingProduct,createProductInDB,
   getProductsByStoreId, getProductById};
