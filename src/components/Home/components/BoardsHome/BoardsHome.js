import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { Card, Wrapper, CardTitle } from './BoardsHome.styles'
import { Title, Icon } from '../../../StyledComponents/index'


const BoardsQuery = gql`
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

const BoardsHome = props => {
  return (
    <div>
      <Query query={BoardsQuery} variables={{ id: props.userId }}>
        {({ loading, data }) => {
          return (
            !loading && data && (
              <Fragment>
                <Title><Icon grey medium className="fa fa-user" /> Personal</Title>
                <Wrapper>
                  {
                    data.User.boards.map(board =>
                      (board.team == null &&
                        <Card key={board.id} style={{ background: board.background }}>
                          <CardTitle>{board.title}</CardTitle>
                        </Card>
                      )
                    )
                  }
                  <Card>Create new board..</Card>
                </Wrapper>
                {
                  data.User.teams.map(team => (
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
          )
        }}
      </Query>
    </div>
  )
}

export default BoardsHome
