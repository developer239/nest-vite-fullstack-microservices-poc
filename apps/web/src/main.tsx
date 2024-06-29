import { ApolloProvider } from '@apollo/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { client } from './modules/core/clients/apolloClient'

import 'ui-library/dist/style.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)