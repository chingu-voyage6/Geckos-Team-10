import React, { Component } from 'react'
import styled from 'styled-components'
import ListContainer from './List.styles'
import { CardTask, ListHeader, ListFooter, Modal } from './components'

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

class List extends Component {
  state = {
    addingCard: false,
    newCardValue: '',
    showModal: false
  }

  onAddCard = () => {
    this.setState({ addingCard: true, showModal: false })
  }

  onSaveCard = () => {
    if (this.state.newCardValue.length === 0) {
      alert('You must type something xD')
    } else {
      alert('New card was created succesfully')
    }
    this.setState({ addingCard: false, newCardValue: '' })
  }

  onCancelCard = () => {
    this.setState({ addingCard: false, newCardValue: '' })
  }

  newCard = e => {
    this.setState({ newCardValue: e.target.value })
  }

  handleOption = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    const { addingCard, showModal } = this.state
    const { listTitle, cards } = this.props.task
    return (
      <ListContainer>
        <ListHeader listTitle={listTitle} displayOption={this.handleOption} />
        {cards.map(({ content, dueDate, member }) => {
          return (
            <CardTask key={content} content={content} dueDate={dueDate} member={member} />
          )
        })}
        {showModal && <Modal onAddCard={this.onAddCard} />}
        {addingCard && <TextArea onChange={e => this.newCard(e)} />}
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

export default List
