import React from 'react'
import styled from 'styled-components'
import Tasks from '../../dummyData'
import List from './components/List/List'
import { Auth } from '../../services/Services'
import BoardProvider from './BoardProvider'

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
    <BoardProvider>
      <BoardContainer>
        <ListContainer>
          {Tasks.map((task, index) => {
            return (
              <List task={task} key={index} />
            )
          })}
        </ListContainer>
      </BoardContainer>
    </BoardProvider>
  )

export default Board
