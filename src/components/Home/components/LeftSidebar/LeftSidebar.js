import React from 'react'
// import { Query } from 'react-apollo'
// import gql from 'graphql-tag'

import { Icon, Title } from '../../../StyledComponents/index'
import { PopOver, CreateTeam, CreateTeamButton } from '../../../Components'
import { Wrapper } from './LeftSidebar.styles'
import { Button } from '../../Home.styles'

const LeftSidebar = props => {
  const CreateTeamPopOver = PopOver(CreateTeam, CreateTeamButton)
  return (
    <div>
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
        {props.teams && props.teams.map(({ id, name }) => {
          return (
            <Button
              bold
              id={id}
              key={id}
              name={name}
              active={props.activeComponent === name}
              onClick={el => props.toggleComponents(el)}
            >
              <Icon grey className="fa fa-users" active={props.activeComponent === name} />
              {name}
            </Button>
          )
        })
        }
        <CreateTeamPopOver {...props} />
      </Wrapper>
    </div>
  )
}

export default LeftSidebar
