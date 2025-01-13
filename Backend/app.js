const koa = require("koa");
const Router = require("koa-router");
const connectDb = require("./config/db");
require("dotenv").config();
const bodyParser = require("koa-bodyparser");

//Auth Routers
const authRoute = require("./routes/authRoutes");

const routes = [authRoute];

const app = new koa();
const router = new Router();

//middlewares
app.use(bodyParser());

router.get("/", (ctx) => {
  ctx.status = 200;
  ctx.body = {
    message: "Welcome to the root route!",
  };
});

app.use(router.routes()).use(router.allowedMethods());

routes.forEach((route) => app.use(route.routes()));

const startServer = async () => {
  try {
    await connectDb();
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
