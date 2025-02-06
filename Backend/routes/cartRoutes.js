const Router = require("koa-router");
const {
  addToCart,
  updateCarts,
  removeFromCart,
  getCart,
} = require("../controllers/cartController");
const { verifyToken, userAuth } = require("../middlewares/tokenMiddleware");
const { validateAll } = require("../middlewares/ValidatorsAll");
const {
  validateCartUpdate,
  validateProductId,
} = require("../validators/cartValidator");
const { isuserExistValidator } = require("../validators/authValidators");

const router = new Router();

router.post(
  "/addToCart",
  validateAll([validateProductId]),
  verifyToken,
  userAuth,
  addToCart
);
router.post(
  "/removeCart",
  verifyToken,
  validateAll([validateProductId]),
  userAuth,
  removeFromCart
);
router.post(
  "/updateCart",
  verifyToken,
  validateAll([validateProductId, validateCartUpdate]),
  userAuth,
  updateCarts
);
router.get(
  "/getCart",
  verifyToken,
  validateAll([isuserExistValidator]),
  userAuth,
  getCart
);
module.exports = router;
