const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwtUtils");
const { error } = require("../middlewares/error");
// const { close, getData, setData, deleteCache } = require("../utils/redisUtils");

// const cloudinary = require("cloudinary");
//create the seperate validator for each
//throw all error simultaneously to the frontend
//Registration API
const registerUser = async (ctx) => {
  try {
    console.log("Hello");
    const { username, email, password } = ctx.request.body;

    if (!username || !email || !password) {
      error(ctx, 400, "username, email and password are required");
      return;
    }

    if (username.length < 3) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: "Username must be at least 3 characters long",
      };
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      ctx.status = 400;
      ctx.body = { success: false, message: "Invalid email format" };
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message:
          "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character",
      };
      return;
    }

    //one way
    // const db = await connectdb();
    // const collectionUser = dbInstance.collection("users");

    //two way
    const collectionUser = ctx.db.collection("users");

    //third way
    // const collectionUser = db.collection("users");

    const user = await collectionUser.findOne({ email });
    if (user) {
      error(ctx, 400, "User already exist");
      return;
    }

    const salt = 10;
    const hashed = await bcrypt.hash(password, salt);

    const newUser = {
      username,
      email,
      isSeller: false,
      storeId: null,
      password: hashed,
      createdAt: new Date(),
    };

    const result = await collectionUser.insertOne(newUser);

    const token = generateToken(result);

    ctx.cookies.set("authToken", token, {
      httpOnly: true, // Makes it inaccessible to client-side JavaScript
      secure: process.env.NODE_ENV === "production", // Ensures it's sent over HTTPS in production
      sameSite: "strict", // Protects against CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    ctx.status = 201;
    ctx.body = {
      success: true,
      message: "User Registration Successfull",
      token,
      user: {
        id: result.insertedId,
        username: newUser.username,
        email: newUser.email,
        isSeller: newUser.isSeller,
        storeId: newUser.storeId,
      },
    };
  } catch (err) {
    console.log("Registration Failed", err.message);
    // error(ctx, 500, "Internal server error");
  }
};

//login api
const login = async (ctx) => {
  try {
    console.log(ctx.request.body);
    const { email, password } = ctx.request.body;

    console.log("Hello2");

    if (!email || !password) {
      error(ctx, 400, "Email & Password are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      ctx.status = 400;
      ctx.body = { success: false, message: "Invalid email format" };
      return;
    }

    //one way
    // const db = await connectdb();
    // const userCollection = await db.collection("users");

    const userCollection = ctx.db.collection("users");

    const user = await userCollection.findOne({ email });

    if (!user) {
      error(ctx, 401, "Invalid user details");
      return;
    }
    console.log("Hello3");

    const ismatchPassword = await bcrypt.compare(password, user.password);

    console.log("Hello4");

    if (!ismatchPassword) {
      error(ctx, 401, "User details are not correct");
      return;
    }

    const token = generateToken(user);

    ctx.cookies.set("authToken", token, {
      httpOnly: true, // Makes it inaccessible to client-side JavaScript
      secure: process.env.NODE_ENV === "production", // Send only over HTTPS in production
      sameSite: "strict", // Protects against CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    ctx.status = 200;
    ctx.body = {
      success: true,
      message: "User logged in successfully",
      user,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isSeller: user.isSeller,
        storeId: user.storeId,
      },
    };
  } catch (err) {
    console.error("Login failed:", err.message);
    ctx.status = 500;
    ctx.body = { success: false, message: "Internal server error" };
  }
};

//logout
const logout = async (ctx) => {
  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "User logout successfully",
  };
};

module.exports = { registerUser, login, logout };
