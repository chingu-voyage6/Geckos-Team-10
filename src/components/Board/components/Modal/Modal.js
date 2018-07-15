import React, { Component } from 'react'
import ReactModal from 'react-modal'
import DatePicker from 'react-datepicker'
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
    $id: ID!, $attachments: [String!], $labels: [String!], $desc: String, $listId: ID, $task: String
    ) {
    updateCard(
      id: $id,
      listId: $listId,
      attachments: $attachments,
      labels: $labels,
      desc: $desc,
      task: $task
    ) {
      id
    }
  }
`

class Modal extends Component {
  state = {
    cardTitle: '',
    showTitleInput: false,
    descriptionValue: '',
    lists: [],
    labelTags: this.props.card.labels || [],
    loadTagMenu: false,
    newTagValue: '',
    startDueDate: moment(this.props.card.dueDate) || moment()
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

    try {
      await this.props.client.mutate({
        mutation: updateCardMutation,
        variables: {
          id,
          attachments,
          labels: !this.state.labelTags ? labels : this.state.labelTags,
          task: !this.state.cardTitle ? task : this.state.cardTitle,
          desc: !this.state.descriptionValue ? desc : this.state.descriptionValue
        },
        refetchQueries: [{
          query: boardQuery
        }]
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
        variables: { id: 'cjj7smzwg8eco0149e347lcq0' }
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

    try {
      await this.props.client.mutate({
        mutation: updateCardMutation,
        variables: {
          id,
          attachments,
          listId,
          labels: !this.state.labelTags ? labels : this.state.labelTags,
          task: !this.state.cardTitle ? task : this.state.cardTitle,
          desc: !this.state.descriptionValue ? desc : this.state.descriptionValue
        },
        refetchQueries: [{
          query: boardQuery
        }]
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
        refetchQueries: [{
          query: boardQuery
        }]
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
              value={cardTitle || card.task}
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
              value={descriptionValue || card.desc}
              onChange={e => this.onChangeDescription(e.target.value)}
            />
            <Label notPointer fontSize="15px" >
              Add a commentary
            </Label>
            <TextArea />
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
              onChange={() => console.log('ll')}
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

class ModalQueryWrapper extends Component {
  render() {
    const { cardSelected } = this.props
    return (
      <Query query={cardQuery} variables={{ id: cardSelected }}>
        {({ loading, data: { Card } }) => {
          return (
            !loading && Card && (
              <ModalWithApollo
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
