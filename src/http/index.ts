import { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { AuthStore } from '../stores/Auth'

export const baseURL = 'http://localhost/api'

export const axiosConfig: AxiosRequestConfig = {
  withCredentials: true,
  baseURL
}

export const $api = axios.create(axiosConfig)

$api.interceptors.request.use(config => {
  if (config.headers) config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
  return config
})

$api.interceptors.response.use(undefined, async error => {
  if (error.response?.status === 401) AuthStore.logout()
  throw error
})
