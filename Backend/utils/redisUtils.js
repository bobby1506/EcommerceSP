const redis = require("redis");

const client = redis.createClient();

client.on("error", (err) => {
  console.log("Redis Client Error", err);
});

client
  .connect()
  .then(() => {
    console.log("Redis client connected successfully");
  })
  .catch((err) => {
    console.log("Error connecting to Redis:", err);
  });

const setDataInRedis = async (key, value, expiryInSeconds = 3600) => {
  try {
    const reply = await client.setEx(
      key,
      expiryInSeconds,
      JSON.stringify(value)
    );
    console.log("Data set successfully:", reply);
  } catch (err) {
    console.log("Data not set to cache memory:", err);
  }
};

const getDataFromRedis = async (key) => {
  try {
    const value = await client.get(key);
    if (value) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (err) {
    console.log("Error in getting cache:", err);
    throw err;
  }
};

const deleteCacheFromRedis = async (key) => {
  try {
    const reply = await client.del(key);
    console.log("Cache deleted:", reply);
  } catch (err) {
    console.log("Data not deleted:", err);
  }
};

const closeRedis = async () => {
  try {
    await client.quit();
    console.log("Redis client connection closed");
  } catch (err) {
    console.log("Error closing Redis connection:", err);
  }
};

module.exports = {
  closeRedis,
  getDataFromRedis,
  setDataInRedis,
  deleteCacheFromRedis,
};
