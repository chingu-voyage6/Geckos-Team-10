import React from 'react'

import { Button, Heading, Icon, Input, TextArea, Wrapper } from '../StyledComponents'

const CreateTeam = props => {
  return (
    <Wrapper width="100%">
      <Heading>
        {props && props.hasChevron ?
          <Wrapper flex align>
            <Button
              width="10%"
              marginLeft="0"
              hoverBackgroundColor="white"
              onClick={props.goBack}
            ><Icon grey className="fa fa-chevron-left" />
            </Button>
            <div style={{ textAlign: 'center', width: '80%' }}>Create Team</div>
          </Wrapper> :
          <span>Create Team</span>
        }
      </Heading>
      <br />
      <span>Name</span>
      <Input wide />
      <br />
      <span>Description (optional)</span>
      <TextArea wide />
      <br />
      <Button solid>Save</Button>
    </Wrapper>
  )
}

export default CreateTeam
