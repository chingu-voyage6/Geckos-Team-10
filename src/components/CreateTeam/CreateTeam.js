import React, { useState } from 'react'
import { withApollo } from 'react-apollo'

import { Button, Heading, Icon, Input, TextArea, Wrapper } from '../StyledComponents'

const CreateTeam = props => {
  const [team, setTeam] = useState({
    name: '',
    desc: ''
  })

  const onChange = e => {
    if (e.target.id === 'name') {
      setTeam({ name: e.target.value })
    } else {
      setTeam({ desc: e.target.value })
    }
  }

  const handleSubmit = () => {
    const { userId, createTeam } = props
    const { name, desc } = team

    createTeam(userId, name, desc)
  }

  const { hasChevron, goBack } = props

  return (
    <Wrapper width="100%">
      <Heading>
        {hasChevron ?
          <Wrapper flex align>
            <Button
              width="10%"
              marginLeft="0"
              hoverBackgroundColor="white"
              onClick={goBack}
            ><Icon grey className="fa fa-chevron-left" />
            </Button>
            <div style={{ textAlign: 'center', width: '80%' }}>Create Team</div>
          </Wrapper> :
          <span>Create Team</span>
        }
      </Heading>
      <br />
      <span>Name</span>
      <Input wide id="name" onChange={onChange} />
      <br />
      <span>Description (optional)</span>
      <TextArea wide id="desc" onChange={onChange} />
      <br />
      <Button solid onClick={handleSubmit}>Save</Button>
    </Wrapper>
  )
}

const CreateTeamWithApollo = withApollo(CreateTeam)

export default CreateTeamWithApollo
