const { Server } = require("socket.io");

const sockets = {};

const socketSetup = async (server) => {
  console.log("Hellooo");
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connnectedd");

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
  console.log(key, eventt);
  console.log("sockets", sockets);

  console.log("first");
  if (sockets[key]) {
    console.log("second");

    sockets[key].emit(eventt, data);
  }
};

module.exports = { socketSetup, eventEmitter };
