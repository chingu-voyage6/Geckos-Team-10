import React, { Component } from 'react'
import Color from 'color'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import 'array.prototype.move'
// import { boardQuery } from '../../graphql/queries'
import List from './components/List/List'
import { Auth } from '../../services'
import { BoardContainer, BackgroundFilter } from './Board.styles'
import BoardProvider from './BoardProvider'
import Modal from './components/Modal/Modal'

const auth = new Auth()

const { isAuthenticated } = auth


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
    background
    lists(orderBy: order_ASC) {
      id
      listTitle
      cards(orderBy: order_ASC) {
        id
        desc
        dueDate
        task
        order
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
    boardId: '',
    lists: [],
  }

  componentDidMount = () => {
    const { boardId } = this.props.match.params
    this.props.setBackground(boardId)
    this.getBoardById(boardId)
  }

  componentWillReceiveProps = nextState => {
    if (this.props.match.params.boardId !== nextState.match.params.boardId) {
      this.getBoardById(nextState.match.params.boardId)
    }
    console.log(nextState)
  }

  componentWillUnmount = () => {
    this.props.setBackground()
  }

  onDragEnd = result => {
    const { lists } = this.state

    const listsCopy = [...lists]

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
        this.moveCardToNewList(result.draggableId, destId)
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
        const { lists, background } = MainBoard

        this.setState({
          lists,
          background,
          cards: lists.map(({ cards }, index) => {
            return {
              listId: lists[index].id,
              listCards: cards || []
            }
          })
        })

        // this.props.setBackground(id)
      }
    } catch (err) {
      console.log('err::', err)
    }
  }

  moveCardToNewList = async (CardId, ListId) => {
    try {
      await this.props.client.mutate({
        mutation: addToListCards,
        variables: { CardId, ListId }
      })
    } catch (err) {
      console.log('err::', err)
    }
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

  render() {
    const { lists } = this.state
    const { background } = this.props
    const { boardId } = this.props.match.params

    let secondary = Color(background)

    if (secondary.isLight()) {
      secondary = secondary.darken(0.08)
    } else {
      secondary = secondary.lighten(0.2)
    }

    // console.log(lighter.hex())

    const getListStyle = () => ({
      // background: isDraggingOver ? 'lightblue' : background,
      position: 'absolute',
      background: secondary.hex(),
      alignItems: 'flex-start',
      display: 'flex',
      overflow: 'auto',
      bottom: 0,
      right: 0,
      left: 0,
      top: 0,
    })

    return (isAuthenticated() &&
      <BoardProvider>
        <Modal lists={this.state} setBoardState={this.setBoardState} />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <BoardContainer background={background}>
            <BackgroundFilter />
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
                            <List listTitle={listTitle} index={index} cards={cards} listId={id} key={id} />
                          </div>
                        )}
                      </Draggable>

                    )
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </BoardContainer>
        </DragDropContext>
      </BoardProvider>
    )
  }
}

const BoardWithApollo = withApollo(Board)

export default BoardWithApollo
