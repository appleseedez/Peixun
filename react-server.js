import Koa from 'koa'
import ejsEngine from 'koa-ejs'
import Path from 'path'
import Favicon from 'koa-favicon'
import Logger from 'koa-logger'
import StaticFile from 'koa-static'
import thunkify from 'thunkify-wrap'
import Boom from 'boom'
import { siteRouter } from './routes'
import _ from 'lodash'

const ReactServer = Koa()

/**
初始化模板引擎 使用ejs作为页面引擎
可以在中间件中用this.render('templateName',jsonData)
来生成页面
api请查看 [http://www.embeddedjs.com/]
**/
ejsEngine(ReactServer, {
  root: Path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: true,
  debug: true
})

process.env.NODE_ENV === 'development' && ReactServer.use(Logger()) // 只有在NODE_ENV为development才加载日志
ReactServer.use(Favicon(__dirname + '/assets/images/favicon.png')) // favico
ReactServer.use(StaticFile('./assets',{'maxage':3*60*1000})) // 其他静态资源：js/images/css

/************************************************登录验证***************************************************/
import session from 'koa-generic-session'
import bodyParser from 'koa-bodyparser'
import koaRouter from 'koa-router'
import passport from 'koa-passport'
import { renderToString } from 'react-dom/server'
import React, { PropTypes } from 'react'
import { Login } from './components/login.jsx'

var localStrategy = require('passport-local').Strategy

ReactServer.keys = ['jsbn1508yewuxitong2016'];
ReactServer.use(session());
ReactServer.use(bodyParser());
ReactServer.use(passport.initialize());
ReactServer.use(passport.session());

passport.use('login', new localStrategy(
  function (username, password, done) {
    var user = {
      id: '1',
      username: 'user1',
      password: 'password2'
    }; // 可以配置通过数据库方式读取登陆账号

    if (username !== user.username) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (password !== user.password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
console.log('认证成功............................................')
    return done(null, user);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var pubRouter = new koaRouter();
pubRouter.get('/login', function *(next) {
  yield this.render('modules/default', {
      'reactMarkup': renderToString(<Login />),
      'main': 'login'})
});

pubRouter.post('/login', passport.authenticate('login', {
  successRedirect: '/123',
  failureRedirect: '/456'
}));
ReactServer.use(pubRouter.routes());
/**********************************************************************************************************************/

// 进入业务以后先验证是否登录
ReactServer.use(function*(next){
  if (this.isAuthenticated()) {
    yield next;
  } else {
    this.redirect('/login');
  }
})

//ReactServer.use(siteRouter.routes())

/**服务器异常处理**/
if (process.env.NODE_ENV === 'test') {
  module.exports = ReactServer.callback();
} else {
  ReactServer.listen(8001);
  console.log('open http://localhost/:8001')
}

ReactServer.on('error', function (err) {
  console.log(err.stack)
})
