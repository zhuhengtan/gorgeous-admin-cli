// 字符串首字母转大写，后面字母小写
function transferFirstCharacterToUpperCase (str) {
  return str.trim().toLowerCase().replace(str[0], str[0].toUpperCase())
}

// 创建页面时处理route参数，参数格式：firstGradeRoute|first-grade-route|FirstGradeRoute (/ secondGradeRoute|second-grade-route|SecondGradeRoute)
function parseRoute(str) {
  const paramArray = str.split('/')
  const routeArray = []
  const componentArray = []

  paramArray.forEach((param)=>{
    if(param.indexOf('-') > 0) {
      routeArray.push(param)
      const t = param.split('-')
      let s = ''
      t.forEach((tt)=>{
        s += transferFirstCharacterToUpperCase(tt)
      })
      componentArray.push(s)
    }else if((/^[A-Z][A-z0-9]*$/).test(param)){
      componentArray.push(param)
      let s = ''
      param.match(/^[A-Z][a-z0-9]*$/g).forEach((ss, index)=>{
        if(index>0) {
          s += '-'
        }
        s += ss.toLowerCase()
      })
      routeArray.push(s)
    }else{
      let route = ''
      let component = ''
      param.split('').forEach((c, index)=>{
        if(index===0) {
          route += c
          component += c.toUpperCase()
        }else{
          component += c
          if( index+1 < param.length && /^[A-Z]/.test(param.indexOf(index+1))) {
            route += '-'
            route += c.toLowerCase()
          }
        }
      })
      routeArray.push(route)
      componentArray.push(component)
    }
  })
  return {
    routeArray,
    componentArray
  }
}

module.exports = {
  transferFirstCharacterToUpperCase,
  parseRoute
}