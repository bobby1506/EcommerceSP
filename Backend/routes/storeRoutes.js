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
const { validateAll } = require("../middlewares/ValidatorsAll");
const {
  storeNameValidator,
  ownerNameValidator,
  addressValidator,
  descriptionValidator,
  categoryValidator,
  openTimeValidator,
  closeTimeValidator,
  // mediaLinksValidator,
  gstNumberValidator,
  // isBranchValidator,
  upiIdValidator,
  storeIdValidatorByParams,
  updatedValidator,
} = require("../validators/storeValidators");

const router = new Router();

router.post(
  "/createStore",
  verifyToken,
  sellerAuth,
  validateAll([
    storeNameValidator,
    ownerNameValidator,
    addressValidator,
    descriptionValidator,
    categoryValidator,
    openTimeValidator,
    closeTimeValidator,
    gstNumberValidator,
    // isBranchValidator,
    upiIdValidator,
  ]),
  createStore
);
router.get("/listStore", verifyToken, userAuth, storeList);
router.get("/ownerDashboard", verifyToken, sellerAuth, ownerDashboardDetail);
router.post(
  "/deleteStore/:storeId",
  verifyToken,
  validateAll([storeIdValidatorByParams]),
  sellerAuth,
  deleteStoreOwner
);
router.post(
  "/updateStore/:storeId",
  verifyToken,
  validateAll([storeIdValidatorByParams, updatedValidator]),
  sellerAuth,
  updateStore
);

module.exports = router;
