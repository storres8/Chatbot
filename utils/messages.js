const moment = require("moment");
moment().format();

const generateMessage = text => {
  return {
    text: text,
    createdAt: moment(new Date().getTime()).format("h:mm a")
  };
};

const generateURL = url => {
  return {
    text: url,
    createdAt: moment(new Date().getTime()).format("h:mm a")
  };
};

module.exports = {
  generateMessage,
  generateURL
};
