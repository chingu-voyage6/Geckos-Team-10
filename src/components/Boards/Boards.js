import React, { Fragment } from 'react'

import { Wrapper, Input, Button, MenuHeader, Text } from './Boards.styles'

import ZippyMenu from './ZippyMenu/ZippyMenu'

const Boards = props => {
  const ContentJSX = (
    <Fragment>
      {props.keepOpen &&
        <MenuHeader>
          <Text black>Menu</Text>
        </MenuHeader>
      }
      <Input type="search" placeholder="Find boards by name..." />
      <ZippyMenu title="Starred Boards" />
      <ZippyMenu title="Recent Boards" />
      <ZippyMenu title="Personal Boards" />
      <ZippyMenu title="Shared Boards" />
      <Button secondary onClick={props.toggleFixedMenu}>
        {`${(props.keepOpen ? 'Don\'t' : 'Always')} keep this tab open`}
      </Button>
    </Fragment>
  )

  return (
    props.keepOpen ?
      <Wrapper alwaysOpen>
        {ContentJSX}
      </Wrapper> :
      <Wrapper notAlwaysOpen>
        {ContentJSX}
      </Wrapper>

  )
}

export default Boards
