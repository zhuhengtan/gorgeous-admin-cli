/*
 * @Date: 2021-03-04 15:31:31
 * @LastEditors: ZHT
 * @LastEditTime: 2021-03-04 16:07:09
 */
import React from 'react'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import routes from './routes'
import store from './store'
import '@/lang/i18n'
import './App.css'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
    </Provider>
  )
}

export default App
