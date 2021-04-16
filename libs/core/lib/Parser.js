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

  const { host, isHttps, beforeAll = () => {} } = fileContents;

  if (!host) {
    throw "Need a valid host example host";
  }

  const baseUrl = `${isHttps ? "https://" : "http://"}${host}`;

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
    beforeAll: beforeAll,
  });

  return { totalSuccess, totalErrors };
};

module.exports = {
  parser,
};
