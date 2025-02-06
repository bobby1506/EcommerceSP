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
  emailValidatorSignIn,
} = require("../validators/authValidators");

const { verifyToken } = require("../middlewares/tokenMiddleware");

const router = new Router();

router.post(
  "/register",
  validateAll([
    emailValidatorSignIn,
    userExist,
    usernameValidator,
    passwordValidator,
    isSellerValidator,
  ]),
  registerUser
);

router.post(
  "/login",
  validateAll([emailValidatorSignIn, passwordValidator]),
  login
);

router.get(
  "/getuser",
  verifyToken,
  validateAll([emailValidator, isuserExistValidator]),
  getUser
);

module.exports = router;
