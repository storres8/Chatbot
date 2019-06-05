const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const { generateMessage, generateURL } = require("./utils/messages");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
} = require("./utils/users");

const app = express();
//creates a new sever
const server = http.createServer(app);
// passing in the server we created into socket.io to use websockets
const io = socketio(server);

// allows us to parse the body of an incoming request
app.use(express.json());

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5500;

app.get("/", (req, resp) => {
  resp.send("working");
});

// io.on is only ever run when a new client connects to the server.
/* 
  __REGULAR SOCKET CALLS__
  socket.emit --> sends an event to a specific client.
  io.emit --> sends an event to every connected client. 
  socket.broadcast.emit --> sends an event to every connected client except for the client that 
  initiated the event.
  __ROOM CALLS__
  io.to.emit --> sends an event to everyone in a specific room 
  socket.broadcast.to.emit --> sends an event to every connected client in a specific ROOM** except
   for the client that initiated the event.
*/
io.on("connection", socket => {
  console.log("New Websocket Connection");

  /*
  socket.emit will allows us to send an event from the server to client once that client connects, 
  greeting the client when they enter the chatroom.
  ***removed the following broadcasr emit to be inside a specfic room. 
  */
  // socket.emit("message", generateMessage("Welcome!"));

  /* socket.broadcast.emit sends a message to all the connected users minus the one that sent the message.
   ***removed the following broadcasr emit to be inside a specfic room.
   */
  // socket.broadcast.emit(
  //   "message",
  //   generateMessage("A new user has joined the chat")
  // );

  // server is listening for the "join" call from client.
  // Destructing username and room from the incoming object sent from the client.
  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUser({
      id: socket.id,
      username: username,
      room: room
    });

    if (error) {
      return callback(error);
    }

    // socket.join() us a method that can only be used on the sever and it creates different chat rooms.
    socket.join(user.room);

    socket.emit("message", generateMessage("Admin", "Welcome!"));
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        generateMessage("Admin", `${user.username} has joined the chat`)
      );
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room)
    });

    callback();
  });

  // listens for a newMessage submission from client & sends to all clients connected to server.
  socket.on("sendMessage", (newMessage, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit(
      "message",
      generateMessage(user.username, newMessage)
    );
    callback();
  });

  /* 
  disconnect is a built in socket event that detects when a user leaves the server. We don't have to create
  a listener in the client for this to run, the cb is triggered when the user disconnects.
  */
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        generateMessage("Admin", `${user.username} has left the chat.`)
      );
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room)
      });
    }
  });

  socket.on("sendLocation", (location, callbackLocation) => {
    const user = getUser(socket.id);
    io.to(user.room).emit(
      "locationMessage",
      generateURL(
        user.username,
        `https://google.com/maps?q=${location.latitude},${location.longitude}`
      )
    );
    callbackLocation();
  });
});

server.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
