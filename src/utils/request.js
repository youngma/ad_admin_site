import axios from 'axios'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { userStore } from '@/store/modules/user'
import { getToken } from '@/utils/auth'
import router from "@/router/index.js";
// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    const store = userStore()
    if (store.state.token) {
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
    // const res = response.data

    const user = userStore()
    // if the custom code is not 20000, it is judged as an error.
    if (response.status !== 200) {
      ElMessage({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return response
    }
  },
  error => {
    const user = userStore()
    if (error.response.status === 401 || 403) {
      if(window.location.pathname !== '/login') {
        // to re-login
        ElMessageBox.confirm('로그인 페이지로 이동 합니다.', '알림', {
          confirmButtonText: '확인',
          type: 'warning'
        }).then(() => {
          user.resetToken().then(() => {
            router.push(`/login?redirect=${router.currentRoute.value.path}`)
          })
          // store.dispatch('user/resetToken')
        })
      } else {
        user.resetToken().then(() => {})
      }
    } else {
      console.log('err' + error) // for debug
      ElMessage({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
