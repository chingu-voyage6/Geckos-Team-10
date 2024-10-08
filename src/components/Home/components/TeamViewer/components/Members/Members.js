import React, { Fragment } from 'react'

import { Title, Icon } from '../../../../../StyledComponents/index'
import { Button, Wrapper } from '../../TeamViewer.styles'
import Row from './Members.styles'

const Members = props => {
  const { users } = props.team
  return (
    <Fragment>
      <Row />
      {
        users && users.map(({ id, name, nickname }) => {
          return (
            <Row key={id}>
              <Wrapper flex align>
                <div>
                  <Title>{name}</Title>
                  <div style={{ color: 'grey' }}>{`@${nickname}`}</div>
                </div>
                {/* this will be referencing the user id in the future instead.
                For now I am checking against the username in localStorage. */}
                {localStorage.getItem('nickname') === nickname ?
                  <Button solid small pull_left>
                    <Icon grey className="fa fa-times" />Leave
                  </Button> :
                  <Button solid small pull_left>
                    <Icon grey className="fa fa-times" />Delete
                  </Button>
                }
              </Wrapper>
            </Row>
          )
        })
      }
    </Fragment>
  )
}

export default Members
