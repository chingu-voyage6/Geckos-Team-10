import React from 'react'
import { ButtonCard, Icon } from '../StyledComponents'
import { Button } from '../Home/components/TeamViewer/TeamViewer.styles'

const CreateBoardButton = props => {
  const setButtonRef = node => {
    this.buttonRef = node
  }

  const { togglePopOver, buttonType } = props

  return (
    <div ref={setButtonRef}>
      {buttonType && buttonType === 'card' ?
        <ButtonCard
          id="create"
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


export default CreateBoardButton
