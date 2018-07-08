import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
// import { boardQuery } from '../../graphql/queries'
import List from './components/List/List'
import { Auth } from '../../services/Services'
import BoardProvider from './BoardProvider'
import Modal from './components/Modal/Modal'

const auth = new Auth()

const { isAuthenticated } = auth

const boardQuery = gql`
  {
    Board(id: "cjj7smzwg8eco0149e347lcq0") {
      id
      title
      lists {
        id
        listTitle
        cards {
          id
          desc
          author {
            id
            name
            nickname
          }
        }
      }
    }
  }
`

const ListContainer = styled.div`
  overflow-x: auto;
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
      <Modal />
      <BoardContainer>
        <ListContainer>
          <Query query={boardQuery} >
            {({ loading, data: { Board: MainBoard } }) => {
              return (
                !loading && MainBoard.lists.map(({ id, listTitle, cards }) => {
                  return (
                    <List listTitle={listTitle} cards={cards} key={id} />
                  )
                })
              )
            }}
          </Query>
        </ListContainer>
      </BoardContainer>
    </BoardProvider>
  )

export default Board
