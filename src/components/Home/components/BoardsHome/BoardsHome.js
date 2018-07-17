import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { Card, Wrapper, CardTitle } from './BoardsHome.styles'
import { Title, Icon } from '../../../StyledComponents/index'

const TeamBoardsQuery = gql`
  query user($id: ID){
    User (id: $id) {
      teams {
        id
        name
        boards {
          id
          title
          background
        }
      }
    }
  }
`

const PersonalBoardsQuery = gql`
  query user($id: ID){
    User (id: $id) {
      id
      boards {
        id
        title
        background
        team {
          id
          name
        }
      }
    }
  }
`

const BoardsHome = props => {
  return (
    <div>
      {console.log(props.userId)}
      <Query query={PersonalBoardsQuery} variables={{ id: props.userId }}>
        {({ loading, data }) => {
          return (
            <Fragment>
              <Title><Icon grey medium className="fa fa-user" /> Personal</Title>
              <Wrapper>
                {
                  !loading && data && data.User.boards.map(board =>
                    (board.team == null &&
                      <Card key={board.id} style={{ background: board.background }}>
                        <CardTitle>{board.title}</CardTitle>
                      </Card>
                    )
                  )
                }
                <Card>Create new board..</Card>
              </Wrapper>
            </Fragment>
          )
        }}
      </Query>
      <Query query={TeamBoardsQuery} variables={{ id: props.userId }}>
        {({ loading, data }) => {
          return (
            <Fragment>
              {
                !loading && data && data.User.teams.map(team => (
                  <Fragment>
                    <Title><Icon grey medium className="fa fa-users" />{team.name}</Title>
                    <Wrapper>
                      {team.boards.map(board => (
                        <Card key={board.id} style={{ background: board.background }}>
                          <CardTitle>{board.title}</CardTitle>
                        </Card>))
                      }
                      <Card>Create new board..</Card>
                    </Wrapper>
                  </Fragment>)
                )
              }
            </Fragment>
          )
        }}
      </Query>
    </div>
  )
}

export default BoardsHome
