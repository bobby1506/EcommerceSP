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

router.post("/createCoupon", verifyToken, sellerAuth, createDiscount);
router.put("/updateCoupon", verifyToken, sellerAuth, updateDiscount);
router.post("/deleteCoupon", verifyToken, sellerAuth, deleteDiscount);
router.post("/applycoupon", verifyToken, userAuth, applyCoupon);

module.exports = router;
