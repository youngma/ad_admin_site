import axios from 'axios'
import { ElMessageBox, ElMessage } from 'element-plus'
// import { useRouter } from 'vue-router'
import { authStore } from '@/store/modules/core/auth.js'
import { getToken } from '@/utils/auth'
import router from '@/router/index.js'

import qs from 'qs'


// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  paramsSerializer: function(params) {
    return qs.stringify(params)
  }
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    const _authStore = authStore()
    const { token } = _authStore.status

    if (token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
    }
    return config
  }, error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    console.log('# response => ', response)
    const res = response.data
    if (response.status !== 200) {
      ElMessage({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res.result || response
    }
  },
  error => {
    const _authStore = authStore()
    if (error.response.status === 401 || error.response.status === 403) {
      if (window.location.pathname !== '/login') {
        // to re-login
        ElMessageBox.confirm('로그인 페이지로 이동 합니다.', '알림', {
          confirmButtonText: '확인',
          type: 'warning'
        }).then(() => {
          _authStore.resetToken().then(() => {
            router.push(`/login?redirect=${router.currentRoute.value.path}`).then(r => {})
          })
          // store.dispatch('user/resetToken')
        })
      } else {
        _authStore.resetToken().then(() => {})
      }
    } else {
      console.log('err', error.response.data) // for debug
      ElMessage({
        message: error.response.data.message || error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
