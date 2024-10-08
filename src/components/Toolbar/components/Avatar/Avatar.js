import React from 'react'
import { Button, Img } from './Avatar.styles'

const Avatar = props => {
  return (
    <Button avatar onClick={() => props.togglePopOver()}>
      <Img alt="" src={localStorage.getItem('picture')} />
    </Button>
  )
}

export default Avatar
