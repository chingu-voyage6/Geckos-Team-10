import React, { Component } from 'react'
import { Button, Text, Icon } from '../Boards.styles'
import { Pills, Pill } from './ZippyMenu.styles'

class ZippyMenu extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  toggleZippy = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    return (
      <Pills>
        <Text>{this.props.title}</Text>
        <Button zippy pull_right onClick={this.toggleZippy}>
          {
            this.state.open ? <Icon className="fa fa-minus" /> :
            <Icon className="fa fa-plus" />
          }
        </Button>
        {
          this.state.open ? <Pill><span>No Boards Made yet</span></Pill> : ''
        }
      </Pills>
    )
  }
}

export default ZippyMenu
