import React from 'react'
import ReactDOM from 'react-dom'
import 'react-datepicker/dist/react-datepicker.css'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
// import { BrowserRouter } from 'react-router-dom'
import { InMemoryCache } from 'apollo-cache-inmemory'
import './index.css'
import { App } from './components/Components'
import registerServiceWorker from './registerServiceWorker'


const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjj542qr0121k0102x4zidn4u' })

const middlewareLink = new ApolloLink((operation, forward) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('auth0IdToken')
  const token = localStorage.getItem('user_id')

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null
    }
  })
  return forward(operation)
})

middlewareLink.concat(httpLink)

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()
