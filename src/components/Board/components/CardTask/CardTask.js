import React from 'react'
import { CardTaskContainer, Label } from './components'

const CardTask = props => {
  return (
    <CardTaskContainer>
      <Label>{props.content}</Label>
    </CardTaskContainer>
  )
}

export default CardTask
