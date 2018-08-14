import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import 'array.prototype.move'
import List from './components/List/List'
import BoardProvider from './BoardProvider'
import Modal from './components/Modal/Modal'
import { Button } from '../StyledComponents'
import {
  BoardContainer,
  CreateListButton,
  CreateListFormContainer,
  CreateListActions,
  TextArea
} from './Board.styles'

const addToListCards = gql`
  mutation($CardId: ID!, $ListId: ID!) {
    addToListCards(cardsCardId: $CardId, listListId: $ListId ) {
      listList {
        cards {
          id
          task
        }
      }
    }
  }
  `

const updateListPos = gql`
mutation($id: ID!, $NewPos: Int!) {
  updateList(id: $id, order: $NewPos) {
    id
    listTitle
    order
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
      cards {
        id,
        task,
        order
      }
    }
  }
`

const updateCardPos = gql`
mutation($id: ID!, $ListId: ID!, $NewPos: Int!) {
  updateCard(id: $id, listId: $ListId, order: $NewPos) {
    id
    task
    order
  }
}
`

const boardQuery = gql`
query board($id: ID){
  Board(id: $id) {
    id
    title
    lists(orderBy: order_ASC) {
      id
      listTitle
      cards(orderBy: order_ASC) {
        id
        desc
        dueDate
        task
        order
        labels
        author {
          id
          name
          nickname
        }
        list {
          id
          listTitle
        }
      }
    }
  }
}
`

class Board extends Component {
  state = {
    lists: [],
    showAddList: false,
    newListTitle: '',
    cardsRemovedId: []
  }

  componentDidMount = () => {
    const { boardId } = this.props.match.params
    this.getBoardById(boardId)
  }

  componentWillReceiveProps = nextState => {
    const { boardId } = nextState.match.params
    this.getBoardById(boardId)
  }

  onCreateNewList = async () => {
    // if(e.key && e.key !== 'Enter') return
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
        update: (store, { data: { createList } }) => {
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: boardQuery,
            variables: { id: this.props.match.params.boardId },
            fetchPolicy: 'network-only'
          })
          // Add our comment from the mutation to the end.
          data.Board.lists.map((list, index) => { // eslint-disable-next-line
            const res = data.Board.lists[index].cards = list.cards.filter(card => {
              if (card.id) {
                return !this.state.cardsRemovedId.includes(card.id)
              }
              return false
            })
            return res
          })
          data.Board.lists.push(createList)
          // Write our data back to the cache.
          store.writeQuery({ query: boardQuery, data })
          this.setState({
            showAddList: false,
            newListTitle: '',
            lists: data.Board.lists,
            cards: []
          })
        }
      })
    } catch (err) {
      console.log('err::', err)
    }
  }

  onDragEnd = result => {
    const { lists } = this.state

    const listsCopy = [...lists]

    if (!result.destination) return

    if (result.type === 'CARD') {
      // helpers
      const destId = result.destination.droppableId
      const sourceId = result.source.droppableId

      const sourceList = listsCopy.find(({ id }) => id === sourceId)
      const destList = listsCopy.find(({ id }) => id === destId)

      const sourceListIndex = listsCopy.indexOf(sourceList)
      const destListIndex = listsCopy.indexOf(destList)

      const sourceListCard = sourceList.cards[result.source.index]

      const oldPos = result.source.index
      const newPos = result.destination.index

      const cardsCopy = [...sourceList.cards]
      const destCardsCopy = [...destList.cards]

      const listCopy = (list, cards) => {
        return { id: list.id, listTitle: list.listTitle, cards }
      }

      if (destId !== sourceId) {
        // 1) DELETE card from source list
        cardsCopy.splice(result.source.index, 1)

        // 2) ADD card to destination list
        destCardsCopy.splice(result.destination.index, 0, sourceListCard)

        // 3) REPLACE destination list with updated one
        listsCopy.splice(destListIndex, 1, listCopy(destList, destCardsCopy))
      } else {
        // MOVE card within source list
        cardsCopy.move(oldPos, newPos)
      }

      // REPLACE source list with updated one
      listsCopy.splice(sourceListIndex, 1, listCopy(sourceList, cardsCopy))

      this.setState({ lists: listsCopy })

      // ==== DATABASE OPERATIONS =====

      if (destId !== sourceId) {
        // moves the card to the new list in our dB
        this.moveCardToNewList(result.draggableId, destId, sourceId, oldPos, newPos)
        // sends a request to our backend to save the order of our cards
        this.updateCardPos(destCardsCopy, destId)
      } else {
        this.updateCardPos(cardsCopy, sourceId)
      }
    } else {
      listsCopy.move(result.source.index, result.destination.index)

      this.setState({ lists: listsCopy })

      this.updateListPos(listsCopy)
    }
  }

  setBoardState(newState, callback) {
    this.setState(newState, () => {
      if (this.props.debug) {
        console.log('setAppState', JSON.stringify(this.state))
      }
      if (callback) callback()
    })
  }

  getBoardById = async id => {
    try {
      const { data: { Board: MainBoard } } = await this.props.client.query({
        query: boardQuery,
        variables: { id }
      })
      if (MainBoard) {
        const { lists } = MainBoard

        this.setState({
          lists,
          cards: lists.map(({ cards }, index) => {
            return {
              listId: lists[index].id,
              listCards: cards || []
            }
          })
        })
      }
    } catch (err) {
      console.log('err::', err)
    }
  }

  moveCardToNewList = async (CardId, ListId, sourceListId, sourceIndex, destIndex) => {
    try {
      await this.props.client.mutate({
        mutation: addToListCards,
        variables: { CardId, ListId },
        update: store => {
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: boardQuery,
            variables: { id: this.props.match.params.boardId },
            fetchPolicy: 'network-only'
          })

          const { lists } = data.Board

          const sourceList = lists.find(list => list.id === sourceListId)
          const destList = lists.find(list => list.id === ListId)
          const cardToMove = sourceList.cards[sourceIndex]

          // 1) DELETE card from source list
          sourceList.cards.splice(sourceIndex, 1)

          // 2) ADD card to destination list
          destList.cards.splice(destIndex, 0, cardToMove)

          // console.log(data.Board.lists.map(({ cards }) => cards.map(card => card)))
          store.writeQuery({ query: boardQuery, data })
        }
      })
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

  updateCardPos = (cards, ListId) => {
    const batch = []

    cards.forEach((card, NewPos) => {
      const { id } = card
      batch.push(this.props.client.mutate({
        mutation: updateCardPos,
        variables: { id, ListId, NewPos }
      }).catch(err => {
        console.log('err::', err)
      })
      )
    })
    return Promise.resolve(batch)
  }

  updateListPos = lists => {
    const batch = []
    lists.forEach(({ id }, NewPos) => {
      batch.push(this.props.client.mutate({
        mutation: updateListPos,
        variables: { id, NewPos }
      }).catch(err => {
        console.log('err::', err)
      })
      )
    })
    return Promise.resolve(batch)
  }

  changeListsState = lists => {
    this.setState({ lists })
  }

  cardsRemoved = id => {
    const cardsRemoved = [
      ...this.state.cardsRemovedId,
      id
    ]
    this.setState({ cardsRemovedId: cardsRemoved })
  }

  render() {
    const { lists, showAddList } = this.state
    const { boardId } = this.props.match.params

    const getListStyle = isDraggingOver => ({
      background: isDraggingOver ? 'lightblue' : '#7a88b9',
      position: 'absolute',
      alignItems: 'flex-start',
      display: 'flex',
      overflow: 'auto',
      bottom: 0,
      right: 0,
      left: 0,
      top: 0,
    })

    return (
      <BoardProvider>
        <Modal lists={this.state} changeListsState={this.changeListsState} cardsRemoved={this.cardsRemoved} />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <BoardContainer>
            <Droppable droppableId={boardId} type="COLUMN" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  {lists.map(({ id, listTitle, cards }, index) => {
                    return (
                      <Draggable draggableId={id} index={index} key={id}>
                        {providedDraggable => (
                          <div
                            ref={providedDraggable.innerRef}
                            {...providedDraggable.draggableProps}
                            {...providedDraggable.dragHandleProps}
                          >
                            <List
                              listTitle={listTitle}
                              index={index}
                              cards={cards}
                              listId={id}
                              lists={lists}
                              key={id}
                              changeListsState={this.changeListsState}
                            />
                          </div>
                        )}
                      </Draggable>
                    )
                  })}
                  {provided.placeholder}
                  {showAddList
                    ? (
                      <CreateListFormContainer>
                        <TextArea
                          onChange={e => this.handleTextArea(e.target.value)}
                          onKeyPress={e => e.key === 'Enter' && this.onCreateNewList(e)}
                        />
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
                </div>
              )}
            </Droppable>
          </BoardContainer>
        </DragDropContext>
      </BoardProvider>
    )
  }
}

export default withApollo(Board)
