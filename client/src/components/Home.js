import React, { Component } from "react";
import io from "socket.io-client";
import MsgContainer from "./MsgContainer";

const socket = io("http://localhost:5500");

class Home extends Component {
  constructor(props) {
    super(props);
    //using react refs to set focus attribute onto dom.
    this.inputRef = React.createRef();

    this.state = {
      message: "",
      loadingLoc: false,
      messages: [],
      mounted: false
    };
  }

  componentDidMount() {
    socket.on("message", message => {
      console.log(message);
      this.state.messages.push(message.text);
      // calling setState inside of the componentDidMount causes a rerender of ther component.
      // This was done specifically load all messages inside of this.state.messages.
      this.setState({
        mounted: true
      });
    });

    socket.on("locationMessage", location => {
      this.state.messages.push(location);
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
    socket.emit("sendMessage", newMessage, () => {
      console.log("Message delivered.");
    });
    this.setState({
      message: ""
    });

    // when submit button is clicked input field is focused for quick messaging.
    this.inputRef.current.focus();
  };

  handleLocation = () => {
    this.setState({
      loadingLoc: true
    });
    if (!navigator.geolocation) {
      return alert("Geolocation not supported in your current browser");
    }
    navigator.geolocation.getCurrentPosition(position => {
      let Ulocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      socket.emit("sendLocation", Ulocation, () => {
        console.log("Location Shared!");
        this.setState({
          loadingLoc: false
        });
      });
    });
    return;
  };

  render() {
    // socket.on allows us to listen for an event.
    // socket.on takes two arguments, the name of the event as the first and then a callback function.
    return (
      <div>
        {<MsgContainer messages={this.state.messages} />}
        <form onSubmit={this.handleSubmit}>
          <label>
            Message:
            <input
              ref={this.inputRef}
              type="text"
              value={this.state.message}
              onChange={e => this.handleMessage(e)}
            />
          </label>
          <button disabled={!this.state.message} type="submit" value="Submit">
            Send
          </button>
        </form>
        <button disabled={this.state.loadingLoc} onClick={this.handleLocation}>
          Share Location
        </button>
      </div>
    );
  }
}

export default Home;
