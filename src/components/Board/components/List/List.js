import React, { Component } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import moment from 'moment'
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
    const { cards, listTitle } = this.props
    return (
      <ListContainer >
        <Droppable droppableId="droppable">
          {provided => (
            <div
              ref={provided.innerRef}
              // style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
              {...provided.droppableProps}
            >
              <ListHeader listTitle={listTitle} displayOption={this.handleOption} />
              {cards.map(({
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
              {showListMenu && <ListMenu onAddCard={this.onAddCard} />}
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

export default props => (
  <BoardProvider.Consumer>
    {value => <List {...value} {...props} />}
  </BoardProvider.Consumer>
)
