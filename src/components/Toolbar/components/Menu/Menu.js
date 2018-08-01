import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Pill, Header } from './Menu.styles'

const Menu = props => {
  return (
    <Fragment>
      <Header>
        {localStorage.getItem('nickname')}
      </Header>
      <Pill>
        <Link to="/profile">Profile</Link>
      </Pill>
      <Pill>
        <Link to="/home">Home</Link>
      </Pill>
      <Pill>
        <Link to="/board">Board</Link>
      </Pill>
      <Pill>
        <button onClick={props.logout}>Logout</button>
      </Pill>
    </Fragment>
  )
}

export default Menu
