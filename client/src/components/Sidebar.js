import React, { Component } from "react";

class Sidebar extends Component {
  render() {
    const { users, room } = this.props.roomData;
    return (
      <div>
        <h1>Chat Room {room}</h1>

        {users.map(user => {
          return <p key={user.id}>{user.username}</p>;
        })}
      </div>
    );
  }
}

export default Sidebar;
