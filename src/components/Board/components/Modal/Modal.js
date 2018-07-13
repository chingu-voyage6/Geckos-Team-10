import React, { Component } from 'react'
import ReactModal from 'react-modal'
import { withApollo, Query } from 'react-apollo'
import gql from 'graphql-tag'
import { ModalContainer, ModalColumn, ModalColumnContainer, TextArea } from './Modal.styles'
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
  mutation updateCard($id: ID!, $attachments: [String!], $labels: [String!], $desc: String, $listId: ID) {
    updateCard(
      id: $id,
      listId: $listId,
      attachments: $attachments,
      labels: $labels,
      desc: $desc
    ) {
      id
    }
  }
`

class Modal extends Component {
  state = {
    descriptionValue: '',
    lists: []
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
      id, attachments, labels, desc
    } = this.props.card

    try {
      await this.props.client.mutate({
        mutation: updateCardMutation,
        variables: {
          id,
          attachments,
          labels,
          desc: !this.state.descriptionValue ? desc : this.state.descriptionValue
        },
        refetchQueries: [{
          query: boardQuery
        }]
      })
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
      id, attachments, labels, desc
    } = this.props.card

    try {
      await this.props.client.mutate({
        mutation: updateCardMutation,
        variables: {
          id,
          attachments,
          labels,
          listId,
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

  render() {
    const { onHideModal, showModal, card } = this.props
    return (
      <ReactModal
        ariaHideApp={false}
        isOpen={showModal}
        parentSelector={this.getParent}
        onRequestClose={onHideModal}
        style={{
          content: {
            margin: 'auto',
            maxWidth: '768px'
          }
        }}
      >
        <ModalContainer>
          <Label>
            {card.task}
          </Label>
        </ModalContainer>
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
              value={this.state.descriptionValue || card.desc}
              onChange={e => this.onChangeDescription(e.target.value)}
            />
            <Label notPointer fontSize="15px" >
              Add a commentary
            </Label>
            <TextArea />
          </ModalColumn>
          <ModalColumn>
            <Label notPointer fontSize="15px" >
              Add
            </Label>
            <Button textAlign="left">Team mate</Button>
            <Button textAlign="left">Tags</Button>
            <Button textAlign="left">Deadline</Button>
            <Label notPointer fontSize="15px" >
              Actions
            </Label>
            <Button onClick={() => this.showLists()} textAlign="left">Move</Button>
            {this.state.lists.map(({ id, listTitle }) => {
              return (
                <Button key={id} onClick={() => this.moveCard(id)} >
                  {listTitle}
                </Button>
              )
            })}
            <Button onClick={() => this.removeCard(card.id)} textAlign="left">Remove</Button>
          </ModalColumn>
        </ModalColumnContainer>
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
