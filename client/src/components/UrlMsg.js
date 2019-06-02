import React, { Component } from "react";

class UrlMsg extends Component {
  render() {
    const url = this.props.messages;
    return (
      <div>
        <p>
          <a href={url} rel="noopener noreferrer" target="_blank">
            My Current Location
          </a>
        </p>
      </div>
    );
  }
}
export default UrlMsg;
