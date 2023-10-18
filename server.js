import express from "express";
import http from "http";
import { Server } from "socket.io";
const app = express();

const server = http.createServer(app);
const PORT = process.env.PORT || 3017;

const io = new Server(server);

const userSocketmap = {};

function getAllConnectedClients(roomId) {
  // Map
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketmap[socketId],
      };
    }
  );
}

io.on("connection", (socket) => {
  console.log("socket cnnected", socket.id);

  socket.on("join", ({ roomId, username }) => {
    console.log(roomId, username);
    userSocketmap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit("joined", {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  socket.on("code-change", ({ roomId, code }) => {
    socket.in(roomId).emit("code-change", { code });
  });

  socket.on("sync-code", ({ socketId, code }) => {
    io.to(socketId).emit("sync-code", { code });
  });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit("disconnected", {
        socketId: socket.id,
        username: userSocketmap[socket.id],
      });
    });
    delete userSocketmap[socket.id];
    socket.leave();
  });
});

app.use("/", () => console.log("stared"));

server.listen(PORT, () => {
  console.log("sever start at", PORT);
});
