import { AxiosRequestConfig } from 'axios'
import apiList from './api'

export interface APILIst {
  [key: string]: string
}

export type QueryMethod = 'GET' | 'POST' | 'DELETE' | 'PUT'
export type ParamsArray = [QueryMethod, string] | [string]
export interface QueryData {
  [key: string]: unknown
}

interface GetParams {
  url: string
  method: QueryMethod
  params?: QueryData
}

interface OtherParams {
  url: string
  method: QueryMethod
  data?: QueryData
}

export type QueryParams = GetParams | OtherParams

export type APIFunctionType = {
  [K in keyof typeof apiList]: (data?: any, options?: AxiosRequestConfig) => any
}
