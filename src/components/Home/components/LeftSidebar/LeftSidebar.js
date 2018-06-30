import React from 'react'
import { Wrapper, Button, Title } from './LeftSidebar.styles'

const LeftSidebar = props => {
  const Teams = props.boards.map(board => {
    return (board.team &&
      <Button
        key={board.id}
        id={board.team}
        color={props.activeComponent === board.team}
        onClick={el => props.toggleComponents(el)}
      >{board.team}
      </Button>
    )
  })

  return (
    <Wrapper>
      <Button
        id="home"
        color={props.activeComponent === 'home'}
        onClick={el => props.toggleComponents(el)}
      >Home
      </Button>
      <Button
        id="boards"
        color={props.activeComponent === 'boards'}
        onClick={el => props.toggleComponents(el)}
      >Boards
      </Button>
      <Title>Teams</Title>
      {Teams}
      <Button
        id="create"
      >+ Create a Team
      </Button>
    </Wrapper>
  )
}

export default LeftSidebar
