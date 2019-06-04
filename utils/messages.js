const moment = require("moment");
moment().format();

const generateMessage = (username, text) => {
  return {
    username: username,
    text: text,
    createdAt: moment(new Date().getTime()).format("h:mm a")
  };
};

const generateURL = (username, url) => {
  return {
    username: username,
    text: url,
    createdAt: moment(new Date().getTime()).format("h:mm a")
  };
};

module.exports = {
  generateMessage,
  generateURL
};
