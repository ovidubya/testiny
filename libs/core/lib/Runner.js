const axios = require("axios").default;
const ProgressBar = require("progress");
const { getCombinations } = require("./Combinations");
const { makeRequest } = require("./MakeRequest");

const Runner = async ({
  baseUrl,
  authValue = {},
  authentication,
  tests,
  dry,
}) => {
  let totalSuccess = [];
  let totalErrors = [];
  for (let i = 0; i < tests.length; i++) {
    const test = tests[i];
    const {
      path,
      method,
      skip,
      name,
      validateResponse = () => {},
      whitelistHttpCodes = [],
    } = test;

    if (skip) {
      continue;
    }

    if (!path || !method || !name) {
      throw "path,method,name in test is required";
    }

    const payloads = getCombinations(test.payloads);

    let headers = ["post", "put"].includes(method.toLowerCase())
      ? {
          "Content-Type": "application/json",
        }
      : {};

    if (test.authenticated) {
      if (authentication.placement.type === "header") {
        headers = { ...headers, ...authValue };
      }
    }

    const url = `${baseUrl}/${path}`;

    const { success, errors } = await makeRequest({
      name: name,
      headers: headers,
      method: method,
      payloads: payloads,
      url: url,
      dry,
      validateResponse,
      whitelistHttpCodes,
    });

    totalSuccess = [...totalSuccess, ...success];
    totalErrors = [...totalErrors, ...errors];
  }

  return {
    totalSuccess,
    totalErrors,
  };
};

module.exports = {
  Runner,
};
