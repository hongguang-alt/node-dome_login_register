const svgCaptcha = require('svg-captcha')
module.exports = async ctx =>{
    let captcha = svgCaptcha.create({
        size:4,
        background:'#ffffff',
        width:170,
        height:40
    })
    //保存在全局变量中
    ctx.session.code = captcha.text.toUpperCase()
    ctx.type = 'image'
    ctx.body = captcha.data
}