import * as userAPI from '@/api/user'
import * as AuthUtils from '@/utils/auth'
import router, { resetRouter } from '@/router'

import { permissionStore } from '@/store/modules/permission'
import { tagsViewStore } from '@/store/modules/tagsView'

import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const userStore = defineStore(
  'user', () => {
    const state = reactive({
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
          const { authorization } = response.headers;

          state.token = authorization
          AuthUtils.setToken(authorization)

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }

    const getInfo = () => {
      return new Promise((resolve, reject) => {

        userAPI.getInfo(state.token).then(response => {

          const { result } = response.data

          if (!result) {
            reject('Verification failed, please Login again.')
          }

          const { userRole, userName, avatar, introduction } = result

          // roles must be a non-empty array
          if (!userRole ) {
            reject('getInfo: roles must be a non-null array!')
          }

          state.roles = [userRole]
          state.name = userName

          state.avatar = avatar
          state.introduction = introduction

          resolve(result)
        }).catch(error => {

          console.log(error)
          if (error.response.status === 401) {
            reject('Verification failed, please Login again.')
          } else {
            reject(error)
          }
        })
      })
    }

    const logout = () => {
      return new Promise((resolve, reject) => {
        userAPI.logout(state.token).then(() => {
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
        state.token = ''
        state.roles = []
        AuthUtils.removeToken()
        resolve()
      })
    }

    // dynamically modify permissions
    const changeRoles = async(role) => {
      const token = role + '-token'
      state.token = token

      AuthUtils.setToken(token)

      const { userRoles } = await getInfo()

      resetRouter()

      // generate accessible routes map based on roles
      await permissionStore.generateRoutes(router, roles)


      // dynamically add accessible routes
      // router.addRoute(accessRoutes)


      // reset visited views and cached views
      // dispatch('tagsView/delAllViews', null, { root: true })
    }

    return { state, login, getInfo, logout, resetToken, changeRoles }
  }, {
    persist: true
  }
)

