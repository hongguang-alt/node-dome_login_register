const router = require('koa-router')()

//配置登陆之后的页面
router.get('/',require('./admin/index'))


module.exports = router