const axios = require("axios");

/**
 *
 * @param {string} apiKey firebase web key
 * @param {string} email firebase web user email
 * @param {string} password firebase web user password
 * @returns {Promise<any>}  returns a promise
 */
const getJwtToken = (apiKey, email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

  return axios.post(
    url,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

module.exports = {
  getJwtToken,
};
