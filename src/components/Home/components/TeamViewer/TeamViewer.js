import React from 'react'
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

const TeamViewer = props => {
  const CreateBoardPopOver = PopOver(CreateBoard, CreateBoardButton)
  console.log(props)
  return (
    <Wrapper large>
      <Query query={TeamQuery} variables={{ id: props.teamId, }}>
        {({ loading, data: { Team } }) => {
          return (
            !loading && Team && (
              <Wrapper flex>
                <Wrapper large>
                  <Title><Icon grey className="fa fa-user" />{Team.name}</Title>
                  <br />
                  {props.activeTab === 'settings' && <Settings team={Team} />}
                  {props.activeTab === 'members' && <Members team={Team} />}
                  {props.activeTab === 'edit team' &&
                    <EditTeam
                      website={Team.website}
                      teamId={Team.id}
                      name={Team.name}
                      desc={Team.desc}
                    />
                  }
                </Wrapper>
                <Wrapper small>
                  <Button
                    solid
                    bold
                    name="edit team"
                    active={props.activeTab === 'edit team'}
                    onClick={el => props.changeTab(el)}
                  >
                    <Icon
                      grey
                      active_white={props.activeTab === 'edit team'}
                      className="fa fa-edit"
                    />Edit Team
                  </Button>
                  <Button
                    solid
                    bold
                    name="members"
                    active={props.activeTab === 'members'}
                    onClick={el => props.changeTab(el)}
                  >
                    <Icon
                      grey
                      active_white={props.activeTab === 'members'}
                      className="fa fa-user"
                    />Members
                  </Button>
                  <Button
                    solid
                    bold
                    name="settings"
                    active={props.activeTab === 'settings'}
                    onClick={el => props.changeTab(el)}
                  >
                    <Icon
                      grey
                      active_white={props.activeTab === 'settings'}
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

const TeamViewerWithApollo = withApollo(TeamViewer)

export default TeamViewerWithApollo
