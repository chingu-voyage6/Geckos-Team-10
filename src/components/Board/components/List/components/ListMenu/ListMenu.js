import React from 'react'
import ListMenuContainer from './ListMenu.styles'
import { Button } from '../../../../../StyledComponents'

const ListMenu = props => {
  return (
    <ListMenuContainer>
      <Button onClick={props.onAddCard}>Add Card</Button>
      <Button onClick={props.onRemoveCard}>Remove List</Button>
    </ListMenuContainer>
  )
}

export default ListMenu
