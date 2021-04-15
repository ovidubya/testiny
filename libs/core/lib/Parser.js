const fs = require("fs");
const chalk = require("chalk");
const { Runner } = require("./Runner");
const { firebaseAuthParser } = require("../../firebase-auth");

const parser = async (file, options) => {
  const { dry, logError } = options;
  let fileContents;
  try {
    fileContents = require(file);
  } catch (e) {
    throw "Unable to parse json file";
  }

  if (!fileContents.host) {
    throw "Need a valid host example host";
  }

  const baseUrl = `${fileContents.isHttps ? "https://" : "http://"}${
    fileContents.host
  }`;

  let authValue = {};
  if (fileContents?.authentication && fileContents?.authentication?.strategy) {
    switch (fileContents.authentication.strategy) {
      case "FIREBASE":
        authValue = await firebaseAuthParser(fileContents.authentication);
        break;
      default:
        throw "No support for the following auth strategy";
    }
  }

  const { totalSuccess, totalErrors } = await Runner({
    baseUrl: baseUrl,
    authValue: authValue,
    authentication: fileContents.authentication,
    tests: fileContents.tests,
    dry: dry,
  });

  // if (logError && totalErrors.length !== 0) {
  //   console.log(chalk.red("Errors below"));
  //   throw totalErrors;
  // } else {
  // }
  return { totalSuccess, totalErrors };
};

module.exports = {
  parser,
};
