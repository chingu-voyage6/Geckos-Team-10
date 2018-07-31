import React from 'react'

import { Icon } from '../../../../../StyledComponents/index'
import { Button, Wrapper } from '../../TeamViewer.styles'

const Settings = () => {
  return (
    <Wrapper>
      <div>Settings</div>
      <br />
      <Button danger>
        <Icon className="fa fa-times" />Delete This Team
      </Button>
    </Wrapper>
  )
}

export default Settings
