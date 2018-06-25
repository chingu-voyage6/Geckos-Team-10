import React, { Fragment } from 'react'
import styled from 'styled-components'
import Tasks from '../../dummyData'
import List from './components/List/List'
import { Toolbar } from '../Components'
import { Auth } from '../../services/Services'

const auth = new Auth()

const { isAuthenticated } = auth

const ListContainer = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: flex-start;
  background-color: #7a88b9;
`

const BoardContainer = styled.div`
  display: flex;
  position: relative;
  flex-grow: 1;
  height: 100vh;
`

const Board = () =>
  (isAuthenticated() &&
    <Fragment>
      <Toolbar />
      <BoardContainer>
        <ListContainer>
          {Tasks.map(task => {
            return (
              <List task={task} />
            )
          })}
        </ListContainer>
      </BoardContainer>
    </Fragment>
  )

export default Board
