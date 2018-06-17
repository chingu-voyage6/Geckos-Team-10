import React from 'react'
import Auth from '../../services/auth'

const auth = new Auth()

const login = () => {
  auth.login()
}

const LoggedOut = () => (
  <div>
    <h1>Logged out</h1>
    <button onClick={login}>Login</button>
    <a href="/home">Home</a>
  </div>
)

export default LoggedOut
