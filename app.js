const koa = require('koa');
const app = new koa();
const router = require('koa-router')();
const render = require('koa-art-template');
const login = require('./router/login')
const admin = require('./router/admin')
const register = require('./router/register')
const path = require('path')
const session = require('koa-session')
app.keys = ['some secret hurr'];

const CONFIG = {
    key: 'koa:sess',
    autoCommit: true, 
    overwrite: true, 
    signed: true, 
    renew: false, 
    sameSite: null, 
  };

app.use(session(CONFIG, app));


//配置模板信息
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.art',
    debug: process.env.NODE_ENV !== 'production'
});

//配置静态文件
const static = require('koa-static')
app.use(static(path.join(__dirname,'public')))

//配置post
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())



//重定向到登陆的界面
router.get('/',async (ctx) =>{
     await ctx.redirect('/login')
})

app.use(async (ctx,next)=>{
    if(ctx.request.url.substring(0,6) == '/login' || ctx.request.url.substring(0,9) == '/register'){
        return next()
    }
    if(ctx.session.user=='ok'){
        next()
    }else{
      await ctx.redirect('/login')
    }
})

//配置路由
router.use('/login',login.routes())
router.use('/admin',admin.routes())
router.use('/register',register.routes())

//启动路由
app.use(router.routes())
    .use(router.allowedMethods())


app.use(async (ctx,next)=>{
    ctx.render('404')
})
app.listen('3000')
console.log('服务器启动成功，请访问3000端口！')
