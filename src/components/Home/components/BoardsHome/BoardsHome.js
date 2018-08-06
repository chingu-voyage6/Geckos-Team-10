import React, { Fragment } from 'react'

import { Wrapper, LinkTitle, StyledLink } from './BoardsHome.styles'
import { Title, Icon } from '../../../StyledComponents/index'
import { PopOver, CreateBoardButton, CreateBoard } from '../../../Components'

const BoardsHome = props => {
  const CreateBoardPopOver = PopOver(CreateBoard, CreateBoardButton)
  return (
    props.boards && props.teams &&
    <div>
      <Fragment>
        <Title><Icon grey medium className="fa fa-user" /> Personal</Title>
        <Wrapper>
          {
            props.boards.map(board =>
              (!board.team &&
                <StyledLink to={`/board/${board.id}`} key={board.id} style={{ background: board.background }}>
                  <LinkTitle>{board.title}</LinkTitle>
                </StyledLink>
              ))
          }
          <CreateBoardPopOver buttonType="card" {...props} />
        </Wrapper>
        {
          props.teams.map(({ id, name, boards }) => (
            <Fragment key={id}>
              {console.log(id, name)}
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
                <CreateBoardPopOver teamId={id} {...props} buttonType="card" />
              </Wrapper>
            </Fragment>)
          )
        }
      </Fragment>
    </div>
  )
}

export default BoardsHome
