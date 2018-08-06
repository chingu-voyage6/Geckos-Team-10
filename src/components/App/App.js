import React, { Component, Fragment } from 'react'
import {
  Router,
  Route,
} from 'react-router-dom'
import styled, { css } from 'styled-components'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import { Board, Callback, Home, Profile, Toolbar } from '../Components'
import { Auth, History } from '../../services'

const Wrapper = styled.section`
  ${props => props.offset && css`
    margin-left: 280px;
  `}
`

const auth = new Auth()

const { isAuthenticated, login, logout } = auth

const CreateNewBoard = gql`
  mutation ($title: String!, $authorId: ID!, $background: String!, $teamId: ID) {
    createBoard(title: $title, background: $background, authorId: $authorId, teamId: $teamId) {
      id, title, background
      author {
        id, name, nickname
      }
      team {
        id, name
      }
    }
  }
`

const CreateNewTeam = gql`
  mutation ($name: String!, $authorId: [ID!]!, $desc: String) {
    createTeam(name: $name, usersIds: $authorId, desc: $desc) {
      id, name, desc, website
      users {
        id, name, nickname
      },
      boards {
        id, title, background
      }
    }
  }
`

const UserWithAuthQuery = gql`
  query user($key: String) {
    User (key: $key) {
      id
      teams {
        id, name, desc, website,
        users {
          id, name, nickname,
        },
        boards {
          id, title, background
        }
      }
      boards {
        id, title, background,
        team {
          id, name
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
    auth0IdToken: localStorage.getItem('user_id') || false,
    userId: '',
    boards: [],
    teams: []
  }
  //
  // getUserId is passed as props to Home.js Component and then called when Home.js is rendered
  //
  getUserDataWithAuth = async auth0Key => {
    try {
      const { data: { User } } = await this.props.client.query({
        query: UserWithAuthQuery,
        variables: { key: auth0Key },
        // fetchPolicy: 'network-only'
      })
      if (User) {
        this.setState({
          userId: User.id,
          teams: User.teams,
          boards: User.boards
        })
      }
    } catch (err) {
      console.log('err::', err)
    }
  }

  getTeamsWithId = async () => {
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

  createBoard = async (userId, title, background, teamId) => {
    try {
      await this.props.client.mutate({
        mutation: CreateNewBoard,
        variables: {
          authorId: userId, title, background, teamId
        },
        update: (store, { data: { createBoard } }) => {
          const data = store.readQuery({
            query: UserWithAuthQuery,
            variables: { key: localStorage.getItem('user_id') }
          })

          data.User.boards.push(createBoard)

          if (teamId) {
            const team = data.User.teams.find(({ id }) => id === teamId)
            team.boards.push(createBoard)
          }

          store.writeQuery({ query: UserWithAuthQuery, data })

          this.setState({ teams: data.User.teams, boards: data.User.boards })
        }
      })
    } catch (err) {
      console.log('err::', err)
    }
  }

  createTeam = async (userId, name, desc) => {
    try {
      await this.props.client.mutate({
        mutation: CreateNewTeam,
        variables: {
          authorId: userId, name, desc
        },
        update: (store, { data: { createTeam } }) => {
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: UserWithAuthQuery,
            variables: { key: localStorage.getItem('user_id') }
          })
          data.User.teams.push(createTeam)
          store.writeQuery({ query: UserWithAuthQuery, data })
          this.setState({ teams: data.User.teams })
        }
      })
    } catch (err) {
      console.log('err::', err)
    }
  }

  handleAuthentication = nextState => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication()
    }
  }

  authStateChanged = () => {
    if (isAuthenticated() !== this.state.isAuthenticated) {
      this.setState({ isAuthenticated: isAuthenticated() })
    }
  }

  toggleFixedMenu = () => {
    this.setState({ keepOpen: !this.state.keepOpen })
  }

  resetMenuState = () => {
    this.setState({ keepOpen: false })
  }

  logoutWithRedirect = () => {
    logout(); login()
  }

  render() {
    const { keepOpen } = this.state

    const homeJSX = () => (
      <Home
        getUserDataWithAuth={this.getUserDataWithAuth}
        authStateChanged={this.authStateChanged}
        getTeamsWithId={this.getTeamsWithId}
        resetMenuState={this.resetMenuState}
        getUserData={this.getUserData}
        createBoard={this.createBoard}
        createTeam={this.createTeam}
        {...this.state}
      />
    )

    return (
      <div>
        <Wrapper>
          <Router history={History} >
            <Fragment>
              {
                isAuthenticated() &&
                <Toolbar
                  {...this.state}
                  createTeam={this.createTeam}
                  logoutWithRedirect={this.logoutWithRedirect}
                  getTeamsWithId={this.getTeamsWithId}
                  toggleFixedMenu={this.toggleFixedMenu}
                />
              }
              <Wrapper offset={keepOpen}>
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
              </Wrapper>
            </Fragment>
          </Router>
        </Wrapper>
      </div>
    )
  }
}

const AppWithApollo = withApollo(App)

export default AppWithApollo
