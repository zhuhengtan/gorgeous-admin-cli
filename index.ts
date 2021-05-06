#! node
/*
 * @Date: 2021-04-30 15:06:06
 * @LastEditors: ZHT
 * @LastEditTime: 2021-05-06 18:26:39
 */

const chalk = require('chalk')
const { program } = require('commander')
const shell = require('shelljs')

program.version('1.0.0', '-v, --version', '当前版本号')

program.command('create <app-name>')
.description('创建项目')
.alias('c')
.usage('使用说明')
.action(appName=>{
  console.log("项目名称: ", appName)
  // 判断文件夹是否存在
  if(shell.test('-e', appName)) {
    return console.log(chalk.red('该名称的文件夹已经存在!'))
  }
  // 创建文件夹
  shell.mkdir(appName)

  const processCwd = process.cwd()

  shell.cp('-R', `${processCwd}/gorgeous-admin-cli/projectTemplate/*`, `./${appName}`)
  shell.sed('-i', 'gorgeous-admin', `${appName}`, `./${appName}/package.json`)
  console.log(chalk.green('正在执行 npm i'))
  shell.exec(`cd ${appName}/ && npm i`)
  console.log(chalk.green('执行完毕！'))
  console.log(chalk.green('项目创建成功！Happy hacking!'))
})




program.parse(process.argv)
