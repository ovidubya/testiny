const { getJwtToken } = require("./lib/getJwtToken");
const { firebaseAuthParser } = require("./lib/firebaseAuthParser");

module.exports = {
  getJwtToken,
  firebaseAuthParser,
};
