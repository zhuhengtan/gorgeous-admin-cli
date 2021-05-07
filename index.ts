#!/usr/bin/env node

/*
 * @Date: 2021-04-30 15:06:06
 * @LastEditors: ZHT
 * @LastEditTime: 2021-05-07 15:30:57
 */

const chalk = require('chalk')
const { program } = require('commander')
const shell = require('shelljs')
const ora = require('ora')
const downloadGit = require('download-git-repo')
const packageJson = require('./package.json')

const processCwd = process.cwd()

program.version(packageJson.version, '-v, --version', '当前版本号')

program.command('create <app-name>')
.description('创建项目')
.alias('c')
.usage('使用说明：gorgeous-admin-cli create <appName>')
.action(appName=>{
  console.log("项目名称: ", appName)
  // 判断文件夹是否存在
  if(shell.test('-e', appName)) {
    return console.log(chalk.red('该名称的文件夹已经存在!'))
  }
  // 创建文件夹
  shell.mkdir(appName)

  shell.cp('-R', `./projectTemplate/*`, `./${appName}`)
  shell.sed('-i', 'gorgeous-admin', `${appName}`, `./${appName}/package.json`)
  shell.sed('-i', 'gorgeous-admin', `${appName}`, `./${appName}/package-lock.json`)

  const installing = ora({
    text: "npm安装中..."
  })

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


program.command('update-project-template')
.description('更新项目模板（从github拉取最新代码(自用)）')
.alias('update')
.usage('使用说明：gorgeous-admin-cli updateProjectTemplate')
.action(()=>{
  try {
    const updating = ora({
      text: "git代码拉取中..."
    })
    updating.start()
    downloadGit(
      'zhuhengtan/gorgeous-admin',
      './projectTemplate/',
      (err)=>{
        updating.stop()
        if(err){
          console.log(err)
        }else{
          console.log(chalk.green('模板更新成功！'))
        }
      }
    )

  }catch(e) {
    console.log(e)
  }
})



program.parse(process.argv)
