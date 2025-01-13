const Router = require('koa-router')
const {registerUser, login, logout } = require("../controllers/authController")

const router = new Router()

router.post('/register', registerUser)
router.post('/login', login)
router.post('/logout', logout)

module.exports = router