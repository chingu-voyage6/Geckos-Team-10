import React, { Component } from 'react'

import { Button, Heading, Input, Wrapper } from '../../../../../StyledComponents'

class DeleteTeam extends Component {
  state = {
    isDisabled: true
  }

  checkInput = e => {
    const { name } = this.props.team
    if (e.target.value === name) {
      this.setState({ isDisabled: false })
    } else {
      this.setState({ isDisabled: true })
    }
  }

  render() {
    const { isDisabled } = this.state
    return (
      <Wrapper width="100%">
        <Heading color="black">
          Are you sure you want to do this?
        </Heading>
        <br />
        <div>
          <span>Please type in the name of this team to confirm.</span>
        </div>
        <br />
        <Input wide onChange={this.checkInput} />
        <br />
        <Button
          solid
          // disabled={isDisabled}
          danger={!isDisabled}
        >Delete this Team
        </Button>
      </Wrapper>
    )
  }
}

export default DeleteTeam
