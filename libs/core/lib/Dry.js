const dryLogger = ({ url, headers, method, data }) => {
  var outputStr = `
url: ${url}
headers: ${JSON.stringify(headers, null, 2)}
method: ${method}
${data ? `data: ${JSON.stringify(data, null, 2)}` : ""}

`;
  console.log(outputStr);
};

module.exports = {
  dryLogger,
};
