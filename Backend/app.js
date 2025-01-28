const koa = require("koa");
const cors = require("@koa/cors");
const Router = require("koa-router");
const koaHelmet = require("koa-helmet");
const { koaBody } = require("koa-body");
const connectDB = require("./config/db");
require("dotenv").config();
const cloudinary = require("cloudinary");
const dbMiddleware = require("./middlewares/dbMiddleware");
const { cronScheduler } = require("./controllers/cronController");
const { socketSetup } = require("./utils/socket");

//Auth Routers
const authRoute = require("./routes/authRoutes");
const storeRoutes = require("./routes/storeRoutes");
const productRoute = require("./routes/productRoutes");
const orderRoute = require("./routes/orderRoutes");
const cartRoute = require("./routes/cartRoutes");
const discountRoute = require("./routes/discountRoutes");

const routes = [
  authRoute,
  storeRoutes,
  productRoute,
  orderRoute,
  cartRoute,
  discountRoute,
];

//instead of doing this create index.js in routes folder and do that looping over their

const app = new koa();
const router = new Router();

//middlewares
// app.use(bodyParser());
app.use(dbMiddleware);
// app.use(cors());
app.use(koaHelmet());
app.use(
  koaBody({
    multipart: true, // Enables parsing of multipart data
    urlencoded: true,
    json: true,
    formidable: {
      maxFileSize: 50 * 1024 * 1024, // Set a file size limit if required (optional)
    },
  })
);
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

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

    console.log(process.env.CLOUDINARY_API_KEY);
    console.log(process.env.CLOUDINARY_API_SECRET);

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // cronScheduler();

    const server = app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });

    socketSetup(server);
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
