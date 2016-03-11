import React, { PropTypes } from 'react'
import _ from 'lodash'

const Login = React.createClass({
  render () {
    return (
      <div>
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
            <button onClick={this.handleClick}>登录</button>
          </p>
      </div>
    )
  },

  handleClick() {
    console.log("点击了.........");
    fetch('http://localhost:8001/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'user1',
        password: 'password2',
      })
    })
  }
})

export { Login }
