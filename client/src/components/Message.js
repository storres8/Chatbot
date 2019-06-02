import React, { Component } from "react";

class Message extends Component {
  render() {
    return (
      <div>
        <p>{this.props.messages}</p>
      </div>
    );
  }
}
export default Message;
