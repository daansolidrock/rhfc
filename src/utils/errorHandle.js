import router from '@/router';

/* eslint-disable */
function errorHandle(status, msg) {
  switch (status) {
    // Unauthorized. Not pass authentication.
    case 401:
      ElNotification({
        title: 'Error',
        message: `登入期限到了，請重新登入`,
        type: 'error',
        duration: 2500
      })
      router.push("/login");
      // 到時候要跳轉到登入頁面
      // router.replace({
      //   path: '/login',
      //   query: {
      //     redirect: router.currentRoute.fullPath
      //   }
      // })
      break

    // Forbidden. Not pass Authorization.
    case 403:
      ElNotification({
        title: 'Error',
        message: `無使用權限`,
        type: 'error',
        duration: 2500
      })

      break

    // Not Found
    case 404:
      ElNotification({
        title: 'Error',
        message: `資源不存在`,
        type: 'error',
        duration: 2500
      })
      break
    case 409:
      ElNotification({
        title: 'Error',
        message: `資料重複 ${msg}`,
        type: 'error',
        duration: 2500
      })
      break

    // Unprocessable Entity. Invalid input.
    case 422:
      // popupAlert('檢查欄位資訊');
      ElNotification({
        title: 'Error',
        message: `檢查欄位資訊`,
        type: 'error',
        duration: 2500
      })
      break

    // Internal Server Error
    case 500:
      // popupAlert(msg);
      ElNotification({
        title: 'Error',
        message: `500 Internal Server Error, ${msg}`,
        type: 'error',
        duration: 2500
      })
      break

    default:
      // popupAlert(msg);
      ElNotification({
        title: 'Error',
        message: `${msg}`,
        type: 'error',
        duration: 2500
      })
  }
}

export default errorHandle
