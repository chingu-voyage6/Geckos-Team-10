import React, { Component, Fragment } from 'react'

import { Auth } from '../../services/Services'
import { Wrapper, Button, Brand, Input, Icon, RowItem } from './Toolbar.styles'
import { StyledLink } from '../StyledComponents'
import { Boards, PopOver } from '../Components'
import { Avatar, Menu, CreateMenu } from './components'

const auth = new Auth()

const { isAuthenticated } = auth

class Toolbar extends Component {
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

  logout = () => {
    this.props.auth.logout()
    this.props.auth.login()
  }

  render() {
    const CreateButton = props => {
      return (
        <Button pull_right onClick={() => props.togglePopOver()}>
          <Icon className="fa fa-plus" />
        </Button>
      )
    }

    const PopOverMenu = PopOver(Menu, Avatar)

    const PopOverCreate = PopOver(CreateMenu, CreateButton)

    const BoardsJSX = (
      <Boards
        toggleFixedMenu={this.props.toggleFixedMenu}
        toggleBoards={this.toggleBoards}
        keepOpen={this.props.keepOpen}
      />)

    const ContentJSX = (
      <Fragment>
        {
          this.state.isActive && BoardsJSX
        }
        {!this.props.keepOpen &&
          <Button id="toggle_boards" onClick={this.toggleBoards}>Boards</Button>
        }
        <Input type="search" />
        <Brand>
          <StyledLink to="/">Trello Clone</StyledLink>
        </Brand>
        <RowItem pull_right>
          <PopOverCreate />
        </RowItem>
        <PopOverMenu logout={this.logout} />
      </Fragment>
    )

    return (
      isAuthenticated() &&
      <Fragment>
        {this.props.keepOpen ?
          <Wrapper offset="true">
            {ContentJSX}
          </Wrapper> :
          <Wrapper>
            {ContentJSX}
          </Wrapper>
        }
      </Fragment>
    )
  }
}

export default Toolbar
