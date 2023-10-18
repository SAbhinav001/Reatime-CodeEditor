import express from "express";
import http from "http";
import { Server } from "socket.io";
const app = express();

const server = http.createServer(app);
const PORT = process.env.PORT || 3017;

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("socket cnnected", socket.id);

  socket.on("join", ({ roomId, username }) => {
    console.log(roomId, username);
  });
});

app.use("/", () => console.log("stared"));

server.listen(PORT, () => {
  console.log("sever start at", PORT);
});
