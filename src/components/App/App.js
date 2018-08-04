import React, { Component, Fragment } from 'react'
import {
  Router,
  Route,
} from 'react-router-dom'
import styled, { css } from 'styled-components'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import { Board, Callback, Home, Profile, Toolbar } from '../Components'
import { Auth, History } from '../../services/Services'

const Wrapper = styled.section`
  ${props => props.offset && css`
    margin-left: 280px;
  `}
`

const auth = new Auth()

const { isAuthenticated } = auth

const UserWithAuthQuery = gql`
  query user($key: String) {
    User (key: $key) {
      id
      teams {
        id, name, desc, website, users {
          id, name, nickname
        }
      }
    }
  }
`

const UsersTeamsQuery = gql`
  query user($id: ID) {
    User (id: $id) {
      id
      teams {
        id, name, desc, website, users {
          id, name, nickname
        }
      }
    }
  }
`

class App extends Component {
  state = {
    keepOpen: false,
    isAuthenticated,
    userId: '',
    teams: []
  }
  //
  // getUserId is passed as props to Home.js Component and then called when Home.js is rendered
  //
  getUserId = async auth0Key => {
    try {
      const { data: { User } } = await this.props.client.query({
        query: UserWithAuthQuery,
        variables: { key: auth0Key }
      })
      if (User) {
        this.setState({ userId: User.id, teams: User.teams })
      }
    } catch (err) {
      console.log('err::', err)
    }
  }

  getTeams = async () => {
    const { userId } = this.props
    try {
      const { data: { User } } = await this.props.client.query({
        query: UsersTeamsQuery,
        variables: { id: userId }
      })

      if (User) {
        this.setState({ teams: User.teams })
      }
    } catch (err) {
      console.log('err::', err)
    }
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
        resetMenuState={this.resetMenuState}
        getUserId={this.getUserId}
        {...this.state}
      />
    )

    const routesJSX = (
      <Fragment>
        <Route exact path="/" render={homeJSX} />
        <Route path="/home" render={homeJSX} />
        <Route path="/board/:boardId" component={Board} />
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
        <Router history={History} >
          <Fragment>
            {this.state.isAuthenticated &&
              <Toolbar
                auth={auth}
                {...this.state}
                getTeams={this.getTeams}
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

const AppWithApollo = withApollo(App)

export default AppWithApollo
