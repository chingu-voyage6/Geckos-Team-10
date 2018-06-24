import React from 'react'
import { Toolbar } from '../Components'
import { Auth } from '../../services/Services'

const auth = new Auth()

const { isAuthenticated } = auth

const Profile = () => (
  isAuthenticated() &&
  <div>
    <Toolbar />
    <h1>Profile</h1>
  </div>
)

export default Profile
