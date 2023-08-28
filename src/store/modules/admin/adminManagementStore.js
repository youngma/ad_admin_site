import { defineStore } from 'pinia'
import * as ADMIN_API from '@/api/ADMIN_API'
import _ from 'lodash'

const initData = {
  searchParams: {
    page: 1,
    size: 20,
    userId: null,
    userName: null,
    phoneNumber: null,
    userStatus: 'ALL'
  }
}

export const adminManagementStore = defineStore('adminManagementStore', {
  state: () => ({
    adminUsers: [],
    total: 0,
    searchParams: initData.searchParams
  }),
  getters: {
  },
  actions: {
    init() {
      this.searchParams = initData.searchParams
    },
    async search({ page, size }) {
      this.searchParams.page = page
      if (!size && size > 0) {
        this.searchParams.size = size
      }
      const result = await ADMIN_API.search(this.searchParams)
      const { content, totalElements } = result
      this.adminUsers = content
      this.total = totalElements
    },
    async disabled(...userSeq) {
      const result = await ADMIN_API.userDisabled({
        userSeqList: userSeq
      })

      this.modifyCallBack(result)
    },

    async enabled(...userSeq) {
      const result = await ADMIN_API.userEnabled({
        userSeqList: userSeq
      })

      this.modifyCallBack(result)
    },
    modifyCallBack(modifyUsers) {
      const modifyUsersMap = _.keyBy(modifyUsers, function(o) {
        const { userSeq } = o
        return userSeq
      })

      this.adminUsers.forEach(function(user) {
        const { userSeq } = user
        if (modifyUsersMap[userSeq]) {
          const modifyUser = modifyUsersMap[userSeq]
          user.userStatus = modifyUser.userStatus
          user.userStatusNm = modifyUser.userStatusNm
          user.updatedAt = modifyUser.updatedAt
        }
      })
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'adminUsers',
        storage: localStorage
      }
    ]
  }
}, {
})
