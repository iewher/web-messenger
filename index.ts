const express = require("express");
const { createServer } = require("http");
const { join } = require("path");
const { Server } = require("socket.io");

import { Request, Response } from "express";
import { Socket } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req: Request, res: Response) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket: Socket) => {
  socket.on("chat message", (data) => {
    const { username, message } = data;
    io.emit("chat message", { username, message });
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
