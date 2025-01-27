const { ObjectId } = require("mongodb");
const cloudinary = require("cloudinary");
//for admin
const createProduct = async (ctx) => {
  try {
    console.log("Enter");
    const { productName, category, description, price, stocks } =
      ctx.request.body;

    const myCloud = await cloudinary.v2.uploader.upload(
      ctx.request.files.logo.filepath,
      {
        folder: "EcommerceSP",
        width: 150,
        crop: "scale",
      }
    );

    if (
      !productName ||
      !category ||
      !description ||
      price == 0 ||
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
      logo: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
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
      // error(ctx, 404, "Invalid store id");
      (ctx.status = 404),
        (ctx.body = {
          success: false,
          message: "Invalid store id",
        });
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
    (ctx.status = 403),
      (ctx.body = {
        success: false,
        message: err,
      });
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
      return;
    }

    if (!ObjectId.isValid(productId)) {
      return;
    }

    const productCollection = ctx.db.collection("products");
    const productDetails = await productCollection.findOne({
      _id: new ObjectId(productId),
    });

    if (!productDetails) {
      return;
    }

    ctx.status = 200;
    ctx.body = {
      message: "Product details fetched successfully",
      productDetails,
    };
  } catch (err) {
    console.log(err);
    ctx.status = 403;
    ctx.body = {
      message: "Product detail fetched failed for user",
      success: false,
    };
  }
};

//get store product for admin
const getstoreProductAdmin = async (ctx) => {
  try {
    // const { ownerId } = ctx.params;
    const ownerId = ctx.state.user?.id;

    console.log("userId  hello", ownerId);

    const userCollection = ctx.db.collection("users");
    const user = await userCollection.findOne({ _id: new ObjectId(ownerId) });
    // console.log("user", user);
    const storeId = user.storeId;
    console.log("storeId", storeId);

    if (!storeId) {
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
    console.log("Error in getting owner products", err);
  }
};

//delete product
const deleteProductOwner = async (ctx) => {
  try {
    const userId = ctx.state.user?.id;
    const userCollection = ctx.db.collection("users");
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return;
    }
    const storeId = user.storeId;
    const { productId } = ctx.params;
    const productCollection = ctx.db.collection("products");
    const product = await productCollection.findOne({ _id: productId });
    if (!product) {
      return;
    }

    const storeOwnerId = product.storeId;

    if (storeId != storeOwnerId) {
      console.log("You are a hacker");
      return;
    }

    console.log(productId, "productId");

    const deletedProduct = await productCollection.deleteOne({
      _id: new ObjectId(productId),
    });
    if (deletedProduct.deletedCount === 0) {
      console.log("Product not found");
      (ctx.status = 404),
        (ctx.body = {
          message: "Product not valid",
          success: false,
        });
      return;
    }

    console.log("deletedProduct", deletedProduct);

    ctx.status = 200;
    ctx.body = {
      message: "Product deleted successfully",
      success: true,
    };
  } catch (err) {
    console.log("Error in deleting the product", err);
    (ctx.status = 403),
      (ctx.body = {
        message: "Error in deleting the product",
        success: false,
      });
  }
};

//update product details
const updatedProductOwner = async (ctx) => {
  try {
    const { productId } = ctx.params;
    console.log(productId, "productId");
    const userId = ctx.state.user?.id;
    const userCollection = ctx.db.collection("users");
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return;
    }
    const storeId = user.storeId;
    const productCollection = ctx.db.collection("products");
    const product = await productCollection.findOne({
      _id: new ObjectId(productId),
    });
    if (!product) {
      return;
    }

    const storeOwnerId = product.storeId;

    if (storeId.toString() != storeOwnerId.toString()) {
      console.log("You are a hacker");
      return;
    }

    const updatedData = ctx.request.body;
    console.log(updatedData, "updatedData");

    const products = await productCollection.updateOne(
      { _id: new ObjectId(productId) },
      { $set: updatedData }
    );

    console.log(products);

    if (products.matchedCount == 0) {
      (ctx.status = 404),
        (ctx.body = {
          message: "Product not found",
          success: false,
        });
      return;
    }

    console.log(products);

    (ctx.status = 200),
      (ctx.body = {
        message: "Product updated",
        success: true,
      });
  } catch (err) {
    console.log(err);
    //  ((ctx.status = 500)),
    ctx.body = {
      message: "Update product failed",
      success: false,
    };
  }
};

module.exports = {
  createProduct,
  getProductsDetails,
  getProductsOfStore,
  getstoreProductAdmin,
  deleteProductOwner,
  updatedProductOwner,
};
