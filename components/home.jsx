import React, { PropTypes } from 'react'
import _ from 'lodash'

const Home = React.createClass({
  render () {
    return (
        <div>
          <form action="/login" method="post">
            <p>
              <label>用户名:
                <input type="text" name="username" value="" />
              </label>
            </p>
            <p>
              <label>密码:
                <input type="password" name="password" value="" />
              </label>
            </p>
            <p>
              <button type="submit">登录</button>
            </p>
          </form>
        </div>
    )
  }
})

export { Home }
