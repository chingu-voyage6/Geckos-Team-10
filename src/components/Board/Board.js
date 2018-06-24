import React from 'react'
import List from './components/List/List'
import { Toolbar } from '../Components'
import { Auth } from '../../services/Services'

const auth = new Auth()

const { isAuthenticated } = auth

const Board = () =>
  (isAuthenticated() &&
    <div>
      <Toolbar />
      <h1>Project Board</h1>
      <List />
    </div>
  )

export default Board
