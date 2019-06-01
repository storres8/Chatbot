import React, { Component } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:5500");

class Home extends Component {
  state = {
    message: ""
  };

  componentDidMount() {
    socket.on("message", greeting => {
      console.log(`${greeting}`);
    });
  }

  handleMessage = e => {
    this.setState({
      message: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let newMessage = this.state.message;
    socket.emit("sendMessage", newMessage);
    this.setState({
      message: ""
    });
  };

  handleLocation = () => {
    if (!navigator.geolocation) {
      return alert("Geolocation not supported in your current browser");
    }
    navigator.geolocation.getCurrentPosition(position => {
      let location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      socket.emit("sendLocation", location);
    });
    return;
  };

  render() {
    // socket.on allows us to listen for an event.
    // socket.on takes two arguments, the name of the event as the first and then a callback function.
    return (
      <div>
        <h1>Chat App!</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Message:
            <input
              type="text"
              value={this.state.message}
              onChange={e => this.handleMessage(e)}
            />
          </label>
          <button type="submit" value="Submit">
            Send
          </button>
        </form>
        <button onClick={this.handleLocation}>Share Location</button>
      </div>
    );
  }
}

export default Home;
