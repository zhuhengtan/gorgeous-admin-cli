// 字符串首字母转大写，后面字母小写
function transferFirstCharacterToUpperCase (str) {
  return str.trim().toLowerCase().replace(str[0], str[0].toUpperCase())
}

module.exports = {
  transferFirstCharacterToUpperCase
}