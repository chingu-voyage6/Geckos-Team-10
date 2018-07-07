import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Button } from '../StyledComponents'
import Auth from '../../services/auth'
import { LeftSidebar, MainContent } from './components'
import boards from '../../stupidData'

import { Wrapper } from './Home.styles'

const auth = new Auth()

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authMessage: '',
      activeComponent: 'home',
      boards,
    }
  }

  // will re-render App.js
  componentDidMount() {
    this.props.authStateChanged()
  }

  // toggle components that are shown
  toggleComponents = e => {
    this.setState({ activeComponent: e.target.id })
  }

  // calls the login method in authentication service
  login = () => {
    auth.login()
  }
  // calls the logout method in authentication service
  logout = () => {
    this.props.resetMenuState()
    auth.logout()
    auth.login()
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
            <Link to="/board">Board</Link>
            <Link to="/profile">Profile</Link>
          </Fragment> :
          <Button onClick={this.login}>Login</Button>
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
                activeComponent={this.state.activeComponent}
                boards={this.state.boards}
                resetMenuState={this.props.resetMenuState}
              />
              {this.state.activeComponent === 'boards' && <MainContent />}
              {this.state.activeComponent === 'home' && <span>Main content / right sidebar</span>}
            </Fragment>
          }
        </Wrapper>
      </div>
    )
  }
}

export default Home
