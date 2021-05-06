import { combineReducers } from 'redux'
import produce from 'immer'
import * as actionTypes from './constants'
import { StoreState, ActionTypes } from './typings'

const defaultState: StoreState = {
  token: '',
  userInfo: {
    avatar: '',
    email: '',
    is_inner: 1,
    token: '',
    username: '',
  },
}

const common = (
  state: StoreState = defaultState,
  action: ActionTypes
): StoreState =>
  produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.LOG_IN: {
        draft.token = action.data.token
        draft.userInfo = action.data
        break
      }
      case actionTypes.LOG_OUT: {
        draft.token = ''
        draft.userInfo = {
          avatar: '',
          email: '',
          is_inner: 1,
          token: '',
          username: '',
        }
        break
      }
      default:
        break
    }
  })

const rootReducer = combineReducers({
  common,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
