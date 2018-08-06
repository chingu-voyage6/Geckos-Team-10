import React from 'react'
import { Heading, Button, Wrapper } from '../../../StyledComponents'

const Menu = props => {
  return (
    <Wrapper>
      <Heading>
        {localStorage.getItem('nickname')}
      </Heading>
      <br />
      <Button solid onClick={props.logoutWithRedirect}>Logout</Button>
    </Wrapper>
  )
}

export default Menu
