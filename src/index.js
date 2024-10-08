import React from 'react'
import ReactDOM from 'react-dom'
import 'react-datepicker/dist/react-datepicker.css'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import './index.css'
import { App } from './components/Components'
import registerServiceWorker from './registerServiceWorker'


const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjj542qr0121k0102x4zidn4u' })

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
