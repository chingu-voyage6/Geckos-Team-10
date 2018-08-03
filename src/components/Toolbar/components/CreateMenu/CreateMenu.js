import React, { Component, Fragment } from 'react'

import { Button, Heading, Wrapper } from '../../../StyledComponents'
import { CreateTeam, CreateBoard } from '../../../Components'

class CreateMenu extends Component {
  state = {
    activeComponent: false,
    hasChevron: true
  }

  goBack = () => {
    this.setState({ activeComponent: false })
  }

  toggleView = e => {
    this.setState({ activeComponent: e.target.id })
  }

  render() {
    const { activeComponent, hasChevron } = this.state
    return (
      <Fragment>
        {!activeComponent &&
          <Wrapper width="100%">
            <Heading>Create</Heading>
            <br />
            <Button
              id="createBoard"
              onClick={this.toggleView}
            >Create a Board...
            </Button>
            <br />
            <Button
              id="createTeam"
              onClick={this.toggleView}
            >Create a Team...
            </Button>
          </Wrapper>
        }
        {activeComponent === 'createBoard' &&
          <CreateBoard hasChevron={hasChevron} goBack={this.goBack} />
        }
        {activeComponent === 'createTeam' &&
          <CreateTeam hasChevron={hasChevron} goBack={this.goBack} />
        }
      </Fragment>
    )
  }
}

export default CreateMenu
