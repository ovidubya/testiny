const ProgressBar = require("progress");
const axios = require("axios").default;
const { dryLogger } = require("./Dry");
const makeRequest = async ({
  name,
  url,
  headers,
  method,
  payloads,
  dry,
  validateResponse,
  whitelistHttpCodes,
}) => {
  const errors = [];
  const success = [];
  if (payloads.length == 0) {
    payloads = [{}];
  }

  const bar = new ProgressBar(":name [:bar] :current/:total :etas", {
    total: payloads.length,
  });
  for (let j = 0; j < payloads.length; j++) {
    const currentPayload = payloads[j];
    const dataRequest =
      method.toLowerCase() === "get"
        ? {
            url: url,
            headers: headers,
            method: method,
          }
        : {
            url: url,
            headers: headers,
            method: method,
            data: currentPayload,
          };
    try {
      if (!dry) {
        const response = await axios(dataRequest);

        validateResponse(response);

        bar.tick({
          name: name,
        });
        success.push({
          url: url,
          statusCode: response.status,
          statusText: response.statusText,
          headers: headers,
          payloadRequest: currentPayload,
          data: response.data,
        });
      } else {
        dryLogger(dataRequest);
      }
    } catch (err) {
      bar.tick({
        name: name,
      });
      if (whitelistHttpCodes.includes(err.response.status)) {
        success.push({
          url: url,
          statusCode: err.response.status,
          statusText: err.response.statusText,
          data: err.response.data,
          headers: headers,
          payloadRequest: currentPayload,
          message: err.message,
        });
      } else {
        errors.push({
          url: url,
          statusCode: err.response.status,
          statusText: err.response.statusText,
          data: err.response.data,
          headers: headers,
          payloadRequest: currentPayload,
          message: err.message,
        });
      }
    }
  }
  return { success, errors };
};

module.exports = { makeRequest };
