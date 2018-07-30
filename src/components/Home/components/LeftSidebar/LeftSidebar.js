import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { Icon, Title } from '../../../StyledComponents/index'
import { Button } from '../../Home.styles'
import { Wrapper } from './LeftSidebar.styles'

const TeamsQuery = gql`
  query user($id: ID) {
    User (id: $id) {
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
        bold
        name="boards"
        active={props.activeComponent === 'boards'}
        onClick={el => props.toggleComponents(el)}
      >
        <Icon
          grey
          active={props.activeComponent === 'boards'}
          className="fa fa-square"
        />
        Boards
      </Button>
      <Title light_grey >Teams</Title>
      <Query
        query={TeamsQuery}
        variables={{ id: props.userId }}
      >
        {({ loading, data }) => {
          return (
            !loading && data && data.User && data.User.teams.map(team => (
              <Button
                bold
                key={team.id}
                id={team.id}
                name={team.name}
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
