const koa = require("koa");
const cors = require("@koa/cors");
const Router = require("koa-router");
const koaHelmet = require("koa-helmet");

const connectDB = require("./config/db");
require("dotenv").config();
const bodyParser = require("koa-bodyparser");
// const cloudinary = require("cloudinary");
const dbMiddleware = require("./middlewares/dbMiddleware");
//Auth Routers
const authRoute = require("./routes/authRoutes");
const storeRoutes = require("./routes/storeRoutes");
const productRoute = require("./routes/productRoutes");

const routes = [authRoute, storeRoutes, productRoute];

//instead of doing this create index.js in routes folder and do that looping over their

const app = new koa();
const router = new Router();

//middlewares
app.use(bodyParser());
app.use(dbMiddleware);
app.use(cors());
app.use(koaHelmet());

//other middlewares than body parser
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
    await connectDB();

    // cloudinary.config({
    //   cloud_name: process.env.CLOUDINARY_NAME,
    //   api_key: process.env.CLOUDINARY_API_KEY,
    //   api_secret: process.env.CLOUSINRAY_API_SECRET,
    // });

    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
