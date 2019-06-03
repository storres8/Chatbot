import React, { Component } from "react";
import Message from "./Message";
import UrlMsg from "./UrlMsg";
import isUrl from "is-url";

class MsgContainer extends Component {
  render() {
    // let messageComp;
    // if (isUrl(word)) {
    //   messageComp = <urlMessage key={index} messages={word} />;
    // } else {
    //   messageComp = <Message key={index} messages={word} />;
    // }

    return (
      <div className="chat__messages">
        {this.props.messages.map((message, index) =>
          isUrl(message.text) ? (
            <UrlMsg
              key={index}
              messages={message.text}
              createdAt={message.createdAt}
            />
          ) : (
            <Message
              key={index}
              messages={message.text}
              createdAt={message.createdAt}
            />
          )
        )}
      </div>
    );
  }
}
export default MsgContainer;
