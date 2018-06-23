import React from 'react'

import { Wrapper, Input, Button } from './Boards.styles'

import ZippyMenu from './Components/ZippyMenu'

const Boards = () => {
  return (
    <Wrapper>
      <Input type="search" placeholder="Find boards by name..." />
      <ZippyMenu title="Starred Boards" />
      <ZippyMenu title="Recent Boards" />
      <ZippyMenu title="Personal Boards" />
      <ZippyMenu title="Shared Boards" />
      <Button secondary onClick={null}>Keep this tab open</Button>
    </Wrapper>
  )
}

export default Boards
