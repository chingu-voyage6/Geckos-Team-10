import React, { Fragment } from 'react'
import { Wrapper, Input } from '../TeamViewer.styles'
import { Button } from '../../../Home.styles'

const EditTeam = props => {
  return (
    <Fragment>
      <span>Name</span>
      <Input value={props.team.name} />
      <br />
      <span>Description (optional)</span>
      <Input value={props.team.description} />
      <br />
      <span>Website URL (optional)</span>
      <Input value={props.team.website} />
      <br />
      <Wrapper flex>
        <Button solid small>Save</Button>
        <Button solid small>Cancel</Button>
      </Wrapper>
    </Fragment>
  )
}

export default EditTeam
