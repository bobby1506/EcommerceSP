const Router = require("koa-router");
const {
  createOrder,
  orderDetailOwner,
  orderDetails,
  orderStatusChange,
} = require("../controllers/orderController");
const { verifyToken, sellerAuth } = require("../middlewares/tokenMiddleware");

const router = new Router();

router.post("/createOrder", verifyToken, createOrder);
router.get("/orderDetailOwner", sellerAuth, orderDetailOwner);
router.get("/orderDetails", verifyToken, orderDetails);
router.post("/orderStatusChange", sellerAuth, orderStatusChange);

module.exports = router;
