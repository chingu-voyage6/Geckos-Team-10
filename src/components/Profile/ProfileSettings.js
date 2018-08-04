import React from 'react'
import'./ProfileSettings.css'

const ProfileSettings=(props)=>(
  <div className='set'>
  <h2> Account Details</h2>
  <h4>Change name initials or bio</h4>
  <h4>Change Avatar</h4>
  <h4>Set Password</h4>
  <h4>Change email</h4>
  <h4>Change language</h4>
  <h2>Credentials</h2>
  <h4>Dummy Credentials</h4>
  <h6>Add a new email address</h6>
  <h2>Notifications</h2>
  <h4>Change notifiaction email frequency</h4>
  <h4>Allow desktop notifications</h4>
  <h2>Marketing Emails</h2>
  <h4>Optout marketing emails</h4>
  <h2>Accessibility</h2>
  <h4>Enable colorblind friendly mode</h4>
  <h2>Sessions</h2>
  <h6>Logout other sessions</h6>
  <h2>Two Factor Authentication</h2>
  <h4>Configure twofactor authentication</h4>
  </div>
)

export default ProfileSettings
