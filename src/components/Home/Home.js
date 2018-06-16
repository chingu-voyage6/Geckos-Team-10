import React, { Component } from 'react'
import Auth from '../../services/auth'

const auth = new Auth()

class Home extends Component {
  // calls the login method in authentication service
  login = () => {
    auth.login()
  }
  // calls the logout method in authentication service
  logout = () => {
    auth.logout()
  }
  render() {
    const { isAuthenticated } = auth
    return (
      <div>
        <h1>Home</h1>
        {isAuthenticated() ?
          <button onClick={this.logout}>Logout</button> :
          <button onClick={this.login}>Login</button>
        }
      </div>
    )
  }
}

export default Home
