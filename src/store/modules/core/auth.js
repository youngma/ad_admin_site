import * as userAPI from '@/api/user.js'
import * as AuthUtils from '@/utils/auth.js'
import router, { resetRouter } from '@/router/index.js'

import { permissionStore } from '@/store/modules/core/permission.js'
import { tagsViewStore } from '@/store/modules/core/tagsView.js'
import { commonStore } from '@/store/modules/admin/commonStore.js'

import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const authStore = defineStore(
  'authStore', () => {
    const status = reactive({
      token: AuthUtils.getToken(),
      name: '',
      avatar: '',
      introduction: '',
      roles: []
    })

    function login(userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        userAPI.login({ userId: username.trim(), password: password }).then(response => {
          const { authorization } = response.headers

          status.token = authorization
          AuthUtils.setToken(authorization)

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }

    const getInfo = () => {
      return new Promise((resolve, reject) => {
        userAPI.getInfo(status.token).then(result => {
          if (!result) {
            reject('Verification failed, please Login again.')
          }

          const { userRole, userName, avatar, introduction } = result

          // roles must be a non-empty array
          if (!userRole) {
            reject('getInfo: roles must be a non-null array!')
          }

          const _commonStore = commonStore()
          _commonStore.loadCode()

          status.roles = [userRole]
          status.name = userName

          status.avatar = avatar
          status.introduction = introduction

          resolve(result)
        }).catch(error => {
          if (error.status === 401) {
            reject('Verification failed, please Login again.')
          } else {
            reject(error)
          }
        })
      })
    }

    const logout = () => {
      return new Promise((resolve, reject) => {
        userAPI.logout(status.token).then(() => {
          resetToken().then(r => {
            resetRouter()
            resolve()
          })

          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          tagsViewStore.delAllViews(null)
        }).catch(error => {
          reject(error)
        })
      })
    }

    // remove token
    const resetToken = () => {
      return new Promise(resolve => {
        status.token = ''
        status.roles = []
        AuthUtils.removeToken()
        resolve()
      })
    }

    // dynamically modify permissions
    const changeRoles = async(role) => {
      const token = role + '-token'
      status.token = token

      AuthUtils.setToken(token)

      const { userRoles } = await getInfo()

      resetRouter()

      // generate accessible routes map based on roles
      await permissionStore.generateRoutes(router, userRoles)

      // dynamically add accessible routes
      // router.addRoute(accessRoutes)

      // reset visited views and cached views
      // dispatch('tagsView/delAllViews', null, { root: true })
    }

    return { status, login, getInfo, logout, resetToken, changeRoles }
  }, {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'user',
          storage: localStorage
        }
      ]
    }
  }
)

