import React, { Component, Fragment } from 'react'

import { Wrapper, Input, Button, MenuHeader, Text } from './Boards.styles'

import ZippyMenu from './ZippyMenu/ZippyMenu'

class Boards extends Component {
  componentDidMount = () => {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  setBoardsRef = node => {
    this.boardsRef = node
  }

  handleClickOutside = event => {
    if (this.boardsRef && event.target.id !== 'toggle_boards' && !this.boardsRef.contains(event.target)) {
      this.props.toggleBoards(false)
    }
  }

  render() {
    const ContentJSX = (
      <Fragment>
        {this.props.keepOpen &&
          <MenuHeader>
            <Text black>Menu</Text>
          </MenuHeader>
        }
        <Input type="search" placeholder="Find boards by name..." />
        <ZippyMenu title="Starred Boards" />
        <ZippyMenu title="Recent Boards" />
        <ZippyMenu title="Personal Boards" />
        <ZippyMenu title="Shared Boards" />
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
}

export default Boards
