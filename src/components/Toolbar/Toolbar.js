import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import { Auth } from '../../services/Services'
import { Wrapper, Button, Brand, Input, Icon } from './Toolbar.styles'
import Boards from '../Boards/Boards'
import PopOver from './components/PopOver/PopOver'

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
  }

  render() {
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
          <Link to="/">Trello Clone</Link>
        </Brand>
        <Button pull_right>
          <Icon className="fa fa-plus" />
        </Button>
        <Button>
          <Icon className="fa fa-info" />
        </Button>
        <Button>
          <Icon className="fa fa-bell" />
        </Button>
        <PopOver logout={this.logout} />
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
