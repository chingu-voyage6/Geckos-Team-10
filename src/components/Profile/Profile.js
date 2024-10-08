import React from 'react'
import { Auth } from '../../services'

const auth = new Auth()

const { isAuthenticated } = auth

const Profile = () => (
  isAuthenticated() &&
  <div>
    <h1>Profile</h1>
  </div>
)

export default Profile
