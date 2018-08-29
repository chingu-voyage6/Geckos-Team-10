import React, { Component } from 'react'
import { ButtonCard, Icon } from '../StyledComponents'
import { Button } from '../Home/components/TeamViewer/TeamViewer.styles'

class CreateBoardButton extends Component {
  setButtonRef = node => {
    this.buttonRef = node
  }

  render() {
    const { togglePopOver, buttonType } = this.props
    return (
      <div ref={this.setButtonRef}>
        {buttonType && buttonType === 'card' ?
          <ButtonCard
            id="create"
            {...this.props}
            onClick={() => togglePopOver(this.buttonRef.getBoundingClientRect())}
          >Create new board..
          </ButtonCard> :
          <Button
            solid
            bold
            id="create"
            onClick={() => togglePopOver(this.buttonRef.getBoundingClientRect())}
          >
            <Icon grey className="fa fa-plus" />Create a Team Board
          </Button>
        }
      </div >
    )
  }
}

export default CreateBoardButton
