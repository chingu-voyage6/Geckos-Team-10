import React, { Component, Fragment } from 'react'
import axios from 'axios'

import { Auth } from '../../services'
import { BoardsHome, LeftSidebar, TeamViewer } from './components'
import { Button, Wrapper } from '../StyledComponents'
import { FlexWrapper } from './Home.styles'

const auth = new Auth()

class Home extends Component {
  state = { containerWidth: '80%' }
  // will re-render App.js
  componentDidMount = () => {
    this.props.getUserDataWithAuth(localStorage.getItem('user_id'))
    this.props.authStateChanged()
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
  validate = async (accessToken) => {
    const BearerToken = `Bearer ${accessToken}`
    const res = await axios({
      method: 'POST',
      url: '/api/private',
      headers: {
        authorization: BearerToken
      },
      data: {
        nickname: localStorage.getItem('nickname'),
        user_id: localStorage.getItem('user_id')
      }
    })
    console.log(res)
    // this.setState({ authMessage: res.data.message })
  }
  render() {
    const { activeComponent, isAuthenticated, keepOpen } = this.props
    return (
      <Fragment>
        {!isAuthenticated &&
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
        <FlexWrapper keepOpen={keepOpen}>
          {isAuthenticated &&
            <Fragment>
              <LeftSidebar
                {...this.state}
                {...this.props}
              />
              {activeComponent === 'boards' && <BoardsHome {...this.props} />}
              {activeComponent !== 'boards' &&
                <Fragment>
                  <TeamViewer
                    {...this.state}
                    {...this.props}
                  />
                </Fragment>
              }
            </Fragment>
          }
        </FlexWrapper>
      </Fragment>
    )
  }
}

export default Home
