import React,{Component} from 'react'
import './ProfileHeader.css'

const ProfileHeader=(props)=>(
  <div className='ph'>
     <h2>My Sample Profile Header</h2>
      <p><button className='btn'>Edit Profile</button></p>
     <nav className='myNav'>
      <ul className='group'>
        <li><a href="#">Profile</a></li>
         <li><a href="#">Settings</a></li>
      </ul>
     </nav>
  </div>
)

export default ProfileHeader
