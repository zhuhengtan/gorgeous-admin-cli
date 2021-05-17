import { message } from 'antd'
import api from '@/services'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '@/store/reducer'
import * as actionTypes from './constants'
import {} from './typings'

// const {} = api

/**
  export const getUsers = (
    data: SearchParams
  ): ThunkAction<void, AppState, null, Action<string>> => async (dispatch) => {
    try {
      const params = {
        name: data.name,
        ...data.pageInfo,
      }
      const res = await getUserListRequest(params)
      dispatch({
        type: actionTypes.GET_USERS,
        data: res,
      })
    } catch (error) {
      throw new Error(error)
    }
  }
*/