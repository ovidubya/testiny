const { getJwtToken } = require("./getJwtToken");

const firebaseAuthParser = async ({ apiKey, email, password, placement }) => {
  if (!apiKey && !email && !password) {
    console.log("Missing apiKey, email, or password");
    process.exit(1);
  }
  let response;
  try {
    response = await getJwtToken(apiKey, email, password);
  } catch (e) {
    console.log("Unable to get JWT token from firebase");
    process.exit(1);
  }

  if (placement.type === "header") {
    return {
      [placement.key]: response.data.idToken,
    };
  }
};

module.exports = {
  firebaseAuthParser,
};
