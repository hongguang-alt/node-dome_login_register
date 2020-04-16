const Db = require('../../model/Connection')
const encryption = require('../../model/md5')
module.exports = async ctx =>{
    //对密码进行加密
    ctx.request.body.password=encryption(ctx.request.body.password)
    //插入数据
   const result =  await Db.insertOne('login',ctx.request.body)
   //成功后重定向到登陆页面
   if(result.ok==1){
      return  ctx.redirect('/login')
   }
   //失败则重定向到登陆界面
   ctx.redirect('/register')
}