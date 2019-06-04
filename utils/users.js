const users = [];

// add users into the users array
const addUser = user => {
  // user argument is an object with an id, username, & room.

  // clean the incomng data.
  const username = user.username.trim().toLowerCase();
  const room = user.room.trim().toLowerCase();
  const id = user.id;

  //   validate the data.
  if (!username || !room) {
    return {
      error: "Username and room are required."
    };
  }

  //   if there is a room provided, check to see if username is already being used.
  const existingUser = users.find(user => {
    return user.room === room && user.username === username;
  });

  //   if existingUser is true then there is already someone with that username in the room.
  if (existingUser) {
    return {
      error: "That username has already been taken."
    };
  }

  //   If no errors then add user to the users array.
  users.push({
    id: id,
    username: username,
    room: room
  });

  return { user: user };
};

const removeUser = id => {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

module.exports = {
  addUser
};
