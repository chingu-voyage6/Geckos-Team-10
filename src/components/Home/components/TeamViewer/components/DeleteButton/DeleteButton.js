import React, { Component } from 'react'

import { Icon } from '../../../../../StyledComponents/index'
import { Button } from '../../TeamViewer.styles'

class DeleteButton extends Component {
  setButtonRef = node => {
    this.buttonRef = node
  }
  render() {
    const { togglePopOver } = this.props
    return (
      <div ref={this.setButtonRef}>
        <Button
          card
          danger
          id="delete"
          onClick={() => togglePopOver(this.buttonRef.getBoundingClientRect())}
        >
          <Icon className="fa fa-times" />Delete
        </Button>
      </div >
    )
  }
}

export default DeleteButton
