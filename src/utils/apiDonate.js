import axios from 'axios'
import errorHandle from './errorHandle'

// Project相關的 api
const donateRequest = axios.create({
  baseURL: 'http://localhost/'
})

// Project相關的 api
export const getDonate = () => donateRequest.get('/donates')
export const createDonate = (data) => donateRequest.post('/donate', data)
export const updateDonate = (id, data) => donateRequest.put(`/donate/${id}`, data)

// 請求攔截
donateRequest.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 請求攔截
donateRequest.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const { response } = error
    console.log(error)
    if (response) {
      // receive the response, but has error
      errorHandle(response.status, error)
      return Promise.reject(error)
    }

    // can not receive response 請求過時或者是斷網
    if (!window.navigator.onLine) {
      /* eslint-disable */
      ElNotification({
        title: 'Error',
        message: `receive response 請求過時或者是斷網`,
        type: 'error',
        duration: 2500
      })
    } else {
      // maybe Program have some problem
      return Promise.reject(error)
    }
  }
)
