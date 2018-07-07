import React from 'react'
import { Wrapper, Title } from './LeftSidebar.styles'
import { Button } from '../../../StyledComponents'
import Auth from '../../../../services/auth'

const auth = new Auth()

const LeftSidebar = props => {
  const {
    resetMenuState, boards, activeComponent, toggleComponents
  } = props

  const logout = () => {
    resetMenuState()
    auth.logout()
    auth.login()
  }

  const Teams = boards.map(({ team, id }) => {
    return (team &&
      <Button
        key={id}
        id={team}
        backgroundColor={activeComponent === team && '#ccc'}
        color={activeComponent === team && '#000'}
        onClick={e => toggleComponents(e)}
      >{team}
      </Button>
    )
  })

  return (
    <Wrapper>
      <Button
        id="home"
        backgroundColor={activeComponent === 'home' && '#ccc'}
        color={activeComponent === 'home' && '#000'}
        onClick={e => toggleComponents(e)}
      >Home
      </Button>
      <Button
        id="boards"
        backgroundColor={activeComponent === 'boards' && '#ccc'}
        color={activeComponent === 'boards' && '#000'}
        onClick={e => toggleComponents(e)}
      >Boards
      </Button>
      <Title>Teams</Title>
      {Teams}
      <Button
        id="create"
      >+ Create a Team
      </Button>
      <Button onClick={logout}>Logout</Button>
    </Wrapper>
  )
}

export default LeftSidebar
