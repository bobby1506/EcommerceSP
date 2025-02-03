const { getProductById } = require("../queries/productQueries");
const { isEmpty } = require("../sharedFunction/authShared");
const { ObjectId } = require("mongodb");

const productNameValidator = async (ctx) => {
  const { productName } = ctx.request.body;

  const emptyError = isEmpty(productName, "productName");
  if (emptyError) return emptyError;

  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    productName,
  };

  return null;
};

const productIdValidator = async (ctx) => {
  const { productId } = ctx.request.body;
  const emptyError = isEmpty(productId, "productId");
  if (emptyError) return emptyError;

  if (!ObjectId.isValid(productId)) {
    return {
      field: "productId",
      message: "Product id is not in valid format",
    };
  }

  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    productId,
  };
  return null;
};

const productIdValidatorByParams = async (ctx) => {
  const { productId } = ctx.request.params;
  const emptyError = isEmpty(productId, "productId");
  if (emptyError) return emptyError;

  if (!ObjectId.isValid(productId)) {
    return {
      field: "productId",
      message: "Product id is not in valid format",
    };
  }

  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    productId,
  };
  return null;
};

const categoryValidator = async (ctx) => {
  const { category } = ctx.request.body;
  const emptyError = isEmpty(category, "category");
  if (emptyError) return emptyError;
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    category,
  };
  return null;
};

const descriptionValidator = async (ctx) => {
  const { description } = ctx.request.body;
  const emptyError = isEmpty(description, "description");
  if (emptyError) return emptyError;
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    description,
  };
  return null;
};

const priceValidator = async (ctx) => {
  const { price } = ctx.request.body;
  const emptyError = isEmpty(price, "price");
  if (emptyError) return emptyError;
  if (price <= 0) {
    return {
      field: "price",
      message: "Price must be greater than 0, and stocks must be 0 or more",
    };
  }
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    price,
  };
  return null;
};

const stocksValidator = async (ctx) => {
  const { stocks } = ctx.request.body;
  const emptyError = isEmpty(stocks, "stocks");
  if (emptyError) return emptyError;
  if (stocks < 0) {
    return {
      field: "stocks",
      message: "Stocks must be greater than zero",
    };
  }
  ctx.state.shared = {
    ...(ctx.state.shared || {}),
    stocks,
  };
  return null;
};

const isproductExist = async (ctx) => {
  const product = await getProductById(ctx);
  if (!product)
    return {
      field: "product",
      message: "Product does not exist",
    };
  return null;
};

module.exports = {
  productIdValidator,
  isproductExist,
  descriptionValidator,
  stocksValidator,
  priceValidator,
  categoryValidator,
  productIdValidatorByParams,
  productNameValidator,
};
