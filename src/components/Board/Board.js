import React from 'react'
import { Auth } from '../../services/Services'

const auth = new Auth()

const { isAuthenticated } = auth

const Board = () =>
  (isAuthenticated() &&
    <div>
      <h1>Project Board</h1>
    </div>
  )

export default Board
