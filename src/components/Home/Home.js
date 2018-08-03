import React, { Component, Fragment } from 'react'
import axios from 'axios'

import Auth from '../../services/auth'
import boards from '../../stupidData'
import { BoardsHome, LeftSidebar, TeamViewer } from './components'
import { Button, Wrapper } from '../StyledComponents'
import { FlexWrapper } from './Home.styles'

const auth = new Auth()

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // authMessage: '',
      activeComponent: 'boards',
      teamId: '',
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
    this.setState({
      teamId: e.target.id || '',
      activeComponent: e.target.name
    })
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
      console.log(res)
      // this.setState({ authMessage: res.data.message })
    }, error => {
      if (error.response.status === 401) {
        // this.setState({ authMessage: error.response.statusText })
      }
      return error
    })
  }
  render() {
    const { isAuthenticated } = auth

    return (
      <div>
        {!isAuthenticated() &&
          <Wrapper>
            <br />
            <Wrapper width="250px" margin="auto">
              <div style={{ textAlign: 'center' }}>
                <span>Please <strong>login</strong> to use trello</span>
              </div>
              <br />
              <div>
                <Button solid onClick={this.login}>Login</Button>
              </div>
            </Wrapper>
          </Wrapper>
        }
        <br />
        <FlexWrapper>
          {isAuthenticated() &&
            <Fragment>
              <LeftSidebar
                toggleComponents={this.toggleComponents}
                activeComponent={this.state.activeComponent}
                userId={this.props.userId}
                boards={this.state.boards}
              />
              {this.state.activeComponent === 'boards' && <BoardsHome userId={this.props.userId} />}
              {this.state.activeComponent !== 'boards' &&
                <Fragment>
                  <TeamViewer teamName={this.state.activeComponent} teamId={this.state.teamId} />
                </Fragment>
              }
            </Fragment>
          }
        </FlexWrapper>
      </div>
    )
  }
}

export default Home
