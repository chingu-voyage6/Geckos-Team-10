const { request } = require('graphql-request')

const endpoint = 'https://api.graph.cool/simple/v1/cjj542qr0121k0102x4zidn4u'

const deleteCardMutation = `
  {
    deleteCard(id: $CardId) {
      id
      task
    }
  }
`

const deleteListMutation = `
  {
    deleteList(id: $ListId) {
      id
      listTitle
    }
  }
`

const deleteBoardMutation = `
  {
    deleteBoard(id: $BoardId) {
      id
      title
    }
  }
`
//
// DELETE OPERATIONS
//
// You only need to pass the unique ID of the node you
// want to delete.
//
// Example usage...
//
// const cardID = "cjj8pdoilfduj0123n5zol4tc"
//
// db.deleteCard({ cardID })
//
const deleteCard = cardId => request(endpoint, deleteCardMutation, cardId)
const deleteList = listId => request(endpoint, deleteListMutation, listId)
const deleteBoard = boardId => request(endpoint, deleteBoardMutation, boardId)

const createCardMutation = `
  {
    createCard(task: $Task, desc: $Desc, order: $Order, authorId: $AuthorId, 
      listId: $ListId, boardId: $BoardId ) 
      {
      id
      task
      desc
      author {
        id
        name
        nickname
      }
      list {
        id
        listTitle
        cards {
          id
          task
        }
      }
    }
  }
`

const createListMutation = `
  {
    createList(listTitle: $ListTitle, order: $Order, boardId: $BoardId, authorId: $AuthorId) {
      author {
        id
        name,
        nickname
      }
      board {
        id
        title
        lists {
          id
          listTitle
        }
      }
    }
  }
`

const createBoardMutations = `
  {
    createBoard(title: $Title, background: "grey", authorId: $AuthorId) {
      id,
      title
      author {
        id
        name,
        nickname
      }
    }
  }
`

const userIdQuery = `
  query getUserId($UserId: String!) {
    User(key: $UserId) {
      id
    }
  }
`

const createCard = vars => request(endpoint, createCardMutation, vars)
//
// Passing arguments (Vars) example usage
//
// db.createCard({
//   Task: task,
//   Order: order,
//   Desc: description,
//   AuthorId: authorId,
//   BoardId: boardId,
//   ListId: listId,
// })
//
const createList = vars => request(endpoint, createListMutation, vars)
//
// Example..
//
// db.createList({
//   ListTitle: listTitle,
//   Order: order,
//   BoardId: boardId,
//   AuthorId: authorId,
// })
//
const createBoard = vars => request(endpoint, createBoardMutations, vars)
//
// Example..
//
// db.createBoard({
//   Title: title,
//   AuthorId: authorId,
// })
//
const getUserId = vars => request(endpoint, userIdQuery, vars)
//
// Example..
//
// db.getUserId({ UserId: userId })
//
//
module.exports = {
  getUserId,
  createCard,
  createList,
  createBoard,
  deleteCard,
  deleteList,
  deleteBoard,
}
