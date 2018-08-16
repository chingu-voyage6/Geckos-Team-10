import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import _ from 'lodash'

import { Button, Wrapper } from '../../TeamViewer.styles'
import { Input, TextArea } from '../../../../../StyledComponents/index'

const updateTeam = gql`
  mutation ($teamId: ID!, $name: String, $desc: String, $website: String) {
  updateTeam(id: $teamId, name: $name, desc: $desc, website: $website) {
    id
    name
    desc
    website
  }
}
`

const TeamQuery = gql`
  query ($id: ID){
    Team(id: $id) {
      id, name, desc, website, users {
        id, name, nickname
      }
    }
  }
`

class EditTeam extends Component {
  state = {
    isDisabled: true,
    website: '',
    teamId: '',
    name: '',
    desc: ''
  }

  componentDidMount = () => {
    this.getTeam(this.props.teamId)
  }

  componentWillReceiveProps = nextState => {
    this.getTeam(nextState.teamId)
  }

  onChange = e => {
    const cb = () => {
      this.setState({ isDisabled: this.compare() })
    }

    switch (e.target.id) {
      case 'name':
        this.setState({ name: e.target.value }, cb)
        break
      case 'desc':
        this.setState({ desc: e.target.value }, cb)
        break
      case 'website':
        this.setState({ website: e.target.value }, cb)
        break
      default:
    }
  }

  getTeam = async id => {
    try {
      const { data: { Team } } = await this.props.client.query({
        query: TeamQuery,
        variables: { id }
      })

      const { name, desc, website } = Team

      if (Team) {
        this.setState({
          teamId: id, name, desc, website
        })
      }
    } catch (err) {
      console.log('err::', err)
    }
  }

  initialState = () => {
    const {
      website, teamId, name, desc
    } = this.props
    return {
      website, teamId, name, desc
    }
  }

  compare = () => {
    const {
      website, teamId, name, desc
    } = this.state

    const newState = {
      website, teamId, name, desc
    }

    return _.isEqual(newState, this.initialState())
  }


  handleSubmit = async () => {
    const {
      website, teamId, name, desc
    } = this.state

    try {
      await this.props.client.mutate({
        mutation: updateTeam,
        variables: {
          website, teamId, name, desc
        }
      })
    } catch (err) {
      console.log('err::', err)
    }
  }

  render() {
    const {
      isDisabled,
      website,
      name,
      desc,
    } = this.state
    return (
      <div style={{ width: '300px', margin: 'auto', display: 'block' }}>
        <span>Name</span>
        <Input
          wide
          id="name"
          value={name || ''}
          onChange={this.onChange}
        />
        <br />
        <span>desc (optional)</span>
        <TextArea
          wide
          id="desc"
          value={desc || ''}
          onChange={this.onChange}
        />
        <br />
        <span>Website URL (optional)</span>
        <Input
          wide
          id="website"
          value={website || ''}
          onChange={this.onChange}
        />
        <br />
        <Wrapper flex>
          <Button
            solid
            small
            onClick={this.handleSubmit}
            disabled={isDisabled}
            submit={!isDisabled}
          >Save
          </Button>
          <Button solid small >Cancel</Button>
        </Wrapper>
      </div>
    )
  }
}

const EditTeamWithApollo = withApollo(EditTeam)

export default EditTeamWithApollo
