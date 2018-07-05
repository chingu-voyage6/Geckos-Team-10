const { request } = require('graphql-request')

const endpoint = 'https://api.graph.cool/simple/v1/cjj542qr0121k0102x4zidn4u'

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
}
