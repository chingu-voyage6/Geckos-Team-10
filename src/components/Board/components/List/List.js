import React, { Component } from 'react'
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
        refetchQueries: [{
          query: boardQuery,
          variables: { id: this.props.match.params.boardId }
        }]
      })
      this.setState({ addingCard: false, newCardValue: '' })
    } catch (err) {
      console.log('err::', err)
    }
  }

  onRemoveCard = async () => {
    try {
      await this.props.client.mutate({
        mutation: deleteListMutation,
        variables: {
          id: this.props.listId
        },
        refetchQueries: [{
          query: boardQuery,
          variables: { id: this.props.match.params.boardId }
        }]
      })
      this.setState({ addingCard: false, newCardValue: '' })
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
    const { cards, listTitle } = this.props

    return (
      <ListContainer >
        <ListHeader listTitle={listTitle} displayOption={this.handleOption} />
        {cards.map(({
          id, author, task, dueDate
        }) => {
          const newAuthor = !author ? {} : author
          return (
            <CardTask
              onCardClick={() => this.props.onShowModal(id)}
              key={id}
              dueDate={dueDate && moment(dueDate, 'YYYY-MM-DD HH:mm Z').format('DD/MM/YYYY')}
              member={newAuthor.nickname}
              task={task}
            />
          )
        })}
        {showListMenu && <ListMenu onAddCard={this.onAddCard} onRemoveCard={this.onRemoveCard} />}
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
