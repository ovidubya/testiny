const { parser } = require("./lib/Parser");
const { runner } = require("./lib/Runner");
const { getCombinations } = require("./lib/Combinations");
const { makeRequest } = require("./lib/MakeRequest");
const { dryLogger } = require("./lib/Dry");
const { generateConfig } = require("./lib/GenerateConfig");

module.exports = {
  parser,
  runner,
  getCombinations,
  makeRequest,
  dryLogger,
  generateConfig,
};
