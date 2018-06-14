import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Home from '../Home/Home.js';
import Login from '../Login/Login.js';
import Signup from '../Signup/Signup.js';
import './App.scss';

class App extends Component {
  render() {
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
    );
  }
}

export default App;
