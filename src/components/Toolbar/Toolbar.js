import React from 'react'
import { Link } from 'react-router-dom'

import { Auth } from '../../services/Services'
import { Wrapper, Button, Brand, Input } from './Toolbar.styles'

const auth = new Auth()

const { isAuthenticated } = auth

const Toolbar = () => (
  isAuthenticated() &&
  <Wrapper>
    <Button>Boards</Button>
    <Input type="search" />
    <Brand>
      <Link to="/">Trello Clone</Link>
    </Brand>
    <Button pull_right>Create</Button>
    <Button>Notifications</Button>
    <Button>Profile</Button>
  </Wrapper>
)

export default Toolbar
