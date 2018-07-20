import React, { Component } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import 'array.prototype.move'
// import { boardQuery } from '../../graphql/queries'
import List from './components/List/List'
import { Auth } from '../../services/Services'
import { BoardContainer, ListContainer } from './Board.styles'
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
    lists {
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
    lists: []
  }

  componentDidMount = async () => {
    try {
      const { data: { Board: MainBoard } } = await this.props.client.query({
        query: boardQuery,
        variables: { id: this.props.match.params.boardId }
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

  onDragEnd = result => {
    const { lists } = this.state
    if (result.type === 'CARD') {
      // helpers
      const destId = result.destination.droppableId
      const sourceId = result.source.droppableId

      const listsCopy = [...lists]
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
        this.moveCardToNewList(result.draggableId, destId).then(() => {
          // sends a request to our backend to save the order of our cards
          this.updateCardPos(destCardsCopy, destId)
        })
      } else {
        this.updateCardPos(cardsCopy, sourceId)
      }
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

  render() {
    const { lists } = this.state
    return (isAuthenticated() &&
      <BoardProvider>
        <Modal lists={this.state} setBoardState={this.setBoardState} />
        <BoardContainer>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <ListContainer>
              {lists.map(({ id, listTitle, cards }) => {
                return (
                  <List listTitle={listTitle} cards={cards} listId={id} key={id} />
                )
              })}
            </ListContainer>
          </DragDropContext>
        </BoardContainer>
      </BoardProvider>
    )
  }
}

const BoardWithApollo = withApollo(Board)

export default BoardWithApollo
