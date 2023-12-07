import axios from 'axios'
import errorHandle from './errorHandle'

// Project相關的 api
const videoTypeRequest = axios.create({
  baseURL: 'http://localhost/video/'
})

// Project相關的 api
export const getVideoTypeList = () => videoTypeRequest.get('/videotype')
export const createVideoType = (data) => videoTypeRequest.post('/videotype', data)
export const updateVideoType = (typeId, data) => videoTypeRequest.put(`/videotype/${typeId}`, data)

// 請求攔截
videoTypeRequest.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 請求攔截
videoTypeRequest.interceptors.response.use(
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
