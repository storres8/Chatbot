import React, { Component } from "react";
import Message from "./Message";

class MsgContainer extends Component {
  render() {
    return (
      <div>
        {this.props.messages.map((word, index) => (
          <Message key={index} messages={word} />
        ))}
      </div>
    );
  }
}
export default MsgContainer;
