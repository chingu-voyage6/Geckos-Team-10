import React, { Component, Fragment } from 'react'
import { Icon, Title } from '../../StyledComponents'
import { Button, Text } from '../Boards.styles'
import { Pills, Pill, StyledLink } from './ZippyMenu.styles'

class ZippyMenu extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  toggleZippy = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { open } = this.state
    const { title, boards } = this.props

    return (
      <Pills>
        <Text><Icon grey medium className="fa fa-user" />{title}</Text>
        <Button zippy pull_right onClick={this.toggleZippy}>
          {
            open ? <Icon dark className="fa fa-minus" />
              : <Icon dark className="fa fa-plus" />
          }
        </Button>
        {
          open &&
          <Fragment>
            {boards && boards.length ? boards.map(board => {
              return (
                <StyledLink key={board.id} to={`/board/${board.id}`} background={board.background}>
                  <Title black>{board.title}</Title>
                </StyledLink>
              )
            })
              : <Pill><span>No Boards Made yet</span></Pill>
            }
          </Fragment>
        }
      </Pills>
    )
  }
}

export default ZippyMenu
