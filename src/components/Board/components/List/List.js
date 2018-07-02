import React, { Component } from 'react'
import styled from 'styled-components'
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

class List extends Component {
  state = {
    addingCard: false,
    newCardValue: '',
    showListMenu: false
  }

  onAddCard = () => {
    this.setState({ addingCard: true, showListMenu: false })
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
    const { listTitle, cards } = this.props.task
    return (
      <ListContainer onBlur={this.handleListMenuBlur}>
        <ListHeader listTitle={listTitle} displayOption={this.handleOption} />
        {cards.map(({ content, dueDate, member }) => {
          return (
            <CardTask key={content} content={content} dueDate={dueDate} member={member} />
          )
        })}
        {showListMenu && <ListMenu onAddCard={this.onAddCard} />}
        {addingCard && (
          <TextArea
            autoFocus
            onBlur={this.handleTextAreaBlur}
            onChange={e => this.newCard(e)}
          />
        )}
        <ListFooter
          onFocus={this.handleFocus}
          onAddCard={this.onAddCard}
          onSaveCard={this.onSaveCard}
          onCancelCard={this.onCancelCard}
          addingCard={addingCard}
        />
      </ListContainer>
    )
  }
}

export default props => (
  <BoardProvider.Consumer>
    {value => <List {...value} {...props} />}
  </BoardProvider.Consumer>
)
