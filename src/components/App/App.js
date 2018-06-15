import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { Login, Signup, Home } from '../Components'
import './App.scss'

const App = () => {
  return (
    <div className="app-routes">
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
