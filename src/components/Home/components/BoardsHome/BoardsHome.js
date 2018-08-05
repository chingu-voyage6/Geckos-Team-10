import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { Card, Wrapper, LinkTitle, StyledLink } from './BoardsHome.styles'
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
          !loading && data && localStorage.setItem('grapUserId', data.User.id)
          return (
            !loading && data && (
              <Fragment>
                <Title><Icon grey medium className="fa fa-user" /> Personal</Title>
                <Wrapper>
                  {
                    data.User && data.User.boards.map(board =>
                      (board.team == null &&
                        <StyledLink
                          to={`/board/${board.id}`}
                          key={board.id}
                          style={{ background: board.background }}
                        >
                          <LinkTitle>{board.title}</LinkTitle>
                        </StyledLink>
                      )
                    )
                  }
                  <Card>Create new board..</Card>
                </Wrapper>
                {
                  data.User && data.User.teams.map(team => (
                    <Fragment>
                      <Title><Icon grey medium className="fa fa-users" />{team.name}</Title>
                      <Wrapper>
                        {team.boards.map(board => (
                          <StyledLink
                            to={`/board/${board.id}`}
                            key={board.id}
                            style={{ background: board.background }}
                          >
                            <LinkTitle>{board.title}</LinkTitle>
                          </StyledLink>))
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
