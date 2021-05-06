import { useHistory } from 'react-router-dom'
import axios, { AxiosInstance } from 'axios'
import { message } from 'antd'
import React from 'react'
import { getCookie, deleteCookie } from '@/utils/cookie'
import * as actionTypes from '../store/constants'

const CONFIG = {
  baseURL: process.env.API_HOST || '',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
}

const axiosInstance: AxiosInstance = axios.create(CONFIG)

axiosInstance.interceptors.request.use(
  (config) => {
    if (getCookie('token')) {
      config.headers.authorization = getCookie('token')
    }
    return config
  },
  (error) => {
    throw error
  }
)

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code === 10001 || res.code === 10002) {
      message.success(res.message)
      deleteCookie('token')
      localStorage.removeItem('token')
      window.location.href = '/login'
    } else if (res.code !== 200) {
      message.error(res.message)
      throw new Error(JSON.stringify(res))
    } else if (response.config.method !== 'get') {
      message.success(res.message)
    }
    return res.data
  },
  (error) => {
    const { status } = error.response
    if (status === 401) {
      message.error(error.response.data.message)
      window.location.href = '/login'
    } else if (error.response.code === 10001 || error.response.code === 10002) {
      message.error(error.response.message)
      deleteCookie('token')
      localStorage.removeItem('token')
    } else {
      message.error(error.response.data.message)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
