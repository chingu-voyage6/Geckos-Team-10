import React, { Component } from 'react'
import gql from 'graphql-tag'

import { Button, Icon, ButtonCard, Heading, Input, Wrapper } from '../StyledComponents'

const CreateNewBoard = gql`
  mutation ($title: String!, $authorId: ID!, $background: String!, $teamId: ID) {
    createBoard(title: $title, background: $background, authorId: $authorId, teamId: $teamId) {
      id
      title
      author {
        id, name, nickname
      }
      team {
        id, name
      }
    }
  }
`

const RandomColor = () => {
  const hexColor = `#${(Math.floor(Math.random() * 16777215).toString(16))}`
  if (hexColor.length === 6) {
    return `${hexColor}0`
  }
  return hexColor
}

class CreateBoard extends Component {
  state = {
    title: '',
    colors: [
      RandomColor(),
      RandomColor(),
      RandomColor()
    ],
    background: ''
  }

  onChange = e => {
    this.setState({ title: e.target.value })
  }

  randomColorSet = () => {
    const newColors = []
    const { colors } = this.state
    colors.forEach(() => {
      newColors.push(RandomColor())
    })
    this.setState({ colors: newColors })
  }

  selectColor = e => {
    this.setState({ background: e.target.id })
  }

  handleSubmit = async () => {
    const { userId, teamId } = this.props
    const { title, background } = this.state
    try {
      await this.props.client.mutate({
        mutation: CreateNewBoard,
        variables: {
          authorId: userId, title, background, teamId
        }
      })
    } catch (err) {
      console.log('err::', err)
    }
  }

  render() {
    // const { teamId } = this.props
    const { colors, background } = this.state
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
        <Input wide onChange={this.onChange} />
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
                {(color === background) && <Icon center className="fa fa-check" />}
              </ButtonCard>
            )
          })}
        </Wrapper>
        <br />
        <Button solid onClick={this.handleSubmit}>Create Board</Button>
      </Wrapper>
    )
  }
}

export default CreateBoard
