const router = require('koa-router')()


//登陆的显示界面
router.get('/',require('./login/loginIn'))
//做登陆的判断
router.post('/',require('./login/loginInPost'))
//返回登陆的二维码
router.get('/code',require('./login/code'))

module.exports = router