const jwt = require('express-jwt')
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
  audience: 'cSlJoIh8NZT9AdOdPm8GFwJjW42Y07PX',
  issuer: 'https://geckos-team-10.auth0.com/',
  algorithms: ['RS256']
})

module.exports = checkJwt
