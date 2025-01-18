const Router = require("koa-router");
const {
  createStore,
  storeList,
  ownerDashboardDetail,
} = require("../controllers/storeController");
const { sellerAuth, verifyToken } = require("../utils/jwtUtils");

const router = new Router();

router.post("/createStore", verifyToken, createStore);
router.get("/listStore", storeList);
router.get("/ownerDashboard", sellerAuth, ownerDashboardDetail);

module.exports = router;
