import React, { Component } from 'react'
import { Button } from '../../Home.styles'

class CreateTeamButton extends Component {
  componentDidMount = () => {
    // console.log(this.buttonRef.getBoundingClientRect())
  }

  setButtonRef = node => {
    this.buttonRef = node
  }

  render() {
    const { togglePopOver } = this.props
    return (
      <div ref={this.setButtonRef}>
        <Button
          id="create"
          onClick={() => togglePopOver(this.buttonRef.getBoundingClientRect())}
        >+ Create a Team
        </Button>
      </div >
    )
  }
}

export default CreateTeamButton
