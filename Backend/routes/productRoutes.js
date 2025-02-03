const Router = require("koa-router");
const {
  createProduct,
  getProductsDetails,
  getProductsOfStore,
  getstoreProductAdmin,
  updatedProductOwner,
  deleteProductOwner,
} = require("../controllers/productController");
const { validateAll } = require("../middlewares/ValidatorsAll");

const {
  sellerAuth,
  verifyToken,
  userAuth,
} = require("../middlewares/tokenMiddleware");
const {
  productIdValidator,
  productNameValidator,
  descriptionValidator,
  priceValidator,
  stocksValidator,
  categoryValidator,
  productIdValidatorByParams,
} = require("../validators/productValidators");
const { storeIdValidatorByParams } = require("../validators/storeValidators");

const router = new Router();

router.post(
  "/createProduct",
  verifyToken,
  validateAll([
    productIdValidator,
    productNameValidator,
    descriptionValidator,
    priceValidator,
    stocksValidator,
    categoryValidator,
  ]),
  sellerAuth,
  createProduct
);
router.get(
  "/getstoreproductAdmin",
  verifyToken,
  validateAll([]),
  sellerAuth,
  getstoreProductAdmin
);
router.get(
  "/getProductsOfStore/:storeId",
  verifyToken,
  validateAll([storeIdValidatorByParams]),
  userAuth,
  getProductsOfStore
);
router.get(
  "/productDetails/:productId",
  verifyToken,
  validateAll([productIdValidatorByParams]),
  userAuth,
  getProductsDetails
);
router.post(
  "/productUpdate/:productId",
  verifyToken,
  sellerAuth,
  validateAll([productIdValidatorByParams]),
  updatedProductOwner
);
router.delete(
  "/deleteProduct/:productId",
  verifyToken,
  validateAll([productIdValidatorByParams]),
  sellerAuth,
  deleteProductOwner
);

module.exports = router;
