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
      <div>
        {this.props.messages.map((word, index) =>
          isUrl(word) ? (
            <UrlMsg key={index} messages={word} />
          ) : (
            <Message key={index} messages={word} />
          )
        )}
      </div>
    );
  }
}
export default MsgContainer;
