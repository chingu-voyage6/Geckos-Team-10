import React, { Component } from 'react'
import { Query, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import { Icon, Title } from '../../../StyledComponents/index'
import { Wrapper, Button } from './TeamViewer.styles'
import { EditTeam, Members, Settings } from './components'
import { CreateBoardButton, CreateBoard, PopOver } from '../../../Components'

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
    this.setState({ activeTab: e.target.name })
  }

  render() {
    const { activeTab } = this.state
    const CreateBoardPopOver = PopOver(CreateBoard, CreateBoardButton)
    return (
      <Wrapper large>
        <Query query={TeamQuery} variables={{ id: this.props.teamId, }}>
          {({ loading, data: { Team } }) => {
            return (
              !loading && Team && (
                <Wrapper flex>
                  <Wrapper large>
                    <Title><Icon grey className="fa fa-user" />{Team.name}</Title>
                    <br />
                    {activeTab === 'settings' && <Settings team={Team} />}
                    {activeTab === 'members' && <Members team={Team} />}
                    {activeTab === 'edit team' && <EditTeam team={Team} />}
                  </Wrapper>
                  <Wrapper small>
                    <Button
                      solid
                      bold
                      name="edit team"
                      active={activeTab === 'edit team'}
                      onClick={el => this.changeTab(el)}
                    >
                      <Icon
                        grey
                        active_white={activeTab === 'edit team'}
                        className="fa fa-edit"
                      />Edit Team
                    </Button>
                    <Button
                      solid
                      bold
                      name="members"
                      active={activeTab === 'members'}
                      onClick={el => this.changeTab(el)}
                    >
                      <Icon
                        grey
                        active_white={activeTab === 'members'}
                        className="fa fa-user"
                      />Members
                    </Button>
                    <Button
                      solid
                      bold
                      name="settings"
                      active={activeTab === 'settings'}
                      onClick={el => this.changeTab(el)}
                    >
                      <Icon
                        grey
                        active_white={activeTab === 'settings'}
                        className="fa fa-gear"
                      />Settings
                    </Button>
                    <br />
                    <CreateBoardPopOver teamId={Team.id} />
                    <Button solid bold>
                      <Icon grey className="fa fa-user-plus" />Add Member
                    </Button>
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

const TeamViewerWithApollo = withApollo(TeamViewer)

export default TeamViewerWithApollo
