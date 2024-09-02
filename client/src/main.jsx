import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {RouterProvider} from "react-router-dom"
import './index.css'
import router from './router.jsx'

import { Provider } from 'react-redux'
import store from './store.js'
// import DarkModeContextProvider from './context/DarkMode.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>

<Provider store={store}>
  {/* <DarkModeContextProvider> */}
    <RouterProvider  router={router} />
  {/* </DarkModeContextProvider> */}
</Provider>
  // </React.StrictMode>,
)
