import auth0 from 'auth0-js'

import history from '../services/history'

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'geckos-team-10.auth0.com',
    clientID: 'cSlJoIh8NZT9AdOdPm8GFwJjW42Y07PX',
    redirectUri: 'https://geckos-team-10.herokuapp.com/callback',
    audience: 'https://geckos-team-10.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile'
  });

  login() {
    this.auth0.authorize()
  }

  // parses the result after authentication from URL hash
  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        // console.log(authResult)
        this.setSession(authResult)
        history.replace('/home')
      } else if (err) {
        history.replace('/home')
      }
    })
  }

  // Sets user details in localStorage
  setSession = authResult => {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
    localStorage.setItem('name', authResult.idTokenPayload.name)
    localStorage.setItem('user_id', authResult.idTokenPayload.sub)
    localStorage.setItem('picture', authResult.idTokenPayload.picture)
    localStorage.setItem('nickname', authResult.idTokenPayload.nickname)
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    // navigate to the home route
    history.replace('/home')
  }

  // removes user details from localStorage
  logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('name')
    localStorage.removeItem('user_id')
    localStorage.removeItem('picture')
    localStorage.removeItem('nickname')
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    // navigate to the home route
    history.replace('/callback')
  }

  // checks if the user is authenticated
  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  // return local access token
  accessToken = () => {
    return localStorage.getItem('id_token')
  }
}
