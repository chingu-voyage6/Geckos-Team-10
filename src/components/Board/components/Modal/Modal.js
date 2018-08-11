import React, { Component } from 'react'
import ReactModal from 'react-modal'
import DatePicker from 'react-datepicker'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import { withApollo, Query } from 'react-apollo'
import gql from 'graphql-tag'
import AddTagMenu from './components/AddTagMenu'
import {
  ModalContainer,
  ModalColumn,
  ModalColumnContainer,
  TextArea,
  Input,
  AddTagContainerMenu
} from './Modal.styles'
import BoardProvider from '../../BoardProvider'
import { Button, Label } from '../../../StyledComponents'

const boardQuery = gql`
  query boardQuery($id: ID) {
    Board(id: $id) {
      id
      title
      lists(orderBy: order_ASC) {
        id
        listTitle
        cards(orderBy: order_ASC) {
          id
          desc
          task
          dueDate
          labels
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

const cardQuery = gql`
  query card($id: ID) {
    Card(id: $id) {
      id
      author {
        id
        name
        nickname
      }
      attachments
      desc
      dueDate
      labels
      order
      task
    }
  }
`

const deleteCardMutation = gql`
  mutation deleteCard($id: ID!) {
    deleteCard(id: $id) {
      id
    }
  }
`

const updateCardMutation = gql`
  mutation updateCard(
    $id: ID!,
    $attachments: [String!],
    $labels: [String!],
    $desc: String,
    $listId: ID,
    $task: String,
    $dueDate: DateTime
    ) {
    updateCard(
      id: $id,
      listId: $listId,
      attachments: $attachments,
      labels: $labels,
      desc: $desc,
      task: $task,
      dueDate: $dueDate
    ) {
      id
      dueDate
      labels
      task
      attachments
    }
  }
`

class Modal extends Component {
  state = {
    cardTitle: this.props.card.task,
    showTitleInput: false,
    descriptionValue: this.props.card.desc || '',
    lists: [],
    labelTags: this.props.card.labels || [],
    loadTagMenu: false,
    newTagValue: '',
    startDueDate: this.props.card.dueDate ? moment(this.props.card.dueDate) : moment()
  }

  onChangeDescription = value => {
    this.setState({ descriptionValue: value })
  }

  getParent = () => {
    ReactModal.setAppElement(document.getElementById('root'))
    return document.querySelector('#root')
  }

  updateCard = async () => {
    const {
      id, attachments, labels, desc, task
    } = this.props.card
    const {
      labelTags, cardTitle, descriptionValue, startDueDate
    } = this.state

    try {
      await this.props.client.mutate({
        mutation: updateCardMutation,
        variables: {
          id,
          attachments,
          labels: !labelTags ? labels : labelTags,
          task: !cardTitle ? task : cardTitle,
          desc: !descriptionValue ? desc : descriptionValue,
          dueDate: moment(startDueDate, 'YYYY-MM-DD HH:mm Z')
        },
        update: (store, { data: { updateCard } }) => {
          const data = store.readQuery({
            query: boardQuery,
            variables: { id: this.props.match.params.boardId },
            fetchPolicy: 'network-only'
          })
          data.Board.lists.map((list, index) => {
            const toUpdate = list.cards.find((card, i) => {
              if (card.id === updateCard.id) { // eslint-disable-next-line
                const res = data.Board.lists[index].cards[i] = updateCard
                return res
              }
              return null
            })
            return toUpdate
          })

          this.props.changeListsState(data.Board.lists)
        }
      })
      this.setState({ showTitleInput: false, cardTitle: '' })
      this.props.onHideModal()
    } catch (err) {
      console.log('err::', err)
    }
  }

  showLists = async () => {
    if (this.state.lists.length > 0) {
      return this.setState({ lists: [] })
    }

    try {
      const { data: { Board } } = await this.props.client.query({
        query: boardQuery,
        variables: { id: this.props.match.params.boardId }
      })
      if (Board) {
        this.setState({ lists: Board.lists })
      }
    } catch (err) {
      console.log('err::', err)
    }
  }

  moveCard = async listId => {
    const {
      id, attachments, labels, desc, task
    } = this.props.card
    const {
      labelTags, cardTitle, descriptionValue, startDueDate
    } = this.state

    try {
      await this.props.client.mutate({
        mutation: updateCardMutation,
        variables: {
          id,
          attachments,
          listId,
          labels: !labelTags ? labels : labelTags,
          task: !cardTitle ? task : cardTitle,
          desc: !descriptionValue ? desc : descriptionValue,
          dueDate: startDueDate
        },
        update: (store, { data: { updateCard } }) => {
          const data = store.readQuery({
            query: boardQuery,
            variables: { id: this.props.match.params.boardId },
            fetchPolicy: 'network-only'
          })
          data.Board.lists.map((list, index) => { // eslint-disable-next-line
            const res = data.Board.lists[index].cards = list.cards.filter(card => card.id !== updateCard.id)
            return res
          })
          const selectedListId = data.Board.lists.filter(list => list.id === listId)
          selectedListId[0].cards.push(updateCard)

          this.props.changeListsState(data.Board.lists)
        }
      })
      this.setState({ lists: [] })
      this.props.onHideModal()
    } catch (err) {
      console.log('err::', err)
    }
  }

  removeCard = async id => {
    try {
      await this.props.client.mutate({
        mutation: deleteCardMutation,
        variables: { id },
        update: store => {
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: boardQuery,
            variables: { id: this.props.match.params.boardId },
            fetchPolicy: 'network-only'
          })
          data.Board.lists.map((list, index) => { // eslint-disable-next-line
            const res = data.Board.lists[index].cards = list.cards.filter(card => card.id !== id)
            return res
          })
          this.props.changeListsState(data.Board.lists)
        }
      })
      this.props.onHideModal()
    } catch (err) {
      console.log('err::', err)
    }
  }

  showTitleInput = () => {
    this.setState({ cardTitle: this.props.card.task, showTitleInput: true })
  }

  removeTag = index => {
    const newTags = [
      ...this.state.labelTags
    ]
    newTags.splice(index, 1)
    this.setState({ labelTags: newTags })
  }

  render() {
    const { onHideModal, showModal, card } = this.props
    const {
      loadTagMenu, cardTitle, showTitleInput, descriptionValue, labelTags, newTagValue, lists, startDueDate
    } = this.state

    return (
      <ReactModal
        ariaHideApp={false}
        isOpen={showModal}
        parentSelector={this.getParent}
        onRequestClose={onHideModal}
        style={{
          content: {
            height: '300px',
            minHeight: '300px',
            margin: 'auto',
            maxWidth: '768px'
          }
        }}
      >
        <ModalContainer>
          {
            !showTitleInput
            ? <Label onClick={() => this.showTitleInput()}>{card.task}</Label>
            : <Input
              value={cardTitle}
              onChange={e => this.setState({ cardTitle: e.target.value })}
            />
          }
        </ModalContainer>
        <ModalColumn>
          <Label notPointer fontSize="15px" >
            Tags
          </Label>
          <ModalColumnContainer >
            {labelTags.map((label, index) => {
              return (
                <Button
                  key={index}
                  onClick={() => this.removeTag(index)}
                  color="#fff"
                  backgroundColor="#333384"
                  hoverBackgroundColor="#6666a5"
                  hoverColor="#fff"
                  width="auto"
                  margin={index !== 0 ? '2px' : '2px 2px 2px 0px'}
                >
                  {label}
                </Button>
              )
            })}
            <AddTagContainerMenu>
              <Button
                onClick={() => this.setState({ loadTagMenu: !loadTagMenu })}
                color="#8c8c8c"
                backgroundColor="#e2e4e6;"
                hoverBackgroundColor="#d6dadc"
                hoverColor="#111"
                width="30px"
                margin="2px"
              >
                +
              </Button>
              <AddTagMenu
                loadTagMenu={loadTagMenu}
                onChange={value => this.setState({ newTagValue: value })}
                addTag={() => this.setState({ labelTags: [...labelTags, newTagValue], loadTagMenu: false })}
              />
            </AddTagContainerMenu>
          </ModalColumnContainer>
        </ModalColumn>
        <Button
          onClick={() => onHideModal()}
          position="absolute"
          positionTop="5px"
          positionRight="5px"
          width="50px"
        >
          X
        </Button>
        <ModalColumnContainer>
          <ModalColumn flexGrow="3" >
            <Label notPointer fontSize="15px" >
              Description
            </Label>
            <TextArea
              value={descriptionValue}
              onChange={e => this.onChangeDescription(e.target.value)}
            />
            <Button
              onClick={() => this.updateCard()}
              color="#fff"
              backgroundColor="#5aac44"
              hoverBackgroundColor="#519839"
              hoverColor="#fff"
              width="100px"
            >
              Save
            </Button>
          </ModalColumn>
          <ModalColumn>
            <Label notPointer fontSize="15px" >
              Deadline
            </Label>
            <DatePicker
              selected={startDueDate}
              onChange={e => this.setState({ startDueDate: e })}
              dateFormat="DD/MM/YYYY"
            />
            <Label notPointer fontSize="15px" >
              Actions
            </Label>
            <Button onClick={() => this.showLists()} textAlign="left">Move</Button>
            {lists.map(({ id, listTitle }) => {
              return (
                <Button key={id} onClick={() => this.moveCard(id)} >
                  {listTitle}
                </Button>
              )
            })}
            <Button onClick={() => this.removeCard(card.id)} textAlign="left">Remove</Button>
          </ModalColumn>
        </ModalColumnContainer>
      </ReactModal>
    )
  }
}

const ModalWithApollo = withApollo(Modal)
const ModalWithRouter = withRouter(ModalWithApollo)

class ModalQueryWrapper extends Component {
  render() {
    const { cardSelected } = this.props
    return (
      <Query query={cardQuery} variables={{ id: cardSelected }}>
        {({ loading, data: { Card } }) => {
          return (
            !loading && Card && (
              <ModalWithRouter
                {...this.props}
                card={Card}
              />
            )
          )
        }}
      </Query>
    )
  }
}

export default props => (
  <BoardProvider.Consumer>
    {value => <ModalQueryWrapper {...value} {...props} />}
  </BoardProvider.Consumer>
)
