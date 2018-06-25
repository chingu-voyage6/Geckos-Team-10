import React from 'react'
import { Button, ListFooterContainer } from './ListFooter.styles'

const ListFooter = props => {
  return (
    props.addingCard
      ? (
        <ListFooterContainer>
          <Button
            width="50px"
            onClick={props.onSaveCard}
            backgroundColor="#5aac44"
            backgroundColorHover="#519839"
            color="#fff"
            colorHover="#fff"
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
