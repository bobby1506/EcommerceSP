import { io } from "socket.io-client";

export const socket = io("http://localhost:1000");

// socket.on("connect", () => {
//   console.log("Connected to server");
// });
