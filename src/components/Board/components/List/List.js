import React, { Component } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import moment from 'moment'
import { withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import ListContainer from './List.styles'
import BoardProvider from '../../BoardProvider'
import { CardTask, ListHeader, ListFooter, ListMenu } from './components'

const TextArea = styled.textarea`
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  min-height: 50px;
  border: none;
  border-radius: 5px;
  resize: none;
  outline: none;
  margin: 2px;
`

const boardQuery = gql`
  query board($id: ID){
    Board(id: $id) {
      id
      title
      lists (orderBy: order_ASC) {
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
        }
      }
    }
  }
`

const createCardTaskMutation = gql`
  mutation createCard(
    $attachments: [String!],
    $labels: [String!],
    $order: Int!,
    $task: String!,
    $authorId: ID,
    $listId: ID
  ) {
    createCard(
      attachments: $attachments,
      labels: $labels,
      order: $order,
      task: $task,
      authorId: $authorId,
      listId: $listId
    ) {
      id
      task
      desc
      order
      labels
      list {
        id
        listTitle
        order
      }
      dueDate
      author {
        id
      }
    }
  }
`

const deleteListMutation = gql`
  mutation deleteList(
    $id: ID!
  ) {
    deleteList(
      id: $id
    ) {
      id
    }
  }
`

class List extends Component {
  state = {
    addingCard: false,
    newCardValue: '',
    showListMenu: false
  }

  onAddCard = () => {
    this.setState({ addingCard: true, showListMenu: false })
  }

  onSaveCard = async () => {
    if (!this.state.newCardValue) return

    try {
      await this.props.client.mutate({
        mutation: createCardTaskMutation,
        variables: {
          attachments: [],
          labels: [],
          order: 1,
          task: this.state.newCardValue,
          authorId: localStorage.getItem('grapUserId'),
          listId: this.props.listId
        },
        update: (store, { data: { createCard } }) => {
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: boardQuery,
            variables: { id: this.props.match.params.boardId },
            fetchPolicy: 'network-only'
          })
          const selectedListId = data.Board.lists.filter(list => {
            return list.id === this.props.listId
          })
          selectedListId[0].cards.push(createCard)

          store.writeQuery({ query: boardQuery, data })
          this.props.changeListsState(data.Board.lists)
        }
      })
      this.setState({ addingCard: false, newCardValue: '' })
    } catch (err) {
      console.log('err::', err)
    }
  }

  onRemoveList = async () => {
    try {
      await this.props.client.mutate({
        mutation: deleteListMutation,
        variables: {
          id: this.props.listId
        },
        update: store => {
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: boardQuery,
            variables: { id: this.props.match.params.boardId },
            fetchPolicy: 'network-only'
          })
          // Add our comment from the mutation to the end.
          const stateList = this.props.lists.filter(list => {
            return list.id !== this.props.listId
          }) // eslint-disable-next-line
          const newData = data.Board.lists = stateList
          data.Board.lists = newData
          // Write our data back to the cache.
          store.writeQuery({ query: boardQuery, data })

          this.props.changeListsState(newData)
        }
      })
    } catch (err) {
      console.log('err::', err)
    }
  }

  onCancelCard = () => {
    this.setState({ addingCard: false, newCardValue: '' })
  }

  newCard = e => {
    this.setState({ newCardValue: e.target.value })
  }

  handleOption = () => {
    this.setState({ showListMenu: !this.state.showListMenu })
  }

  handleTextAreaBlur = () => {
    this.setState({ addingCard: false, newCardValue: '' })
  }

  handleListMenuBlur = () => {
    this.setState({ showListMenu: false, })
  }

  render() {
    const { addingCard, showListMenu } = this.state
    const { cards, listTitle, listId } = this.props

    return (
      <ListContainer >
        <Droppable droppableId={listId} type="CARD">
          {provided => (
            <div
              ref={provided.innerRef}
              // style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
              {...provided.droppableProps}
            >
              <ListHeader listTitle={listTitle} displayOption={this.handleOption} />
              {cards && cards.map(({
                id, author, task, dueDate, order
              }, index) => {
                const newAuthor = !author ? {} : author
                return (
                  <Draggable draggableId={id} key={id} index={index}>
                    {providedDraggable => (
                      <div
                        ref={providedDraggable.innerRef}
                        {...providedDraggable.draggableProps}
                        {...providedDraggable.dragHandleProps}
                      >
                        <CardTask
                          onCardClick={() => this.props.onShowModal(id)}
                          key={id}
                          order={order}
                          dueDate={dueDate && moment(dueDate, 'YYYY-MM-DD HH:mm Z').format('DD/MM/YYYY')}
                          member={newAuthor.nickname}
                          task={task}
                        />
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {showListMenu && <ListMenu onAddCard={this.onAddCard} onRemoveList={this.onRemoveList} />}
              {addingCard && (
                <TextArea
                  onChange={e => this.newCard(e)}
                />
              )}
              <ListFooter
                onAddCard={this.onAddCard}
                onSaveCard={this.onSaveCard}
                onCancelCard={this.onCancelCard}
                addingCard={addingCard}
              />
            </div>
          )}
        </Droppable>
      </ListContainer>
    )
  }
}

const ListWithApollo = withApollo(List)
const ListWithRouter = withRouter(ListWithApollo)

export default props => (
  <BoardProvider.Consumer>
    {value => <ListWithRouter {...value} {...props} />}
  </BoardProvider.Consumer>
)
