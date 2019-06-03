import React, { Component } from "react";

class Join extends Component {
  render() {
    return (
      <div className="centered-form">
        <div className="centered-form__box">
          <h1>Join</h1>
          <form action="/home">
            <label htmlFor="display_name">Display Name</label>
            <input
              id="display_name"
              type="text"
              name="username"
              placeholder="Display Name"
              required
            />
            <label htmlFor="room">Room</label>
            <input
              id="room"
              type="text"
              name="room"
              placeholder="Room"
              required
            />
            <button>Join</button>
          </form>
        </div>
      </div>
    );
  }
}
export default Join;
