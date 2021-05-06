#! node
/*
 * @Date: 2021-04-30 15:06:06
 * @LastEditors: ZHT
 * @LastEditTime: 2021-05-06 20:27:05
 */

const chalk = require('chalk')
const { program } = require('commander')
const shell = require('shelljs')
const ora = require('ora')

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

  const installing = ora({
    text: "npm安装中..."
  });

  console.log(chalk.green('正在执行 npm i'))
  installing.color = 'yellow'
  installing.start()
  try{
    shell.exec(`cd ${appName}/ && npm i --legacy-peer-deps`, { silent: true }, ()=>{
      installing.stop()
      console.log(chalk.green('npm安装完毕！'))
      console.log(`命令行运行 cd ${appName} & npm start 即可启动项目`)
      console.log(chalk.green('项目创建成功！Happy hacking!'))
    })
  }catch(e) {
    console.log(chalk.red(e))
  }
})




program.parse(process.argv)
