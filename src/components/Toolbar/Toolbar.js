import React, { Component, Fragment } from 'react'
import Color from 'color'
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
    const {
      toggleFixedMenu, keepOpen, isAuthenticated, background
    } = this.props

    let primary = Color(background)
    let secondary = Color(background)
    let tertiary = Color(background)

    if (secondary.isLight()) {
      primary = primary.darken(0.15).desaturate(0.1)
      secondary = secondary.lighten(0.2)
      tertiary = tertiary.desaturate(0.1)
    } else {
      secondary = secondary.lighten(0.5).desaturate(0.5)
      tertiary = tertiary.lighten(0.25).desaturate(0.25)
    }

    const CreateButton = props => {
      return (
        <Button
          pull_right
          hover={tertiary.hex()}
          background={secondary.hex()}
          onClick={() => props.togglePopOver()}
        >
          <Icon className="fa fa-plus" />
        </Button>
      )
    }

    const PopOverMenu = PopOver(Menu, Avatar)

    const PopOverCreate = PopOver(CreateMenu, CreateButton)

    return (
      isAuthenticated &&
      <Fragment>
        <Wrapper offset={keepOpen || undefined} background={primary.hex()}>
          {isActive &&
            <Boards
              setBackground={this.setBackground}
              toggleFixedMenu={toggleFixedMenu}
              toggleBoards={this.toggleBoards}
              keepOpen={keepOpen}
              {...this.props}
            />
          }
          {!keepOpen &&
            <Button
              id="toggle_boards"
              hover={tertiary.hex()}
              background={secondary.hex()}
              onClick={this.toggleBoards}
            >Boards
            </Button>
          }
          <Input
            type="search"
            hover={tertiary.hex()}
            background={secondary.hex()}
          />
          <Brand re_center={keepOpen ? '55%' : '45%'}>
            <StyledLink to="/" color={secondary.hex()}>Trello Clone</StyledLink>
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
