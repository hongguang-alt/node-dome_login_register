const Db = require('../../model/Connection')
const encryption = require('../../model/md5')
//进行登陆判断
module.exports = async ctx =>{
    if(ctx.session.code != ctx.request.body.vcode.toUpperCase()){
        return ctx.redirect('/login?message=验证码错误!')
    }
    let name = await Db.find('login',{email:ctx.request.body.email})
    if(name.length>0){
        //对密码进行加密
        let pass = await Db.find('login',{password:encryption(ctx.request.body.password)})
        if(pass.length>0){
          ctx.session.user = 'ok'
          return  ctx.redirect('/admin')
        }else{
            return  ctx.redirect('/login?message=密码错误！')
        }
    }else{
        return  ctx.redirect('/login?message=用户不存在!')
    }
}