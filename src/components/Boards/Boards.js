import React, { Fragment, useEffect } from 'react'

import { Wrapper, Button, MenuHeader, Text } from './Boards.styles'

import ZippyMenu from './ZippyMenu/ZippyMenu'

const Boards = () => {
  const handleClickOutside = event => {
    if (this.boardsRef && event.target.id !== 'toggle_boards' && !this.boardsRef.contains(event.target)) {
      this.props.toggleBoards(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const { boards, teams } = this.props
  const ContentJSX = (
    <Fragment>
      {this.props.keepOpen &&
        <MenuHeader>
          <Text black>Menu</Text>
        </MenuHeader>
      }
      {/* <Input type="search" placeholder="Find boards by name..." /> */
      /* <ZippyMenu title="Starred Boards" /> */
      /* <ZippyMenu title="Recent Boards" /> */}
      <ZippyMenu title="All Boards" boards={boards} />
      {teams && teams.map(team => {
        return <ZippyMenu key={team.id} teamId={team.id} title={team.name} boards={team.boards} />
      })}
      <Button secondary onClick={this.props.toggleFixedMenu}>
        {`${(this.props.keepOpen ? 'Don\'t' : 'Always')} keep this tab open`}
      </Button>
    </Fragment>
  )

  return (
    this.props.keepOpen ?
      <Wrapper alwaysOpen>
        {ContentJSX}
      </Wrapper> :
      <div ref={this.setBoardsRef}>
        <Wrapper notAlwaysOpen>
          {ContentJSX}
        </Wrapper>
      </div>
  )
}

export default Boards
