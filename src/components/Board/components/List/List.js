import React from 'react'
import { ListContainer } from './components'
import CardTask from '../CardTask/CardTask'

const tasks = [
  {
    content: 'Example 1'
  },
  {
    content: 'Example 2'
  }
]

const List = () => {
  return (
    <ListContainer>
      {tasks.map(({ content }) => {
        return (
          <CardTask content={content} />
        )
      })}
    </ListContainer>
  )
}

export default List
