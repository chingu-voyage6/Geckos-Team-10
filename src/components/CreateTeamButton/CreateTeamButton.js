import React, { Component } from 'react'
import { Button } from '../StyledComponents'

class CreateTeamButton extends Component {
  setButtonRef = node => {
    this.buttonRef = node
  }

  render() {
    const { togglePopOver } = this.props
    return (
      <div ref={this.setButtonRef}>
        <Button
          id="create"
          width="215px"
          textAlign="left"
          color="black"
          onClick={() => togglePopOver(this.buttonRef.getBoundingClientRect())}
        >+ Create a Team
        </Button>
      </div >
    )
  }
}

export default CreateTeamButton
