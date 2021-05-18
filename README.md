<!--
 * @Date: 2021-04-30 15:06:06
 * @LastEditors: ZHT
 * @LastEditTime: 2021-04-30 16:11:11
-->
## gorgeous-admin介绍

### 前端

使用react+ts+antd搭建的管理端，此cli旨在快速初始化gorgeous-admin管理端项目，[git主页](https://github.com/zhuhengtan/gorgeous-admin)

### 后端

使用golang+gin框架开发，[后端项目git主页](https://github.com/CryBecase/gorgeous-admin-server-cli)


## 使用

1. 全局安装cli
```
sudo npm i gorgeous-admin-cli -g
```

2. 在工作目录初始化项目即可
```
gorgeous-admin-cli create <project-name>

eg. gorgeous-admin-cli create my-admin
```

3. 更新模板代码

```
gorgeous-admin-cli update-project-template | update
```

4. 命令行快速创建页面

由于路由文件比较复杂，所以请自行手动添加至路由文件，并自行选择加入默认存在的路由或者是权限路由文件。

```
gorgeous-admin-cli create-page <route-name> --template | -t <template-name>

eg. gorgeous-admin-cli create-page demo/demo1 --template common （目前仅支持common）
```
  
## 功能 list（打钩表示已支持）

- [x] 初始化项目
- [x] 自动更新模板代码
- [ ] 快速创建新模板页面（页面、Store、style等）持续进行中...目前支持普通页面
- [ ] ...更多功能规划中