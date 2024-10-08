import React from 'react'
import { AddTagMenuContainer, Input } from './AddTagMenu.styles'
import { Button } from '../../../../StyledComponents'

const AddTagMenu = props => {
  return (
    props.loadTagMenu && (
      <AddTagMenuContainer>
        <Input onChange={e => props.onChange(e.target.value)} />
        <Button
          onClick={() => props.addTag()}
          color="#fff"
          backgroundColor="#5aac44"
          hoverBackgroundColor="#519839"
          hoverColor="#fff"
          width="100px"
        >
          Add
        </Button>
      </AddTagMenuContainer>
    )
  )
}

export default AddTagMenu
