import React, { Component, Fragment } from 'react'
import { Wrapper, Button, Brand, Input, Icon, RowItem } from './Toolbar.styles'
import { StyledLink } from '../StyledComponents'
import { Boards, PopOver } from '../Components'
import { Avatar, Menu, CreateMenu } from './components'


export default class Toolbar extends Component {
  state = { isActive: false }

  toggleBoards = nextState => {
    const id = nextState && nextState.target.id // Edge case
    if (id === 'toggle_boards' && this.state.isActive) {
      this.setState({ isActive: false })
    } else if (typeof nextState !== 'undefined') {
      this.setState({ isActive: nextState })
    } else {
      this.setState({ isActive: !this.state.isActive })
    }
  }


  render() {
    const { isActive } = this.state
    const { toggleFixedMenu, keepOpen, isAuthenticated } = this.props

    const CreateButton = props => {
      return (
        <Button pull_right onClick={() => props.togglePopOver()}>
          <Icon className="fa fa-plus" />
        </Button>
      )
    }

    const PopOverMenu = PopOver(Menu, Avatar)

    const PopOverCreate = PopOver(CreateMenu, CreateButton)

    return (
      isAuthenticated &&
      <Fragment>
        <Wrapper offset={keepOpen}>
          {isActive &&
            <Boards
              toggleFixedMenu={toggleFixedMenu}
              toggleBoards={this.toggleBoards}
              keepOpen={keepOpen}
              {...this.props}
            />
          }
          {!keepOpen &&
            <Button id="toggle_boards" onClick={this.toggleBoards}>Boards</Button>
          }
          <Input type="search" />
          <Brand>
            <StyledLink to="/">Trello Clone</StyledLink>
          </Brand>
          <RowItem pull_right>
            <PopOverCreate {...this.props} />
          </RowItem>
          <PopOverMenu {...this.props} />
        </Wrapper>
      </Fragment>
    )
  }
}
