import React, { Component } from "react";
import io from "socket.io-client";
import MsgContainer from "./MsgContainer";
import Sidebar from "./Sidebar";
import QS from "qs";

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
      mounted: false,
      roomData: null
    };
  }

  componentDidMount() {
    // Rendering messages that are sent.
    socket.on("message", message => {
      console.log(message);
      this.state.messages.push(message);
      // calling setState inside of the componentDidMount causes a rerender of ther component.
      // This was done specifically load all messages inside of this.state.messages.
      this.setState({
        mounted: true
      });
    });

    // rendering anything that is sent as a url not just if its a location.
    socket.on("locationMessage", location => {
      this.state.messages.push(location);
      this.setState({
        mounted: true
      });
    });

    socket.on("roomData", roomData => {
      this.setState({
        roomData: roomData
      });
    });

    // parsing the url to grab the username and room and send it to the backend.
    const { username, room } = QS.parse(window.location.search, {
      // ignored the ? and what ever is before in the URL.
      ignoreQueryPrefix: true
    });
    // emmiting socket event and sening username and room to server.
    socket.emit(
      "join",
      {
        username: username,
        room: room
      },
      error => {
        if (error) {
          alert(error);
          window.location.href = "/";
        }
      }
    );
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
      <div className="chat">
        <div className="chat__sidebar">
          {this.state.roomData !== null ? (
            <Sidebar roomData={this.state.roomData} />
          ) : null}
        </div>
        <div className="chat__main">
          <MsgContainer messages={this.state.messages} />

          <div className="compose">
            <form onSubmit={this.handleSubmit}>
              <input
                ref={this.inputRef}
                type="text"
                name="message"
                value={this.state.message}
                onChange={e => this.handleMessage(e)}
                placeholder="Message"
                autoComplete="off"
              />
              <button
                disabled={!this.state.message}
                type="submit"
                value="Submit"
                className="ml-1"
              >
                Send
              </button>
            </form>
            <button
              disabled={this.state.loadingLoc}
              onClick={this.handleLocation}
              id="send-location"
            >
              Share Location
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
