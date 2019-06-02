const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const { generateMessage } = require("./utils/messages");

const app = express();
//creates a new sever
const server = http.createServer(app);
// passing in the server we created into socket.io to use websockets
const io = socketio(server);

// allows us to parse the body of an incoming request
app.use(express.json());
const port = process.env.PORT || 5500;

app.get("/", (req, resp) => {
  resp.send("working");
});

// io.on is only ever run when a new client connects to the server.
io.on("connection", socket => {
  console.log("New Websocket Connection");

  /*
  socket.emit will allows us to send an event from the server to client once that client connects, 
  greeting the client when they enter the chatroom.
  */
  socket.emit("message", generateMessage("Welcome!"));

  // socket.broadcast.emit sends a message to all the connected users minus the one that sent the message.
  socket.broadcast.emit(
    "message",
    generateMessage("A new user has joined the chat")
  );

  // listens for a newMessage submission from client & sends to all clients connected to server.
  socket.on("sendMessage", (newMessage, callback) => {
    io.emit("message", generateMessage(newMessage));
    callback();
  });

  /* 
  disconnect is a built in socket event that detects when a user leaves the server. We don't have to create
  a listener in the client for this to run, the cb is triggered when the user disconnects.
  */
  socket.on("disconnect", () => {
    io.emit("message", generateMessage("A user has disconnected"));
  });

  socket.on("sendLocation", (location, callbackLocation) => {
    io.emit(
      "locationMessage",
      `https://google.com/maps?q=${location.latitude},${location.longitude}`
    );
    callbackLocation();
  });
});

server.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
