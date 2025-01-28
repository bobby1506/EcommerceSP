const Router = require("koa-router");
const {
  createStore,
  storeList,
  ownerDashboardDetail,
  deleteStoreOwner,
  updateStore,
} = require("../controllers/storeController");
const {
  sellerAuth,
  verifyToken,
  userAuth,
} = require("../middlewares/tokenMiddleware");

const router = new Router();

router.post("/createStore", verifyToken, sellerAuth, createStore);
router.get("/listStore", verifyToken, userAuth, storeList);
router.get("/ownerDashboard", sellerAuth, ownerDashboardDetail);
router.post("/deleteStore/:storeId", verifyToken, sellerAuth, deleteStoreOwner);
router.post("/updateStore/:storeId", verifyToken, sellerAuth, updateStore);

module.exports = router;
