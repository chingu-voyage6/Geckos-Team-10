const express = require('express')

const router = express.Router()
const jwt = require('express-jwt')
// const jwtAuthz = require('express-jwt-authz')
const jwksRsa = require('jwks-rsa')

// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://geckos-team-10.auth0.com/.well-known/jwks.json'
  }),

  // Validate the audience and the issuer.
  // audience: 'http://localhost:5000/',
  issuer: 'https://geckos-team-10.auth0.com/',
  algorithms: ['RS256']
})

// This route doesn't need authentication
router.get('/public', (req, res) => {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  })
})

// Notice that we included our checkJwt middleware for our request
router.post('/private', checkJwt, (req, res) => {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  })
})

module.exports = router
