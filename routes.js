import Router from 'koa-router'
import React, { PropTypes } from 'react'
import _ from 'lodash'
import { renderToString } from 'react-dom/server'

import { Home } from './components/home.jsx'

const siteRouter = new Router()
let renderOption = (templateName) => {
  return {
    'reactMarkup': renderToString(<Home />),
    'main': templateName // 客户端渲染使用的脚本名称和模板名称一致
  }
}

//siteRouter.get('/index', function* index(next) {
//  yield this.render('modules/default', renderOption('home'))
//})

export { siteRouter }
