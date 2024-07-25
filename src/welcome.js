#!/usr/bin/env node

const chalk = require('chalk');
const figlet = require('figlet');

module.exports = () => {
  console.log(
    '\r\n' +
      chalk.white.bgBlueBright.bold(
        figlet.textSync('GCI-BOOT V3', {
          font: 'Standard',
          horizontalLayout: 'default',
          verticalLayout: 'default',
          width: 80,
          whitespaceBreak: true
        })
      )
  );
  console.log(
    `\r\nRun ${chalk.cyan(`gci-cli <command> --help`)} for detailed usage of given command\r\n`
  );
};
