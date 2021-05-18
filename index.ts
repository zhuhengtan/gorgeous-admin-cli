#!/usr/bin/env node

/*
 * @Date: 2021-04-30 15:06:06
 * @LastEditors: ZHT
 * @LastEditTime: 2021-05-07 15:30:57
 */
const utils = require('./utils.ts')
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
    `${path.resolve(__dirname, './projectTemplate')}/`,
    (err)=>{
      if(err){
        creating.stop()
        console.log(err)
        console.log(chalk.red(`${appName}: 拉取最新代码失败，将用本地模板创建项目，可以手动更新本地模板代码：gorgeous-admin-cli update`))
        creating.text = `${appName}：git拉取失败，使用本地模板创建项目...`
        creating.start()
        shell.cp('-rf', `${path.resolve(__dirname, './projectTemplate')}/*`, `${path.resolve(__dirname, './projectTemplate')}/.*`, `./${appName}/`)
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
        shell.cp('-rf', `${path.resolve(__dirname, './projectTemplate')}/*`, `${path.resolve(__dirname, './projectTemplate')}/.*`, `./${appName}/`)
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
.usage('使用说明：gorgeous-admin-cli update-project-template')
.action(()=>{
  try {
    const updating = ora({
      text: "git代码拉取中..."
    })
    updating.start()
    downloadGit(
      'zhuhengtan/gorgeous-admin',
      `${path.resolve(__dirname, './projectTemplate/')}`,
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


/**
 * 创建页面，参数格式：firstGradeRoute|first-grade-route|FirstGradeRoute (/ secondGradeRoute|second-grade-route|SecondGradeRoute)
 * 
 */
program.command('create-page <route>')
.option('-t, --template <template>', '设置创建页面的模板', 'common')
.description('创建页面模板')
.usage('使用说明：全局安装gorgeous-admin-cli之后，在项目根目录使用，一级路由页面：gorgeous-admin-cli create-page demo，二级路由页面：gorgeous-admin-cli create-page demo/list')
.action((route, options)=>{
  //判断是否在项目根目录
  if(!shell.test('-e', 'src') || !shell.test('-f', 'package.json')) {
    console.log(chalk.red('创建失败：请在项目根目录执行此命令!'))
    process.exit(0)
  }
  const { routeArray, componentArray } = utils.parseRoute(route)
  if(routeArray.length>=3) {
    console.log(chalk.red('创建失败：暂不支持三级及以上路由！'))
    process.exit(0)
  }

  // 判断pages文件夹是否存在，不存在则创建
  if(!shell.test('-e', 'src/pages')) {
    shell.mkdir('src/pages') 
  }

  // 进入pages文件夹
  shell.cd('src/pages')

  const routeDepth = routeArray.length

  // 如果是第一层的路由，判断组件文件夹是否存在，如存在则退出
  if(shell.test('-e', componentArray[0]) && routeDepth === 1){
    console.log(chalk.red('创建失败：该组件名已存在，请检查！'))
    process.exit(0)
  }
  if(!shell.test('-e', componentArray[0])){
    shell.mkdir(componentArray[0])
  }
  shell.cd(componentArray[0])

  //复制文件并修改文件内容
  switch(routeDepth) {
    case 1:
      {
        switch(options.template) {
          case 'common':
            shell.cp('-R', `${path.resolve(__dirname, './pageTemplate/common/*')}`, `./`)
            shell.sed('-i', 'Replace', `${componentArray[0]}`, `./index.tsx`)
            shell.sed('-i', 'replace', `${routeArray[0]}`, `./index.tsx`)
            shell.sed('-i', 'replace', `${routeArray[0]}`, `./style.scoped.scss`)
            shell.sed('-i', 'replace', `${routeArray[0]}`, `./store/constants.ts`)
            break
        }
      }
      break
    case 2:
      {
        // 先看路由的一级layout index是否存在，不存在则说明store和hooks均不存在，需要拷贝
        if(!shell.test('-f', 'index.tsx')){
          shell.cp('-R', `${path.resolve(__dirname, './pageTemplate/firstGradeLayout/*')}`, `./`)
          shell.cp('-R', `${path.resolve(__dirname, './pageTemplate/common/store')}`, `./`)
          shell.cp('-R', `${path.resolve(__dirname, './pageTemplate/common/hooks')}`, `./`)
          shell.sed('-i', 'Replace', `${componentArray[0]}`, `./index.tsx`)
        }else{ //TODO 判断store、hooks文件是否存在，存在的话，往里添加模板内容。

        }

        // 再看路由的二级组件文件夹是否存在，不存在则创建
        if(shell.test('-e', componentArray[1])){
          console.log(chalk.red('创建失败：该组件文件夹已存在，请检查！'))
          process.exit(0)
        }
        shell.mkdir(componentArray[1])

        switch(options.template) {
          case 'common':
            shell.cp('-R', `${path.resolve(__dirname, './pageTemplate/common/index.tsx')}`, `./${componentArray[1]}/`)
            shell.cp('-R', `${path.resolve(__dirname, './pageTemplate/common/style.scoped.scss')}`, `./${componentArray[1]}/`)
            shell.sed('-i', 'Replace', `${componentArray[1]}`, `./${componentArray[1]}/index.tsx`)
            shell.sed('-i', 'replace', `${routeArray[1]}`, `./${componentArray[1]}/index.tsx`)
            shell.sed('-i', 'replace', `${routeArray[1]}`, `./${componentArray[1]}/style.scoped.scss`)
            shell.sed('-i', 'replace', `${routeArray[1]}`, `./store/constants.ts`)
            break
        }
      }
      break
    default:
      process.exit()
  }
  //返回src目录
  shell.cd('../../')

  // 主store引入组件store
  shell.sed('-i', "import produce from 'immer'", `import produce from 'immer'\nimport ${routeArray[0]}Reducer from '@/pages/${componentArray[0]}/store/reducer'`, './store/reducer.ts')
  shell.sed('-i', 'common,', `common,\n  ${routeArray[0]}: ${routeArray[0]}Reducer,`, './store/reducer.ts')

  console.log(chalk.green('页面创建完毕，请自行完善路由文件'))

  /**
   * TODO 添加进路由（比较麻烦，暂时搁浅，手动加入路由）
   */
  // 读出路由文件
  // const routeFile = shell.cat('./src/routes/AllRoutes.tsx')
  // const routeString = routeFile.match(/\[\][ ]=[ ]([\s\S]*?)\n/)[1]
  // const routeList = JSON.parse(routeString)
  // shell.sed('-i', "import Layout from '@/components/Layout'", `import Layout from '@/components/Layout'/nimport ${componentArray[componentArray.length-1]} from '@/pages/${componentArray.join('/')}'`, './src/routes/AllRoutes.tsx')

  // // 循环判断加入route
  // if(routeDepth===1){
  //   const isInFirstGradeRoute = routeList.some((item1)=>{
  //     if(item1.path === '/'+routeArray[0]) {
  //       return true
  //     }
  //     return false
  //   })
  //   if(!isInFirstGradeRoute){
  //     routeList.push({
  //       path: `/${routeArray[0]}`,
  //       component: componentArray[0],
  //     })
  //     shell.sed('-i', routeString, JSON.stringify(routeList), './src/routes/AllRoutes.tsx')
  //   }
  // }else {
  //   const isInFirstGradeRoute = routeList.some((item1)=>{
  //     if(item1.path === '/' + routeArray[0]) {//说明第一级路由存在
  //       const isInSecondGradeRoute = item1.routes && item1.routes.some((item2)=>{
  //         if(item2.path === '/'+ routeArray.join('/')) {
  //           return true
  //         }
  //         return false
  //       })
  //       if(!isInSecondGradeRoute){
  //         item1.push({
  //           path: `/${routeArray[0]}`,
  //           component: componentArray[0],
  //         })
  //         shell.sed('-i', routeString, JSON.stringify(routeList), './src/routes/AllRoutes.tsx')
  //       }
  //     }
  //     return false
  //   })

  //   if(!isInFirstGradeRoute){
  //     routeList.push({
  //       path: `/${routeArray[0]}`,
  //       component: componentArray[0],
  //     })
  //     shell.sed('-i', routeString, JSON.stringify(routeList), './src/routes/AllRoutes.tsx')
  //   }
  // }
})

program.parse(process.argv)
