#!/usr/bin/env node

const chalk = require('chalk');
const { initProject } = require('../src/create');
const welcome = require('../src/welcome');
const { program } = require('commander');
const { updateProject } = require('../src/update');

// 定义使用方法
program
  .command('create <projectName>')
  .action(async projectName => {
    console.log(chalk.blue('工程名将被定义为:'), projectName);
    await initProject(projectName);
  })
  .description('创建新工程');

program
  .command('update <branch>')
  .option('-t, --tag <tag>', '设置拉取的版本标记')
  .option('-n, --name <name>', '拉取的分支名称')
  .action(async (branch, options) => {
    console.log(chalk.blueBright(`仓库分支${branch}: 版本将升级至最新版本`));
    await updateProject(branch, options.name, options.tag);
  })
  .description('更新工程版本');

program.on('--help', welcome);
program.version('3.0.3', '-v, --version');

// 必须，用于解析用户命令输入内容
program.parse(process.argv);
if (!program.args.length) {
  program.help();
}
