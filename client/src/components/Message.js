import React, { Component } from "react";

class Message extends Component {
  render() {
    return (
      <div className="message">
        <p>
          <span className="message__name">Some User Name</span>
          <span className="message__meta">{this.props.createdAt}</span>
        </p>
        <p>{this.props.messages}</p>
      </div>
    );
  }
}
export default Message;
