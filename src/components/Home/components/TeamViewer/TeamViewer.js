import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { Button } from '../../Home.styles'
import { Icon, Title } from '../../../StyledComponents/index'
import { Wrapper } from './TeamViewer.styles'
import EditTeam from './components/EditTeam'

const TeamQuery = gql`
  query ($id: ID){
    Team(id: $id) {
      id, name, desc, website, users {
        id, name, nickname
      }
    }
  }
`

class TeamViewer extends Component {
  state = { activeTab: 'edit team' }

  changeTab = e => {
    console.log(e.target.name)
    this.setState({ activeTab: e.target.name })
  }

  render() {
    return (
      <Wrapper>
        <Query query={TeamQuery} variables={{ id: this.props.teamId, }}>
          {({ loading, data: { Team } }) => {
            console.log(Team)
            return (
              !loading && Team && (
                <Wrapper flex>
                  <Wrapper large>
                    <Title><Icon grey className="fa fa-user" />{Team.name}</Title>
                    <br />
                    {this.state.activeTab === 'settings' && <div>{this.state.activeTab}</div>}
                    {this.state.activeTab === 'members' && <div>{this.state.activeTab}</div>}
                    {this.state.activeTab === 'edit team' && <EditTeam team={Team} />}
                  </Wrapper>
                  <Wrapper small>
                    <Button solid bold name="edit team" onClick={el => this.changeTab(el)}>
                      <Icon grey className="fa fa-edit" />Edit Team
                    </Button>
                    <Button solid bold name="members" onClick={el => this.changeTab(el)}>
                      <Icon grey className="fa fa-user" />Members
                    </Button>
                    <Button solid bold name="settings" onClick={el => this.changeTab(el)}>
                      <Icon grey className="fa fa-gear" />Settings
                    </Button>
                    <br />
                    <Button solid bold>
                      <Icon grey className="fa fa-plus" />Create a team board
                    </Button>
                    <Button solid bold>
                      <Icon grey className="fa fa-user-plus" />Add Member
                    </Button>
                    {/* <StyledLink to={`/teams/${this.props.teamId}`}>
                      <Icon grey className="fa fa-gear" />View Team
                    </StyledLink> */}
                    {/* {Team && Team.users && Team.users.map(({ name, nickname }) => {
                    return (
                      <Row>
                        <Title>{name}</Title>
                        <div>{`@${nickname}`}</div>
                      </Row>
                    )
                    })} */}
                  </Wrapper>
                </Wrapper>
              )
            )
          }}
        </Query>
      </Wrapper>
    )
  }
}

export default TeamViewer
