import React, { Component } from 'react'
import ReactModal from 'react-modal'
import { ModalContainer, ModalColumn, ModalColumnContainer, TextArea } from './Modal.styles'
import BoardProvider from '../../BoardProvider'
import { Button, Label } from '../../../StyledComponents'


class Modal extends Component {
  state = {}

  getParent = () => {
    ReactModal.setAppElement(document.getElementById('root'))
    return document.querySelector('#root')
  }

  render() {
    const { onHideModal, showModal } = this.props
    return (
      <ReactModal
        isOpen={showModal}
        parentSelector={this.getParent}
        onRequestClose={onHideModal}
        style={{
          content: {
            margin: 'auto',
            maxWidth: '768px'
          }
        }}
      >
        <ModalContainer>
          <Label>
            Card Task
          </Label>
        </ModalContainer>
        <Button
          onClick={() => onHideModal()}
          position="absolute"
          positionTop="5px"
          positionRight="5px"
          width="50px"
        >
          X
        </Button>
        <ModalColumnContainer>
          <ModalColumn flexGrow="3" >
            <Label notPointer fontSize="15px" >
              Description
            </Label>
            <TextArea />
            <Label notPointer fontSize="15px" >
              Add a commentary
            </Label>
            <TextArea />
          </ModalColumn>
          <ModalColumn>
            <Label notPointer fontSize="15px" >
              Add
            </Label>
            <Button textAlign="left">Team mate</Button>
            <Button textAlign="left">Tags</Button>
            <Button textAlign="left">Deadline</Button>
            <Label notPointer fontSize="15px" >
              Actions
            </Label>
            <Button textAlign="left">Move</Button>
            <Button textAlign="left">Copy</Button>
            <Button textAlign="left">Remove</Button>
          </ModalColumn>
        </ModalColumnContainer>
        <Button
          onClick={() => onHideModal()}
          color="#fff"
          backgroundColor="#5aac44"
          hoverBackgroundColor="#519839"
          hoverColor="#fff"
          width="100px"
        >
          Save
        </Button>
      </ReactModal>
    )
  }
}

export default props => (
  <BoardProvider.Consumer>
    {value => <Modal {...value} {...props} />}
  </BoardProvider.Consumer>
)
