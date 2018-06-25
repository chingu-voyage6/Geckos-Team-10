import React from 'react'
import { Button, Label, ListHeaderContainer } from './ListHeader.styles'

const ListHeader = props => {
  return (
    <ListHeaderContainer>
      <Label>
        {props.listTitle}
      </Label>
      <Button onClick={props.displayOption}>
        ...
      </Button>
    </ListHeaderContainer>
  )
}

export default ListHeader
