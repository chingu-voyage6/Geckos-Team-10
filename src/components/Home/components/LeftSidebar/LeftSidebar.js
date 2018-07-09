import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { Icon, Title } from '../../../StyledComponents/index'
import { Wrapper, Button } from './LeftSidebar.styles'

const TeamsQuery = gql`
  {
    User (key: "github|20284107") {
      id
      teams {
        id
        name
      }
    }
  }
`

const LeftSidebar = props => {
  return (
    <Wrapper>
      <Button
        id="home"
        active={props.activeComponent === 'home'}
        onClick={el => props.toggleComponents(el)}
      >
        <Icon
          grey
          className="fa fa-home"
          active={props.activeComponent === 'home'}
        />
        Home
      </Button>
      <Button
        id="boards"
        active={props.activeComponent === 'boards'}
        onClick={el => props.toggleComponents(el)}
      >
        <Icon
          grey
          active={props.activeComponent === 'boards'}
          className="fa fa-square" />
        Boards
      </Button>
      <Title light_grey >Teams</Title>
      <Query query={TeamsQuery}>
        {({ loading, data }) => {
          return (
            !loading && data.User.teams.map(team => (
              <Button
                key={team.id}
                id={team.name}
                active={props.activeComponent === team.name}
                onClick={el => props.toggleComponents(el)}
              >
                <Icon
                  grey
                  className="fa fa-users"
                  active={props.activeComponent === team.name}
                />
                {team.name}
              </Button>
            ))
          )
        }}
      </Query>
      <Button
        id="create"
      >+ Create a Team
      </Button>
    </Wrapper>
  )
}

export default LeftSidebar
