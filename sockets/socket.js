const { io } = require("../index");

//mensajes de sockets
io.on("connection", (client) => {
  console.log("Cliente Conectado.");

  client.on("disconnect", () => {
    console.log("Cliente desconectado...");
  });

  client.on("mensaje", (payload) => {
    console.log("Mensaje", payload);

    io.emit("mensaje", { admin: "nuevo mensaje" });
  });
});
