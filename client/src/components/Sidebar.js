import React, { Component } from "react";

class Sidebar extends Component {
  render() {
    const { users, room } = this.props.roomData;
    return (
      <div>
        <h2 className="room-title">Chat Room {room}</h2>

        <h3 className="users">
          <u>Users</u>
        </h3>
        <ul className="users">
          {users.map(user => {
            return <p key={user.id}>{user.username}</p>;
          })}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
