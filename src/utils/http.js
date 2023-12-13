import axios from 'axios'
import errorHandle from './errorHandle'
import { useAuthStore } from "../stores/auth.js";

// const baseURL = 'http://localhost/'
const baseURL = import.meta.env.VITE_BASE_URL

console.log(baseURL)

const service = axios.create({
  baseURL,
})

const authStore = useAuthStore();

// 請求攔截
service.interceptors.request.use(
  (config) => {
    startLoading();
    if(localStorage.auth){
      config.headers.Authentication = authStore.state.userInfo.token
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 請求攔截
service.interceptors.response.use(
  (response) => {
    endLoading();
    return response
  },
  (error) => {
    endLoading();
    const { response } = error
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

let loading;
const startLoading = () => {
  loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
}

const endLoading = () => {
  loading.close()
}

export default service
