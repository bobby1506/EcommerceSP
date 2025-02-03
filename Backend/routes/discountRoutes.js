const Router = require("koa-router");
const router = new Router();
const {
  createDiscount,
  deleteDiscount,
  updateDiscount,
  applyCoupon,
} = require("../controllers/discountController");

const {
  sellerAuth,
  verifyToken,
  userAuth,
} = require("../middlewares/tokenMiddleware");
const validateAll = require("../middlewares/ValidatorsAll");
const {
  discountIdValidator,
  couponCodeValidator,
  discountedPriceValidator,
} = require("../validators/discountValidator");
const { productIdValidator } = require("../validators/productValidators");

router.post(
  "/createCoupon",
  verifyToken,
  validateAll([discountIdValidator, couponCodeValidator, productIdValidator]),
  sellerAuth,
  createDiscount
);
router.put(
  "/updateCoupon",
  verifyToken,
  validateAll([discountIdValidator, discountedPriceValidator]),
  sellerAuth,
  updateDiscount
);
router.post(
  "/deleteCoupon",
  verifyToken,
  validateAll([discountIdValidator]),
  sellerAuth,
  deleteDiscount
);
router.post(
  "/applycoupon",
  verifyToken,
  validateAll([couponCodeValidator]),
  userAuth,
  applyCoupon
);

module.exports = router;
