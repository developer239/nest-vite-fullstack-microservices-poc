import { ApolloProvider } from '@apollo/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from 'src/App'
import { client } from 'src/modules/core/clients/apolloClient'

import 'ui-library/dist/style.css'
import './index.css'

const $root = document.getElementById('root')!

ReactDOM.createRoot($root).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
)
