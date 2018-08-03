import React, { Component } from 'react'

import { Button, Icon, ButtonCard, Heading, Input, Wrapper } from '../StyledComponents'

const RandomColor = () => `#${(Math.floor(Math.random() * 16777215).toString(16))}`

class CreateBoard extends Component {
  state = {
    colors: [
      RandomColor(),
      RandomColor(),
      RandomColor()
    ],
    colorChoice: ''
  }

  selectColor = e => {
    this.setState({ colorChoice: e.target.id })
  }

  randomColorSet = () => {
    const newColors = []
    const { colors } = this.state
    colors.forEach(() => {
      newColors.push(RandomColor())
    })
    this.setState({ colors: newColors })
  }

  render() {
    // const { teamId } = this.props
    const { colors, colorChoice } = this.state
    const { hasChevron, goBack } = this.props
    return (
      <Wrapper width="100%">
        <Heading>
          {this.props && hasChevron ?
            <Wrapper flex align>
              <Button
                width="10%"
                marginLeft="0"
                onClick={goBack}
                hoverBackgroundColor="white"
              ><Icon grey className="fa fa-chevron-left" />
              </Button>
              <div style={{ textAlign: 'center', width: '80%' }}>Create a Board</div>
            </Wrapper> :
            <span>Create a Board</span>
          }
        </Heading>
        <br />
        <span>Board Title</span>
        <Input wide />
        <br />
        <Wrapper flex align>
          <span>Color</span>
          <Button bold width="100px" pull_right onClick={this.randomColorSet}>Refresh</Button>
        </Wrapper>
        <Wrapper flex>
          {colors && colors.map(color => {
            return (
              <ButtonCard
                id={color}
                key={color}
                height="55px"
                background={color}
                onClick={this.selectColor}
              >
                {(color === colorChoice) && <Icon center className="fa fa-check" />}
              </ButtonCard>
            )
          })}
        </Wrapper>
        <br />
        <Button solid>Create Board</Button>
      </Wrapper>
    )
  }
}

export default CreateBoard
