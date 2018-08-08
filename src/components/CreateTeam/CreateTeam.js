import React, { Component } from 'react'
import { withApollo } from 'react-apollo'

import { Button, Heading, Icon, Input, TextArea, Wrapper } from '../StyledComponents'

class CreateTeam extends Component {
  state = {
    name: '', desc: ''
  }

  onChange = e => {
    if (e.target.id === 'name') {
      this.setState({ name: e.target.value })
    } else {
      this.setState({ desc: e.target.value })
    }
  }

  handleSubmit = () => {
    const { userId, createTeam } = this.props
    const { name, desc } = this.state

    createTeam(userId, name, desc)
  }

  render() {
    const { hasChevron, goBack } = this.props
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
        <Input wide id="name" onChange={this.onChange} />
        <br />
        <span>Description (optional)</span>
        <TextArea wide id="desc" onChange={this.onChange} />
        <br />
        <Button solid onClick={this.handleSubmit}>Save</Button>
      </Wrapper>
    )
  }
}

const CreateTeamWithApollo = withApollo(CreateTeam)

export default CreateTeamWithApollo
