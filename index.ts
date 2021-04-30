#! node
const { program } = require('commander')
program.version('1.0.0', '-v, --version', '当前版本号')

// 可选参数（[]）项目名，默认为 gorgeous-admin
program.option('-n, --name [items1]', '创建的项目名', 'gorgeous-admin');

program.parse(process.argv)
