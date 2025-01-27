const { Server } = require("socket.io");

const sockets = {};

const socketSetup = async (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connnected");

    socket.on("register", (data) => {
      console.log("Socket register");

      sockets[data.key] = socket;
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
      for (const i in sockets) {
        if (sockets[i].id === socket.id) {
          delete sockets[i];
        }
      }
    });
  });
};

const eventEmitter = (key, eventt, data) => {
  if (sockets[key]) {
    sockets[key].emit(eventt, data);
  }
};

module.exports = { socketSetup, eventEmitter };
