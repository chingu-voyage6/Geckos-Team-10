import React from 'react'
import { Heading, Button, Wrapper } from '../../../StyledComponents'

const Menu = props => {
  return (
    <Wrapper>
      <Heading>
        {localStorage.getItem('nickname')}
      </Heading>
      <br />
      <Button solid onClick={props.logout}>Logout</Button>
    </Wrapper>
  )
}

export default Menu
