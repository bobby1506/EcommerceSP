const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwtUtils");
const { error } = require("../middlewares/error");
const connectdb = require("../config/db");

//Registration API
const registerUser = async (ctx) => {
  try {
    console.log("Hello");
    const { username, email, password } = ctx.request.body;

    if (!username || !email || !password) {
      throw new error(400, "username, email and password are required");
    }

    const db = await connectdb();
    const collectionUser = db.collection("users");

    const user = await collectionUser.findOne({ email });
    if (user) {
      throw error(400, "User already exist");
    }

    const salt = 10;
    const hashed = await bcrypt.hash(password, salt);

    const newUser = {
      username,
      email,
      password: hashed,
      createdAt: new Date(),
    };

    await collectionUser.insertOne(newUser);

    const token = generateToken(newUser);
    ctx.status = 201;
    ctx.body = {
      success: true,
      message: "User Registration Successfull",
      token,
    };
  } catch (err) {
    console.log("Registration Failed", err.message);
    throw new error(500, "Internal server error");
  }
};

//login api
const login = async (ctx) => {
  console.log(ctx.request.body);
  const { email, password } = ctx.request.body;

  console.log("Hello2");

  if (!email || !password) {
    throw new error(400, "Email & Password are required");
  }

  const db = await connectdb();
  const userCollection = db.collection("users");

  const user = await userCollection.findOne({ email });

  if (!user) {
    throw new error(401, "Invalid user details");
  }
  console.log("Hello3");

  const ismatchPassword = await bcrypt.compare(password, user.password);

  console.log("Hello4");

  if (!ismatchPassword) {
    throw new error(401, "User details are not correct");
  }

  const token = generateToken(user);
  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "User logged in successfully",
    token,
  };
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
