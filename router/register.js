const router = require('koa-router')()


//注册的显示界面
router.get('/',require('./register/registerIn'))

//做进行注册的判断
router.post('/',require('./register/registerIn-P'))

module.exports = router