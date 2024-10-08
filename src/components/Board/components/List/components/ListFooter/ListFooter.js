import React from 'react'
import ListFooterContainer from './ListFooter.styles'
import { Button } from '../../../../../StyledComponents'

const ListFooter = props => {
  return (
    props.addingCard
      ? (
        <ListFooterContainer>
          <Button
            width="50px"
            onClick={props.onSaveCard}
            backgroundColor="#5aac44"
            hoverBackgroundColor="#519839"
            color="#fff"
            hoverColor="#fff"
            margin="0 5px 0 0"
          >
            Save
          </Button>
          <Button width="50px" onClick={props.onCancelCard}>
            X
          </Button>
        </ListFooterContainer>
      )
      : (
        <Button onClick={props.onAddCard}>
          Add a card
        </Button>
      )
  )
}

export default ListFooter
