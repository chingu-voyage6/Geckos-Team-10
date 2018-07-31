import React, { Component, Fragment } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import { Button, Wrapper, Input } from '../../TeamViewer.styles'
import TextArea from './EditTeam.styles'

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

class EditTeam extends Component {
  state = {
    teamId: '',
    name: '',
    website: '',
    desc: ''
  }

  componentDidMount = () => {
    const {
      id,
      name,
      desc,
      website
    } = this.props.team
    this.setState({
      teamId: id,
      name,
      desc,
      website
    })
  }

  componentWillReceiveProps = nextProps => {
    const {
      id,
      name,
      desc,
      website
    } = nextProps.team
    this.setState({
      teamId:
        id,
      name,
      desc,
      website
    })
  }

  onChange = e => {
    switch (e.target.id) {
      case 'name':
        this.setState({ name: e.target.value })
        break
      case 'desc':
        this.setState({ desc: e.target.value })
        break
      case 'website':
        this.setState({ website: e.target.value })
        break
      default:
    }
  }

  handleSubmit = async () => {
    console.log(...this.state)
    try {
      await this.props.client.mutate({
        mutation: updateTeam,
        variables: { ...this.state }
      })
    } catch (err) {
      console.log('err::', err)
    }
  }

  render() {
    const { name, desc, website } = this.state
    return (
      <Fragment>
        <span>Name</span>
        <Input
          id="name"
          value={name || ''}
          onChange={this.onChange}
        />
        <br />
        <span>desc (optional)</span>
        <TextArea
          id="desc"
          value={desc || ''}
          onChange={this.onChange}
        />
        <br />
        <span>Website URL (optional)</span>
        <Input
          id="website"
          value={website || ''}
          onChange={this.onChange}
        />
        <br />
        <Wrapper flex>
          <Button solid small onClick={this.handleSubmit}>Save</Button>
          <Button solid small>Cancel</Button>
        </Wrapper>
      </Fragment>
    )
  }
}

const EditTeamWithApollo = withApollo(EditTeam)

export default EditTeamWithApollo
