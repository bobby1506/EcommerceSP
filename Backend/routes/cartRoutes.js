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
const {
  getUserValidator,
  emailValidator,
  isuserExistValidator,
} = require("../validators/authValidators");

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
  validateAll([validateProductId]),
  verifyToken,
  userAuth,
  removeFromCart
);
router.post(
  "/updateCart",
  validateAll([validateProductId, validateCartUpdate]),
  verifyToken,
  userAuth,
  updateCarts
);
router.get(
  "/getCart",
  verifyToken,
  validateAll([emailValidator, isuserExistValidator]),
  userAuth,
  getCart
);
module.exports = router;
