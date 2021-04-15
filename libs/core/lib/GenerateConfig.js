const fs = require("fs");

const generateString = `module.exports = {
  host: "example.com",
  isHttps: false,
  //optional
  authentication: {
    strategy: "FIREBASE", // oneOf "FIREBASE"
    placement: {
      type: "header", // oneOf ["header", "payload", "query", "cookie"]
      key: "idtoken",
    },
    apiKey: "your api key",
    email: "user@test.com",
    password: "password",
  },
  tests: [
    {
      name: "cat images API",
      authenticated: true,
      path: "cat/images",
      method: "POST",
      payloads: {
        tags: ["Big", "Small", "Furry", "Cute"],
        popular: ["Day", "All Year"],
      },
    },
  ],
};`;

const generateConfig = (filepath, dry) => {
  if (dry) {
    console.log("Filepath: ", filepath);
    console.log("Content: \n");
    console.log(generateString);
  } else {
    fs.writeFileSync(filepath, generateString, "utf8");
  }
};

module.exports = {
  generateConfig,
};
