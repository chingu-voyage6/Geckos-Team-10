import React from 'react'
import { Button, CardTaskContainer, Label, LineContainer } from './CardTask.styles'

const CardTask = props => {
  return (
    <CardTaskContainer>
      <Label>{props.content}</Label>
      <LineContainer>
        <Button>{props.dueDate}</Button>
        <Label>{props.member}</Label>
      </LineContainer>
    </CardTaskContainer>
  )
}

export default CardTask
