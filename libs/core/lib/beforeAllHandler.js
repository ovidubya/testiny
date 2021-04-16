const { executeTests } = require("./executeTests");

const beforeAllHandler = async ({
  beforeAll,
  baseUrl,
  authValue,
  authentication,
  dry,
}) => {
  if (dry) {
    console.log("skipping before all handler");
  } else {
    if (typeof beforeAll === "function") {
      await beforeAll(baseUrl, authValue, authentication);
    } else if (Array.isArray(beforeAll)) {
      const { totalErrors, totalSuccess } = await executeTests({
        authValue: authValue,
        authentication: authentication,
        baseUrl: baseUrl,
        dry: dry,
        tests: beforeAll,
      });
      if (totalErrors.length > 0) {
        console.log("beforeHandler error:");
        throw JSON.stringify(totalErrors, null, 2);
      }
    }
  }
};

module.exports = {
  beforeAllHandler,
};
