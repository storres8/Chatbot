import React, { Component } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:5500");

class Home extends Component {
  componentDidMount() {
    socket.on("greet", greeting => {
      console.log(`${greeting}`);
    });
  }

  render() {
    // socket.on allows us to listen for an event.
    // socket.on takes two arguments, the name of the event as the first and then a callback function.
    return (
      <div>
        <h1>Chat App!</h1>
      </div>
    );
  }
}

export default Home;
