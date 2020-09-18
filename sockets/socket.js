const { io } = require("../index");
const Band = require("../models/band");
const Bands = require("../models/bands");

const bands = new Bands();

bands.addBand(new Band("QUEEN"));
bands.addBand(new Band("Bon jovi"));
bands.addBand(new Band("Heroes del silencio"));
bands.addBand(new Band("Metallica"));

//mensajes de sockets
io.on("connection", (client) => {
  console.log("Cliente Conectado.");

  client.emit("active-bands", bands.getBands());

  client.on("disconnect", () => {
    console.log("Cliente desconectado...");
  });

  client.on("mensaje", (payload) => {
    console.log("Mensaje", payload);

    io.emit("mensaje", { admin: "nuevo mensaje" });
  });

  client.on("vote-band", (payload) => {
    // console.log(payload);
    bands.voteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });

  client.on("add-band", (payload) => {
    const newBand = new Band(payload.name);
    // console.log(payload);
    bands.addBand(newBand);
    io.emit("active-bands", bands.getBands());
  });

  client.on("delete-band", (payload) => {
    // console.log(payload);
    bands.deleteBands(payload.id);
    io.emit("active-bands", bands.getBands());
  });

  //   client.on("emitir-mensaje", (payload) => {
  //     // io.emit("nuevo-mensaje", payload); //EMITE A TODOS!
  //     client.broadcast.emit("nuevo-mensaje", payload); //EMITE A TODOS MENOS A QUIEN LO  MANDO!
  //     // console.log(payload);
  //   });
});
