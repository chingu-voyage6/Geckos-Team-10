import React, { Component } from 'react'
import {
  Router,
  Route,
} from 'react-router-dom'
import { Board, Callback, Home, LoggedOut, Profile } from '../Components'
import { Auth, History } from '../../services/Services'

const auth = new Auth()

class App extends Component {
  handleAuthentication = nextState => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication()
    }
  }

  render() {
    // calls the isAuthenticated method in authentication service
    const { isAuthenticated } = auth
    return (
      <div>
        <Router history={History}>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            {isAuthenticated() &&
              <Route path="/board" component={Board} />
            }
            {
              isAuthenticated() &&
              <Route path="/profile" component={Profile} />
            }
            <Route
              path="/callback"
              render={props => {
                this.handleAuthentication(props)
                return <Callback {...props} />
                }
              }
            />
            <Route path="/logged-out" component={LoggedOut} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App
