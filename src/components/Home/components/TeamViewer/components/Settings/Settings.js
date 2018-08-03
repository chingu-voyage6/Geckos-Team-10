import React from 'react'

import { Wrapper } from '../../TeamViewer.styles'
import { PopOver } from '../../../../../Components'
import { DeleteButton, DeleteTeam } from '../index'

const Settings = props => {
  const DeleteTeamPopOver = PopOver(DeleteTeam, DeleteButton)
  return (
    <Wrapper>
      <div>
        <span>Team Settings</span>
      </div>
      <br />
      <DeleteTeamPopOver {...props} />
    </Wrapper>
  )
}

export default Settings
