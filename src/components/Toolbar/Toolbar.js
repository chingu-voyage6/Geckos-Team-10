import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import { Auth } from '../../services/Services'
import { Wrapper, Button, Brand, Input, Icon } from './Toolbar.styles'
import Boards from '../Boards/Boards'

const auth = new Auth()

const { isAuthenticated } = auth

class Toolbar extends Component {
  constructor(props) {
    super(props)
    this.state = { isActive: false }
  }
  toggleBoards = () => {
    this.setState({ isActive: !this.state.isActive })
  }

  render() {
    const BoardsJSX = (
      <Boards
        toggleFixedMenu={this.props.toggleFixedMenu}
        keepOpen={this.props.keepOpen}
      />)

    const ContentJSX = (
      <Fragment>
        {this.state.isActive && BoardsJSX
        }
        {!this.props.keepOpen &&
          <Button onClick={this.toggleBoards}>Boards</Button>
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
      </Fragment>
    )

    return (
      isAuthenticated() &&
      <Fragment>
        {this.props.keepOpen ? BoardsJSX : ''}
        {this.props.keepOpen ?
          <Wrapper offset>
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
