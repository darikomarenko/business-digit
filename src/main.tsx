import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'mobx-react';
import clientsStore from './store/ClientStore.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <Provider clientsStore={clientsStore}>
    <App clientsStore={clientsStore} />
    </Provider>
  </React.StrictMode>,
)
