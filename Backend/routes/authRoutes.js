const Router = require("koa-router");
const {
  registerUser,
  login,
  logout,
  getUser,
} = require("../controllers/authController");

const { validateAll } = require("../middlewares/ValidatorsAll");
const {
  usernameValidator,
  emailValidator,
  passwordValidator,
  getUserValidator,
} = require("../validators/authValidators");
const { userAuth } = require("../middlewares/tokenMiddleware");

const { verifyToken } = require("../middlewares/tokenMiddleware");

const router = new Router();

router.post(
  "/register",
  validateAll([emailValidator, usernameValidator, passwordValidator]),
  registerUser
);

router.post("/login", validateAll([emailValidator, passwordValidator]), login);

router.post("logout", logout);

router.get(
  "/getuser",
  verifyToken,
  userAuth,
  validateAll([getUserValidator]),
  getUser
);

module.exports = router;
