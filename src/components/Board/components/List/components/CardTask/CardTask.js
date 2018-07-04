import React from 'react'
import { CardTaskContainer, Label, LineContainer } from './CardTask.styles'
import { Button } from '../../../../../StyledComponents'

const CardTask = props => {
  return (
    <CardTaskContainer onClick={() => props.onCardClick()}>
      <Label>{props.content}</Label>
      <LineContainer>
        <Button
          color="#fff"
          backgroundColor="#5aac44"
          hoverBackgroundColor="#519839"
          hoverColor="#fff"
          width="100px"
        >
          {props.dueDate}
        </Button>
        <Button
          borderRadius="100%"
          width="30px"
        >
          {props.member}
        </Button>
      </LineContainer>
    </CardTaskContainer>
  )
}

export default CardTask
