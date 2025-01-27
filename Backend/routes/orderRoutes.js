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
const { getUserValidator } = require("../validators/authValidators");

const router = new Router();

router.post(
  "/createOrder",
  verifyToken,
  validateAll([validateOrder]),
  userAuth, //make it a validator
  createOrder
);
router.get(
  "/orderDetailOwner",
  verifyToken,
  validateAll([getUserValidator]),
  sellerAuth,
  orderDetailOwner
);
router.get("/orderDetails", verifyToken, userAuth, orderDetails);
router.post(
  "/orderStatusChange",
  validateAll([validateOrderStatus]),
  sellerAuth, //make it a validator
  orderStatusChange
);

module.exports = router;
