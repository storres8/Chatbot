import React, { Component } from "react";
import io from "socket.io-client";

class Home extends Component {
  render() {
    io("http://localhost:5500");
    return (
      <div>
        <h1>Chat App!</h1>
      </div>
    );
  }
}

export default Home;
