import { createStore, compose, applyMiddleware, Action } from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'
import api from '@/services'

import reducer, { AppState } from '@/store/reducer'
import { setCookie, deleteCookie } from '@/utils/cookie'

import * as actionTypes from './constants'
import { LoginForm } from './typings'

const { login: loginRequest } = api

export const Login = (
  data: LoginForm
): ThunkAction<void, AppState, null, Action<string>> => async (dispatch) => {
  try {
    const res = await loginRequest(data)
    setCookie('token', res.token)
    localStorage.setItem('token', res.token)
    localStorage.setItem('userInfo', JSON.stringify(res))
    dispatch({
      type: actionTypes.LOG_IN,
      data: res,
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const LogOut = (): ThunkAction<
  void,
  AppState,
  null,
  Action<string>
> => async (dispatch) => {
  try {
    deleteCookie('token')
    localStorage.removeItem('token')
    dispatch({
      type: actionTypes.LOG_OUT,
    })
  } catch (error) {
    throw new Error(error)
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default store
