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


// const updateCardPos = gql`
//     mutation updateCardsPos($CardId: ID!, $Order: Int!) {
//     updateCard(id: $CardId, order: $Order) {
//       id
//       task
//       order
//     }
//   }
// `

const boardQuery = gql`
  query board($id: ID){
    Board(id: $id) {
      id
      title
      lists {
        id
        listTitle
        cards (orderBy: order_ASC) {
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
              listId: cards[index].list.id,
              listCards: cards
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
      const listsCopy = [...lists]
      const sourceList = listsCopy.find(({ id }) => id === result.source.droppableId)
      const sourceListIndex = listsCopy.indexOf(sourceList)

      const { cards } = sourceList
      const oldPos = result.source.index
      const newPos = result.destination.index

      const cardsCopy = [...cards]

      cardsCopy.move(oldPos, newPos)

      const listCopy = {
        id: sourceList.id, listTitle: sourceList.listTitle, cards: cardsCopy
      }

      listsCopy.splice(sourceListIndex, 1, listCopy)

      this.setState({ lists: listsCopy })
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

  render() {
    const { lists } = this.state
    // console.log(cards)
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
