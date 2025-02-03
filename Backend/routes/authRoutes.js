const Router = require("koa-router");
const {
  registerUser,
  login,
  getUser,
} = require("../controllers/authController");

const { validateAll } = require("../middlewares/ValidatorsAll");
const {
  usernameValidator,
  emailValidator,
  isSellerValidator,
  passwordValidator,
  isuserExistValidator,
  userExist,
  passwordMatchValidator,
} = require("../validators/authValidators");

const { verifyToken } = require("../middlewares/tokenMiddleware");

const router = new Router();

router.post(
  "/register",
  validateAll([
    emailValidator,
    usernameValidator,
    passwordValidator,
    isSellerValidator,
    userExist,
  ]),
  registerUser
);

router.post(
  "/login",
  validateAll([
    emailValidator,
    passwordValidator,
    passwordMatchValidator,
    isuserExistValidator,
  ]),
  login
);

router.get(
  "/getuser",
  verifyToken,
  validateAll([emailValidator, isuserExistValidator]),
  getUser
);

module.exports = router;
