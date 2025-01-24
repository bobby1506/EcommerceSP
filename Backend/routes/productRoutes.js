const Router = require("koa-router");
const {
  createProduct,
  getProductsDetails,
  getProductsOfStore,
  getstoreProductAdmin,
  updatedProductOwner,
  deleteProductOwner,
} = require("../controllers/productController");

const { sellerAuth, verifyToken } = require("../middlewares/tokenMiddleware");

const router = new Router();

router.post("/createProduct", sellerAuth, createProduct);
router.get("/getstoreproductAdmin", sellerAuth, getstoreProductAdmin);
router.get("/getProductsOfStore/:storeId", verifyToken, getProductsOfStore);
router.get("/productDetails/:productId", verifyToken, getProductsDetails);
router.patch("/productUpdate/:productId", sellerAuth, updatedProductOwner);
router.delete("/deleteProduct/:productId", sellerAuth, deleteProductOwner);

module.exports = router;
