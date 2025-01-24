// // // const redis = require("redis");

// // // //create client and connect
// // // const client = redis.createClient({
// // //   host: "localhost",
// // //   db: 0,
// // //   port: 6379,
// // // });

// // // client.on("connect", () => {
// // //   console.log("Connection successfull to redis");
// // // });

// // // client.on("error", () => {
// // //   console.log("Connection failed - Redis");
// // // });

// // // //set data in redis cache
// // // const setData = (key, value, expiryInSeconds = 3600) => {
// // //   client.setex(key, expiryInSeconds, JSON.stringify(value), (err, reply) => {
// // //     if (err) {
// // //       console.log("Data not set to cache memory", err);
// // //     } else {
// // //       console.log("Data set successfully", reply);
// // //     }
// // //   });
// // // };

// // // //get data from cache
// // // const getData = (key, callback) => {
// // //   client.get(key, (err, val) => {
// // //     if (err) {
// // //       console.log("Error in getting cache", err);
// // //       callback(err, null);
// // //     } else {
// // //       if (reply) {
// // //         callback(nullJSON.parse(reply));
// // //       } else {
// // //         callback(null, null);
// // //       }
// // //     }
// // //   });
// // // };

// // // //delete data from reddis
// // // const deleteCache = (key) => {
// // //   client.del(key, (err, reply) => {
// // //     if (err) {
// // //       console.log("Data not deleted", err);
// // //     } else {
// // //       console.log("Cache deleted", reply);
// // //     }
// // //   });
// // // };

// // // //close the connection
// // // const close = () => {
// // //   client.quit();
// // // };

// // // module.exports = { close, getData, setData, deleteCache };
// const redis = require("redis");

// // Create client and connect
// const client = redis.createClient();

// client.on("error", (err) => {
//   console.log("Redis Client Error", err);
// });

// client
//   .connect()
//   .then(() => {
//     console.log("Redis client connected successfully");
//   })
//   .catch((err) => {
//     console.log("Error connecting to Redis:", err);
//   });

// // Set data in Redis cache
// const setData = async (key, value, expiryInSeconds = 3600) => {
//   try {
//     const reply = await client.setEx(
//       key,
//       expiryInSeconds,
//       JSON.stringify(value)
//     );
//     console.log("Data set successfully:", reply);
//   } catch (err) {
//     console.log("Data not set to cache memory:", err);
//   }
// };

// // Get data from cache
// // Get data from cache
// const getData = async (key) => {
//   try {
//     const value = await client.get(key);
//     if (value) {
//       return JSON.parse(value); // Return the parsed value
//     } else {
//       return null; // Return null if no value exists
//     }
//   } catch (err) {
//     console.log("Error in getting cache:", err);
//     throw err; // Rethrow the error for the caller to handle
//   }
// };

// // Delete data from Redis
// const deleteCache = async (key) => {
//   try {
//     const reply = await client.del(key);
//     console.log("Cache deleted:", reply);
//   } catch (err) {
//     console.log("Data not deleted:", err);
//   }
// };

// // Close the connection
// const close = async () => {
//   try {
//     await client.quit();
//     console.log("Redis client connection closed");
//   } catch (err) {
//     console.log("Error closing Redis connection:", err);
//   }
// };

// module.exports = { close, getData, setData, deleteCache };
