import axios from 'axios'
import errorHandle from './errorHandle'

// Project相關的 api
const questionRequest = axios.create({
  baseURL: 'http://localhost/'
})

// Project相關的 api
// export const getQuestion = () => questionRequest.get('/questions')
export const getQuestion = () => {
    return questionRequest({
        url: '/questions',
        method: 'get'
    })
}

export const createQuestion = (data) => questionRequest.post('/question', data)
export const updateQuestion = (id, data) => questionRequest.put(`/question/${id}`, data)

// 請求攔截
questionRequest.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 請求攔截
questionRequest.interceptors.response.use(
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
