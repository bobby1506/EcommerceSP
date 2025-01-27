const { ObjectId } = require("mongodb");

const findProductById = async (productCollection, productId) => {
  const result = await productCollection.findOne({
    _id: new ObjectId(productId),
  });

  return result;
};

const updateProductStock = async (productCollection, productId, quantity) => {
  const result = await productCollection.updateOne(
    { _id: new ObjectId(productId) },
    { $inc: { stocks: -quantity } }
  );

  return result;
};

module.exports = {
  findProductById,
  updateProductStock,
};
