#!/usr/bin/env node

const inquirer = require('inquirer');
// const { createPrompt } = require('./constants');
const ora = require('ora');
const path = require('path');
const welcome = require('./welcome');
const child_process = require('child_process');
const fs = require('fs-extra');
const chalk = require('chalk');

const initProject = async projectName => {
  try {
    // 本地存放地址
    const tmp = path.join(process.cwd(), projectName);

    const prompt = inquirer.createPromptModule();

    let {
      name: cdFileName,
      description,
      branch
    } = await prompt([
      {
        type: 'input',
        name: 'name',
        message: '请输入文件夹目录名称',
        default: projectName
      },
      {
        type: 'input',
        name: 'description',
        message: '请输入工程描述'
      },
      {
        type: 'list',
        name: 'branch',
        message: '请选择工程的分支类型',
        default: 'master',
        choices: [
          {
            name: '权限系统',
            value: 'master'
          },
          {
            name: '纯净模板',
            value: 'gci-boot@thin'
          }
        ]
      }
    ]);

    // 目录是否存在
    if (fs.existsSync(tmp)) {
      // 强制创建
      throw new Error('目录已存在，请先删除本地目录或重命名');
    } else {
      const spinner = ora('拉取远程仓库中，请等待');
      spinner.start();
      const { spawn } = child_process;
      const subprocess = spawn('git', [
        'clone',
        '-b',
        branch,
        'http://git.96900.com.cn:8080/sources/gci-boot-frontend-demo.git',
        tmp
      ]);
      subprocess.stdout.on('data', function () {
        spinner.succeed('远端仓库下载成功');
        welcome();
      });
      subprocess.stderr.on('data', function (data) {
        console.error('\r\n' + chalk.yellow(data.toString('utf-8')));
      });

      subprocess.on('error', err => {
        console.error('拉取过程错误', err);
      });

      subprocess.on('close', () => {
        welcome();
        spinner.succeed('远端仓库拉取成功~');
        console.log(
          '\r\n输入下述命令启动工程 \r\n' +
            chalk.green.bgCyanBright(`  cd ${cdFileName}\n  pnpm install\n  pnpm run dev`)
        );
        console.log(
          '\r\n请务必修改仓库地址，参考如下' +
            chalk.bgBlueBright(
              `\r\n  git remote rm origin\n  git remote add origin 你的仓库地址\n  git push -u origin develop\r\n`
            )
        );

        console.log(`\r\n模板文档：http://10.91.120.25/gci-boot-docs/\r\n祝您使用愉快~\r\n`);
      });
    }
  } catch (error) {
    console.error(chalk.red(error));
    process.exit(0);
  }
};

module.exports = {
  initProject
};
