const express = require("express");
const app = express();
const http = require("http");

const { Server } = require("socket.io");
const server = http.createServer(app);
const PORT = process.env.PORT || 3017;

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("socket cnnected", socket.id);
});

server.listen(PORT, () => {
  console.log("sever start at", PORT);
});
