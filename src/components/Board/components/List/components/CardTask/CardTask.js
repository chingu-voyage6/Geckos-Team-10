import React from 'react'
import { CardTaskContainer, Label, LineContainer } from './CardTask.styles'
import { Button } from '../../../../../StyledComponents'

const CardTask = props => {
  return (
    <CardTaskContainer onClick={() => props.onCardClick()}>
      <Label>{props.task}</Label>
      <LineContainer>
        <Button
          color="#fff"
          backgroundColor="#5aac44"
          hoverBackgroundColor="#519839"
          hoverColor="#fff"
          width="100px"
        >
          {props.dueDate || '07/07/18'}
        </Button>
        <Button
          borderRadius="5px"
          width="100px"
        >
          {props.member}
        </Button>
      </LineContainer>
    </CardTaskContainer>
  )
}

export default CardTask
