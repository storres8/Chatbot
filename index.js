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

io.on("connection", () => {
  console.log("New Websocket Connection");
});

server.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
