import { AxiosRequestConfig } from 'axios'
import axios from './axios'
import api from './api'
import {
  QueryMethod,
  ParamsArray,
  QueryData,
  QueryParams,
  APIFunctionType,
} from './types'

const gen = (params: string) => {
  let url: string = params
  let method: QueryMethod = 'GET'

  const paramsArray = params.split(' ') as ParamsArray
  if (paramsArray.length === 2) {
    ;[method, url] = paramsArray
  }

  return (data?: QueryData, options?: AxiosRequestConfig) => {
    const queryParams: QueryParams = {
      url,
      method,
      [method === 'GET' ? 'params' : 'data']: data,
    }

    Object.assign(queryParams, options || {})

    return new Promise((resolve, reject) => {
      axios(queryParams)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })

    // return axios(queryParams)
    //   .then((response) => {
    //     resolve(response)
    //   })
    //   .catch((error) => {
    //     reject(error)
    //   })
  }
}

const APIFunction: APIFunctionType = {} as APIFunctionType

Reflect.ownKeys(api).forEach((key) => {
  APIFunction[key as keyof APIFunctionType] = gen(
    api[key as keyof APIFunctionType]
  )
})

export default APIFunction
