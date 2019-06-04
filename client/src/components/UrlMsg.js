import React, { Component } from "react";

class UrlMsg extends Component {
  render() {
    const url = this.props.messages;
    const username = this.props.username;
    return (
      <div className="message">
        <p>
          <span className="message__name">{username}</span>
          <span className="message__meta">{this.props.createdAt}</span>
        </p>
        <p>
          <a href={url} rel="noopener noreferrer" target="_blank">
            {url}
          </a>
        </p>
      </div>
    );
  }
}
export default UrlMsg;
