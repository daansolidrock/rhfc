import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const state = reactive({
      userInfo: {
        username: '',
        token: ''
      }
    })

    const setUserInfo = (userInfo) => {
      state.userInfo = userInfo
    }

    return {
      state,
      setUserInfo
    }
  },
  {
    persist: {
      enabled: true,
    }
  }
)
