import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { Card, Wrapper, CardTitle } from './BoardsHome.styles'
import { Title, Icon } from '../../../StyledComponents/index'

const TeamBoardsQuery = gql`
  {
    User (key: "github|20284107") {
      id
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
  {
    User (key: "github|20284107") {
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

const BoardsHome = () => {
  return (
    <div>
      <Query query={PersonalBoardsQuery} >
        {({ loading, data }) => {
          return (
            <Fragment>
              <Title><Icon grey medium className="fa fa-user" /> Personal</Title>
              <Wrapper>
                {
                  !loading && data.User.boards.map(board =>
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
      <Query query={TeamBoardsQuery}>
        {({ loading, data }) => {
          return (
            <Fragment>
              {
                !loading && data.User.teams.map(team => (
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
