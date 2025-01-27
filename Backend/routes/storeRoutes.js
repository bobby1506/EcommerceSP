const Router = require("koa-router");
const {
  createStore,
  storeList,
  ownerDashboardDetail,
  deleteStoreOwner,
  updateStore,
} = require("../controllers/storeController");
const { sellerAuth, verifyToken } = require("../middlewares/tokenMiddleware");

const router = new Router();

router.post("/createStore", verifyToken, createStore);
router.get("/listStore", storeList);
router.get("/ownerDashboard", sellerAuth, ownerDashboardDetail);
router.post("/deleteStore/:storeId", verifyToken, sellerAuth, deleteStoreOwner);
router.post("/updateStore/:storeId", verifyToken, sellerAuth, updateStore);

module.exports = router;
