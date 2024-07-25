#!/usr/bin/env node

const chalk = require('chalk');
const { initProject } = require('../src/create');
const welcome = require('../src/welcome');
const { program } = require('commander');

// 定义使用方法
program.command('create <projectName>').action(async projectName => {
  console.log(chalk.blue('工程名将被定义为:'), projectName);
  await initProject(projectName);
});

program.on('--help', welcome);

// 必须，用于解析用户命令输入内容
program.parse(process.argv);
if (!program.args.length) {
  program.help();
}
