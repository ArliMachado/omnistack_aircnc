const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const path = require("path");

const socketio = require("socket.io");
const http = require("http");

const cors = require("cors");

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect(
  "mongodb+srv://omnistack:omnistack@cluster0-ezgp6.mongodb.net/semana09?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const connectedUsers = {};

io.on("connection", socket => {
  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;
  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/files/", express.static(path.resolve(__dirname, "..", "uploads")));

server.listen(3333);
