import produce from 'immer'
import * as actionTypes from './constants'
import { StoreState, ActionTypes } from './typings'

const defaultState: StoreState = {}

export default (
  state: StoreState = defaultState,
  action: ActionTypes
): StoreState =>
  produce(state, (draft) => {
    switch (action.type) {
      default:
        break
    }
  })
