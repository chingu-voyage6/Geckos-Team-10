import React from 'react'
import { Label, ListHeaderContainer } from './ListHeader.styles'
import { Button } from '../../../../../StyledComponents'

const ListHeader = props => {
  return (
    <ListHeaderContainer>
      <Label>
        {props.listTitle}
      </Label>
      <Button width="30px" onClick={props.displayOption}>
        ...
      </Button>
    </ListHeaderContainer>
  )
}

export default ListHeader
