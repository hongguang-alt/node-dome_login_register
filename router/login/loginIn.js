module.exports = async ctx =>{
  let message = ctx.query.message
  await ctx.render('login/login',{
    message
  })
}
