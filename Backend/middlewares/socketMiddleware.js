const { Server } = require("socket.io-client");

const io = Server("http://localhost:3000");

module.exports = io;
