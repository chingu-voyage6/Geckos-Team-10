import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../../services/auth'

const auth = new Auth()

const login = () => {
  auth.login()
}

const LoggedOut = () => (
  <div>
    <h1>Logged out</h1>
    <button onClick={login}>Login</button>
    <Link to="/home">Home</Link>
  </div>
)

export default LoggedOut
