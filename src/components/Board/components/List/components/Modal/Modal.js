import React from 'react'
import { ModalContainer, Button } from './Modal.styles'

const Modal = props => {
  return (
    <ModalContainer>
      <Button onClick={props.onAddCard}>Add Card</Button>
      <Button>Copy List</Button>
      <Button>Move List</Button>
    </ModalContainer>
  )
}

export default Modal
