#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { parser, generateConfig } = require("./libs/core");
const { Command } = require("commander");
const program = new Command();
const chalk = require("chalk");

program
  .version(require("./package.json").version)
  .description(fs.readFileSync(path.resolve(__dirname, "art.txt"), "utf8"));
program
  .command("generate")
  .description("Initializes a Testiny JS config file")
  .requiredOption("--filePath <file>", "Path of file to generate", "./")
  .option(
    "--dry",
    "Print the filepath and contents of what to print but wont write to disk",
    false
  )
  .action((params) => {
    const { filePath, dry } = params;
    const absoluteFilePath = path.resolve(process.cwd(), filePath, "config.js");
    generateConfig(absoluteFilePath, dry);
  });
program
  .command("run")
  .description("Run config file")
  .requiredOption("--file <file>", "File path to config")
  .option("--dry", "Print tests to console but won't run them", false)
  .option("--logError", "Logs all errors found", false)
  .option("--logSuccess", "Logs all ", false)
  .action((params) => {
    let { file, dry, logError, logSuccess } = params;
    if (dry === true) {
      logError = false;
      logSuccess = false;
    }
    const absoluteFilePath = path.resolve(process.cwd(), file);
    const main = async () => {
      try {
        const { totalSuccess, totalErrors } = await parser(absoluteFilePath, {
          dry: dry,
          logError: logError,
        });

        if (!dry) {
          console.log(chalk.green(`All ${totalSuccess.length} Passed ✨`));
          console.log(chalk.red(`All ${totalErrors.length} Failed ❌`));
          if (logSuccess) {
            console.log(totalSuccess);
          }
          if (logError && totalErrors.length !== 0) {
            throw JSON.stringify(totalErrors, null, 2);
          }
        }
      } catch (e) {
        console.log(chalk.red("Errors below"));
        console.log(chalk.red(e));
        process.exit(1);
      }
    };
    main();
  });

program.parse(process.argv);
