import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Auth from '../../services/auth'
import LeftSidebar from './components/LeftSidebar/LeftSidebar'
import { Wrapper } from './Home.styles'
import boards from '../../stupidData'

const auth = new Auth()

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authMessage: '',
      activeEl: 'home',
      boards,
    }
  }

  // will re-render App.js
  componentDidMount() {
    this.props.authStateChanged()
  }

  // toggle components that are shown
  toggleComponents = el => {
    this.setState({ activeEl: el.target.id })
  }

  // calls the login method in authentication service
  login = () => {
    auth.login()
  }
  // calls the logout method in authentication service
  logout = () => {
    this.props.resetMenuState()
    auth.logout()
  }
  // sends our access token to the server so
  // we can access restricted routes
  validate = accessToken => {
    const BearerToken = `Bearer ${accessToken}`
    axios({
      method: 'POST',
      url: '/api/private',
      headers: {
        authorization: BearerToken
      }
    }).then(res => {
      this.setState({ authMessage: res.data.message })
    }, error => {
      if (error.response.status === 401) {
        this.setState({ authMessage: error.response.statusText })
      }
      return error
    })
  }
  render() {
    const { isAuthenticated } = auth

    const testComponent = (
      <Fragment>
        {isAuthenticated() ?
          <Fragment>
            <button onClick={this.logout}>Logout</button>
            <Link to="/board">Board</Link>
            <Link to="/profile">Profile</Link>
          </Fragment> :
          <button onClick={this.login}>Login</button>
        }
        <button onClick={() => this.validate(auth.accessToken())}>Validate Token</button>
        <p>{this.state.authMessage}</p>
      </Fragment>
    )

    return (
      <div>
        <h1>Home</h1>
        {testComponent}
        <Wrapper>
          {isAuthenticated() &&
            <Fragment>
              <LeftSidebar
                toggleComponents={this.toggleComponents}
                activeEl={this.state.activeEl}
                boards={this.state.boards}
              />
              {this.state.activeEl === 'boards' && <span>Boards</span>}
              {this.state.activeEl === 'home' && <span>Main content / right sidebar</span>}
            </Fragment>
          }
        </Wrapper>
      </div>
    )
  }
}

export default Home
