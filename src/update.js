#!/usr/bin/env node

const ora = require('ora');
const welcome = require('./welcome');
const child_process = require('child_process');
const fs = require('fs-extra');
const chalk = require('chalk');

function isGitDirectory() {
  try {
    fs.statSync('.git');
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false;
    }
    throw err;
  }
}

const updateProject = async (branch, name, tag) => {
  try {
    const isGit = isGitDirectory();
    if (isGit && branch) {
      const spinner = ora('拉取远程仓库中，请等待');
      spinner.start();
      const { execSync } = child_process;
      execSync(
        'git remote add gci-boot http://git.96900.com.cn:8080/sources/gci-boot-frontend-demo.git'
      );
      execSync('git fetch gci-boot');
      execSync(`git checkout -b gci-boot@latest gci-boot/${name || tag || 'master'}`);
      execSync(`git checkout ${branch}`);
      execSync('git merge gci-boot@latest');
      execSync('git branch -d gci-boot@latest');
      execSync('git remote rm gci-boot');
      welcome();

      spinner.succeed('更新结束，请检查您的分支代码是否正常，处理相关合并冲突');
    } else {
      throw new Error('非GIT仓库，无法进行升级！请检查是否处于工程根目录下');
    }
  } catch (error) {
    console.error(chalk.red(error));
    console.error(chalk.blueBright('请联系陈裕峰（Charles Chan）协助处理'));
    process.exit(0);
  }
};

module.exports = {
  updateProject
};
