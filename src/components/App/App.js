import React, { Component, Fragment } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
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

const UserIdQuery = gql`
  query user($key: String) {
    User (key: $key) {
      id
    }
  }
`

class App extends Component {
  state = {
    keepOpen: false,
    isAuthenticated,
    userId: ''
  }

  onDragStart = () => {

  }

  onDragUpdate = () => {

  }

  onDragEnd = () => {
    // the only one that is required
  }
  //
  // getUserId is passed as props to Home.js Component and then called when Home.js is rendered
  //
  getUserId = async auth0Key => {
    try {
      const { data: { User } } = await this.props.client.query({
        query: UserIdQuery,
        variables: { key: auth0Key }
      })

      if (User) {
        this.setState({ userId: User.id })
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
        keepOpen={this.state.keepOpen}
        resetMenuState={this.resetMenuState}
        getUserId={this.getUserId}
        userId={this.state.userId}
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
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <Wrapper>
          <Router history={History} >
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
      </DragDropContext>
    )
  }
}

const AppWithApollo = withApollo(App)

export default AppWithApollo
