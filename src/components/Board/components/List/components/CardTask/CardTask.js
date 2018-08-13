import React from 'react'
import { Avatar, CardTaskContainer, Label, LineContainer } from './CardTask.styles'
import { Button } from '../../../../../StyledComponents'

const CardTask = props => {
  return (
    <CardTaskContainer onClick={() => props.onCardClick()}>
      <Label>{props.task}</Label>
      <LineContainer>
        {props.dueDate && (
          <Button
            color="#fff"
            backgroundColor="#5aac44"
            hoverBackgroundColor="#519839"
            hoverColor="#fff"
            width="100px"
          >
            {props.dueDate}
          </Button>
        )}
        {localStorage.getItem('picture')
          ? <Avatar src={localStorage.getItem('picture')} />
          : (
            <Button
              borderRadius="100%"
              width="30px"
            >
              {props.member}
            </Button>
          )
        }
      </LineContainer>
    </CardTaskContainer>
  )
}

export default CardTask
