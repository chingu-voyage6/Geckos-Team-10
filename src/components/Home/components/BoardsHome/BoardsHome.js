import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { Wrapper, LinkTitle, StyledLink } from './BoardsHome.styles'
import { Title, Icon } from '../../../StyledComponents/index'
import { PopOver, CreateBoardButton, CreateBoard } from '../../../Components'


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
  const CreateBoardPopOver = PopOver(CreateBoard, CreateBoardButton)
  return (
    <div>
      <Query query={BoardsQuery} variables={{ id: props.userId }}>
        {({ loading, data }) => {
          return (
            !loading && data && data.User && data.User.boards && (
              <Fragment>
                <Title><Icon grey medium className="fa fa-user" /> Personal</Title>
                <Wrapper>
                  {
                    data.User.boards.map(board =>
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
                  <CreateBoardPopOver buttonType="card" userId={props.userId} />
                </Wrapper>
                {
                  data.User.teams.map(({ id, name, boards }) => (
                    <Fragment key={id}>
                      <Title><Icon grey medium className="fa fa-users" />{name}</Title>
                      <Wrapper>
                        {boards.map(board => (
                          <StyledLink
                            to={`/board/${board.id}`}
                            key={board.id}
                            style={{ background: board.background }}
                          >
                            <LinkTitle>{board.title}</LinkTitle>
                          </StyledLink>))
                        }
                        <CreateBoardPopOver teamId={id} userId={props.userId} buttonType="card" />
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
