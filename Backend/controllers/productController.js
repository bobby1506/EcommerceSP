const { ObjectId } = require("mongodb");
const error = require("../middlewares/error");

const createProduct = async (ctx) => {
  try {
    console.log("Enter");
    const { productName, category, description, price, stocks } =
      ctx.request.body;

    if (
      !productName ||
      !category ||
      !description ||
      price == null ||
      stocks == null
    ) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message:
          "All fields (productName, category, description, price, stocks) are required",
      };
      return;
    }

    if (price <= 0 || stocks < 0) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: "Price must be greater than 0, and stocks must be 0 or more",
      };
      return;
    }

    console.log(ctx.state.user);
    const userId = ctx.state.user.id;

    const seller = await ctx.db
      .collection("users")
      .findOne(
        { _id: new ObjectId(userId) },
        { projection: { storeId: 1, isSeller: 1 } }
      );

    if (!seller || !seller.isSeller) {
      ctx.status = 403;
      ctx.body = {
        success: false,
        message: "Access denied. Only sellers can create products",
      };
      return;
    }

    const { storeId } = seller;

    const productCollection = ctx.db.collection("products");
    const existingProduct = await productCollection.findOne({
      productName,
      storeId,
    });

    if (existingProduct) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: "A product with the same name already exists in your store",
      };
      return;
    }

    const newProduct = {
      productName,
      category,
      description,
      price,
      stocks,
      storeId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await productCollection.insertOne(newProduct);

    ctx.status = 201;
    ctx.body = {
      success: true,
      message: "Product created successfully",
      productId: result.insertedId,
      product: newProduct,
    };
  } catch (err) {
    console.error("Error in createProduct:", err.message);
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: "Internal server error",
    };
  }
};

//Get all products of a specific store for user
const getProductsOfStore = async (ctx) => {
  try {
    const { storeId } = ctx.params;
    console.log("storeId", storeId);

    if (!storeId) {
      error(ctx, 404, "Invalid store id");
      return;
    }

    const productCollection = ctx.db.collection("products");
    // console.log("productCollection", productCollection);

    const products = await productCollection
      .find({ storeId: new ObjectId(storeId) })
      .toArray();
    console.log(products);

    ctx.status = 200;
    ctx.body = {
      message: "Products fetched successfully",
      products,
    };
  } catch (err) {
    console.log("Error in getting products");
  }
};

//get product details
const getProductsDetails = async (ctx) => {
  try {
    console.log("Hello");
    const { productId } = ctx.params;
    console.log(productId);

    if (!productId) {
      error(ctx, 400, "Product ID is required");
      return;
    }

    if (!ObjectId.isValid(productId)) {
      error(ctx, 400, "Invalid product id");
      return;
    }

    const productCollection = ctx.db.collection("products");
    const productDetails = await productCollection.findOne({
      _id: new ObjectId(productId),
    });

    if (!productDetails) {
      error(ctx, 400, "Product not found");
      return;
    }

    ctx.status = 200;
    ctx.body = {
      message: "Product details fetched successfully",
      productDetails,
    };
  } catch (err) {
    console.log("Error");
  }
};

//get store product for admin
const getstoreProductAdmin = async (ctx) => {
  try {
    const { ownerId } = ctx.params;

    console.log("userId  hello", ownerId);

    const userCollection = ctx.db.collection("users");
    const user = await userCollection.findOne({ _id: new ObjectId(ownerId) });
    // console.log("user", user);
    const storeId = user.storeId;
    console.log("storeId", storeId);

    if (!storeId) {
      error(ctx, 404, "Invalid store id");
      return;
    }

    const productCollection = ctx.db.collection("products");

    const products = await productCollection.find({ storeId }).toArray();
    console.log(products);

    ctx.status = 200;
    ctx.body = {
      message: "Products fetched successfully",
      products,
    };
  } catch (err) {
    console.log("Error in getting owner products");
  }
};

module.exports = {
  createProduct,
  getProductsDetails,
  getProductsOfStore,
  getstoreProductAdmin,
};
