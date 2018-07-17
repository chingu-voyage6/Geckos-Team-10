import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Auth from '../../services/auth'
import LeftSidebar from './components/LeftSidebar/LeftSidebar'
import BoardsHome from './components/BoardsHome/BoardsHome'
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
    this.props.getUserId(localStorage.getItem('user_id'))
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
    // redirects the user to the auth0 login form
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
      },
      data: {
        nickname: localStorage.getItem('nickname'),
        user_id: localStorage.getItem('user_id')
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
        {testComponent}
        <Wrapper>
          {isAuthenticated() &&
            <Fragment>
              <LeftSidebar
                toggleComponents={this.toggleComponents}
                activeComponent={this.state.activeComponent}
                userId={this.props.userId}
                boards={this.state.boards}
              />
              {this.state.activeComponent === 'boards' && <BoardsHome userId={this.props.userId} />}
              {this.state.activeComponent === 'home' && <span>Home</span>}
            </Fragment>
          }
        </Wrapper>
      </div>
    )
  }
}

export default Home
