const Router = require("koa-router");
const {
  createOrder,
  orderDetailOwner,
  orderDetails,
  orderStatusChange,
} = require("../controllers/orderController");
const {
  verifyToken,
  sellerAuth,
  userAuth,
} = require("../middlewares/tokenMiddleware");
const { validateAll } = require("../middlewares/ValidatorsAll");
const {
  validateOrderStatus,
  validateOrder,
} = require("../validators/orderValidators");
const {
  isuserExistValidator,
  emailValidator,
} = require("../validators/authValidators");
const { productIdValidator } = require("../validators/productValidators");

const router = new Router();

router.post(
  "/createOrder",
  verifyToken,
  validateAll([validateOrder]),
  userAuth,
  createOrder
);
router.get(
  "/orderDetailOwner",
  verifyToken,
  validateAll([emailValidator, isuserExistValidator]),
  sellerAuth,
  orderDetailOwner
);
router.get("/orderDetails", verifyToken, userAuth, orderDetails);
router.post(
  "/orderStatusChange",
  verifyToken,
  validateAll([validateOrderStatus, productIdValidator]),
  sellerAuth,
  orderStatusChange
);

module.exports = router;
