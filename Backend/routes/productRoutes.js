const Router = require("koa-router");
const {
  createProduct,
  getProductsDetails,
  getProductsOfStore,
  getstoreProductAdmin,
} = require("../controllers/productController");

const { sellerAuth, verifyToken } = require("../utils/jwtUtils");

const router = new Router();

router.post("/createProduct", sellerAuth, createProduct);
router.get("/getstoreproductAdmin/:ownerId", sellerAuth, getstoreProductAdmin);
router.get("/getProductsOfStore/:storeId", verifyToken, getProductsOfStore);
router.get("/productDetails/:productId", verifyToken, getProductsDetails);

module.exports = router;
