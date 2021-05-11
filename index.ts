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
const path = require('path')
const tmplPackageJson = require('./projectTemplate/package.json')

program.version(packageJson.version, '-v, --version', '当前版本号')

program.command('create <app-name>')
.description('创建项目')
.alias('c')
.usage('使用说明：gorgeous-admin-cli create <appName>')
.action(appName=>{
  const creating = ora({
    text: `${appName}：项目创建中...`,
    interval: 500,
  })
  creating.start()
  
  // 判断文件夹是否存在
  if(shell.test('-e', appName)) {
    creating.stop()
    console.log(chalk.red('该名称的文件夹已经存在!'))
    process.exit(0)
  }
  // 创建文件夹
  try{
    shell.mkdir(appName)
  } catch(err) {
    process.exit(0)
  }
  creating.text = `${appName}：拉取最新版本模板代码...`
  downloadGit(
    'zhuhengtan/gorgeous-admin',
    `./projectTemplate/`,
    (err)=>{
      if(err){
        creating.stop()
        console.log(err)
        console.log(chalk.red(`${appName}: 拉取最新代码失败，将用本地模板创建项目，可以手动更新本地模板代码：gorgeous-admin-cli update`))
        creating.text = `${appName}：git拉取失败，使用本地模板创建项目...`
        creating.start()
        shell.cp('-R', `${path.resolve(__dirname, './projectTemplate')}/*`, `./${appName}`)
        shell.sed('-i', 'gorgeous-admin', `${appName}`, `./${appName}/package.json`)
        shell.sed('-i', 'gorgeous-admin', `${appName}`, `./${appName}/package-lock.json`)

        creating.text = `${appName}：正在执行 npm i...让子弹飞一会...`
        shell.exec(`cd ${appName}/ && npm i --legacy-peer-deps`, { silent: true }, ()=>{
          creating.text = `${appName}：npm安装完毕！`
          creating.stop()
          console.log(chalk.green('项目创建成功！Happy hacking!'))
          console.log(`命令行运行 cd ${appName} && npm start 即可启动项目`)
        })
      }else{
        creating.text = `${appName}：模板拉取成功，拷贝代码...`
        shell.cp('-R', `${path.resolve(__dirname, './projectTemplate')}/*`, `./${appName}`)
        shell.sed('-i', 'gorgeous-admin', `${appName}`, `./${appName}/package.json`)
        shell.sed('-i', 'gorgeous-admin', `${appName}`, `./${appName}/package-lock.json`)
        creating.text = `${appName}：模板拷贝成功...`

        creating.text = `${appName}：正在执行 npm i...让子弹飞一会...`
        shell.exec(`cd ${appName}/ && npm i --legacy-peer-deps`, { silent: true }, ()=>{
          creating.text = `${appName}：npm安装完毕！`
          creating.stop()
          console.log(chalk.green('项目创建成功！Happy hacking!'))
          console.log('进入项目根目录命令行运行 npm start 即可启动项目')
        })
      }
    }
  )  
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
