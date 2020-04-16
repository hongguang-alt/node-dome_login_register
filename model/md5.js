const md5 = require('md5')

module.exports = (password)=>{
    return md5(password)
}