const express = require('express')
const checkJwt = require('../services/auth')

const db = require('../services/graphcool')

const router = express.Router()

// This route doesn't need authentication
router.get('/public', (req, res) => {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  })
})

// Notice that we included our checkJwt middleware for our request
router.post('/private', checkJwt, (req, res) => {
  const userId = req.body.user_id
  console.log(userId)
  db.getUserId({ UserId: userId })
    .then(data => {
      // retrieve user id from database
      console.log(data)
    }).catch(err => {
      console.log(err)
    })

  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  })
})

module.exports = router
