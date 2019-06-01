const express = require("express");
const http = require("http");
const socketio = require("socket.io");

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

let greeting = "Welcome!";
io.on("connection", socket => {
  console.log("New Websocket Connection");

  /*
  socket.emit will allows us to send an event from the server to client once that client connects, 
  greeting the client when they enter the chatroom.
  */
  socket.emit("message", greeting);

  // listens for a newMessage submission from client & sends to all clients connected to server.
  socket.on("sendMessage", newMessage => {
    io.emit("message", newMessage);
  });
});

server.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
