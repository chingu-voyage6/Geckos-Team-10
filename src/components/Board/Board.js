import React, { Component } from 'react'
import { Query, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import List from './components/List/List'
import { Auth } from '../../services/Services'
import BoardProvider from './BoardProvider'
import Modal from './components/Modal/Modal'
import { Button } from '../StyledComponents'
import {
  ListContainer,
  BoardContainer,
  CreateListButton,
  CreateListFormContainer,
  CreateListActions,
  TextArea
} from './Board.styles'

const auth = new Auth()

const { isAuthenticated } = auth

const boardQuery = gql`
  query board($id: ID){
    Board(id: $id) {
      id
      title
      lists {
        id
        listTitle
        cards {
          id
          desc
          dueDate
          task
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

const createListMutation = gql`
  mutation createList(
    $listTitle: String!,
    $order: Int!,
    $authorId: ID,
    $boardId: ID,
    $cardsIds: [ID!],
    $cards: [ListcardsCard!]
  ) {
    createList(
      listTitle: $listTitle,
      order: $order,
      authorId: $authorId,
      cardsIds: $cardsIds,
      boardId: $boardId,
      cards: $cards
    ) {
      id
      listTitle
    }
  }
`

class Board extends Component {
  state = {
    showAddList: false,
    newListTitle: ''
  }

  onCreateNewList = async () => {
    if (!this.state.newListTitle) return

    try {
      await this.props.client.mutate({
        mutation: createListMutation,
        variables: {
          listTitle: this.state.newListTitle,
          order: 3,
          authorId: localStorage.getItem('grapUserId'),
          cardsIds: [],
          boardId: this.props.match.params.boardId,
          cards: []
        },
        refetchQueries: [{
          query: boardQuery,
          variables: { id: this.props.match.params.boardId }
        }]
      })
      this.setState({ showAddList: false, newListTitle: '' })
    } catch (err) {
      console.log('err::', err)
    }
  }

  handleShowAddList = () => {
    this.setState(prevState => {
      return { showAddList: !prevState.showAddList, newListTitle: '' }
    })
  }

  handleTextArea = content => {
    this.setState({ newListTitle: content })
  }

  render() {
    const { showAddList } = this.state

    return (
      (isAuthenticated() &&
        <BoardProvider>
          <Modal />
          <BoardContainer>
            <ListContainer>
              <Query query={boardQuery} variables={{ id: this.props.match.params.boardId }}>
                {({ loading, data: { Board: MainBoard } }) => {
                  return (
                    !loading && MainBoard && MainBoard.lists.map(({ id, listTitle, cards }) => {
                      return (
                        <List listId={id} listTitle={listTitle} cards={cards} key={id} />
                      )
                    })
                  )
                }}
              </Query>
              {showAddList
                ? (
                  <CreateListFormContainer>
                    <TextArea onChange={e => this.handleTextArea(e.target.value)} />
                    <CreateListActions>
                      <Button
                        width="50px"
                        onClick={this.onCreateNewList}
                        backgroundColor="#5aac44"
                        hoverBackgroundColor="#519839"
                        color="#fff"
                        hoverColor="#fff"
                        margin="0 5px 0 0"
                      >
                        Save
                      </Button>
                      <Button width="50px" onClick={this.handleShowAddList}>
                        X
                      </Button>
                    </CreateListActions>
                  </CreateListFormContainer>
                )
                : (
                  <CreateListButton>
                    <Button onClick={this.handleShowAddList} >
                      Create new list
                    </Button>
                  </CreateListButton>
                )
              }
            </ListContainer>
          </BoardContainer>
        </BoardProvider>
      )
    )
  }
}

export default withApollo(Board)
