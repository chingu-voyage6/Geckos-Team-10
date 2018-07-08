import React, { Component, Fragment } from 'react'
import {
  Router,
  Route,
} from 'react-router-dom'
import styled, { css } from 'styled-components'
import { Board, Callback, Home, Profile, Toolbar } from '../Components'
import { Auth, History } from '../../services/Services'

const Wrapper = styled.section`
  ${props => props.offset && css`
    margin-left: 280px;
  `}
`

const auth = new Auth()

const { isAuthenticated } = auth

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { keepOpen: false, isAuthenticated }
  }

  authStateChanged = () => {
    if (isAuthenticated() !== this.state.isAuthenticated) {
      this.setState({ isAuthenticated: isAuthenticated() })
    }
  }

  handleAuthentication = nextState => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication()
    }
  }

  toggleFixedMenu = () => {
    this.setState({ keepOpen: !this.state.keepOpen })
  }

  resetMenuState = () => {
    this.setState({ keepOpen: false })
  }

  render() {
    const homeJSX = () => (
      <Home
        authStateChanged={this.authStateChanged}
        keepOpen={this.state.keepOpen}
        resetMenuState={this.resetMenuState}
      />
    )

    const routesJSX = (
      <Fragment>
        <Route exact path="/" render={homeJSX} />
        <Route path="/home" render={homeJSX} />
        <Route path="/board" component={Board} />
        <Route path="/profile" component={Profile} />
        <Route
          path="/callback"
          render={props => {
            this.handleAuthentication(props)
            return <Callback {...props} />
          }
          }
        />
      </Fragment>
    )
    return (
      <Wrapper>
        <Router history={History}>
          <Fragment>
            {this.state.isAuthenticated &&
              <Toolbar
                auth={auth}
                keepOpen={this.state.keepOpen}
                toggleFixedMenu={this.toggleFixedMenu}
              />
            }
            {this.state.keepOpen ?
              <Wrapper offset>
                {routesJSX}
              </Wrapper> :
              <Wrapper>
                {routesJSX}
              </Wrapper>
            }
          </Fragment>
        </Router>
      </Wrapper>
    )
  }
}

export default App
