import React, { Component } from "react";

class UrlMsg extends Component {
  render() {
    const url = this.props.messages;
    return (
      <div>
        <p>
          {this.props.createdAt} - {""}
          <a href={url} rel="noopener noreferrer" target="_blank">
            {url}
          </a>
        </p>
      </div>
    );
  }
}
export default UrlMsg;
