import React ,{Component} from 'react'
import { Toolbar } from '../Components'
import { Auth } from '../../services/Services'
import ProfileHeader from './ProfileHeader'
import ProfileSettings from './ProfileSettings'
import ActivityFeed from './ActivityFeed'



const auth = new Auth()

const { isAuthenticated } = auth

const Profile = () => (
  isAuthenticated() &&
  <div>
    <Toolbar />
    <ProfileHeader/>
    <ActivityFeed/>
    <ProfileSettings/>


  </div>
)

export default Profile
