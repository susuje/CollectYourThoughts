import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import GlobalStyled from './styles/GlobalStyle.tsx'
import GlobalFont from './styles/GlobalFont.tsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store.ts'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyled />
        <GlobalFont />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
