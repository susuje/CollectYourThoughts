import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import GlobalStyled from './styles/GlobalStyle.tsx'
import GlobalFont from './styles/GlobalFont.tsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyled />
      <GlobalFont />
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
