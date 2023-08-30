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
    searchParams: {
      page: 1,
      size: 20,
      userId: null,
      userName: null,
      phoneNumber: null,
      userStatus: 'ALL'
    },
    register: {
      userId: null,
      alReadyCheck: false,
      userName: null,
      userPassword: null,
      phoneNumber: null
    },
    selectedUser: null,
    modifyPopup: false
  }),
  getters: {
  },
  actions: {
    init() {
      this.searchParams = {
        page: 1,
        size: 20,
        userId: null,
        userName: null,
        phoneNumber: null,
        userStatus: 'ALL'
      }
      this.selectedUser = null
      this.modifyPopup = false
    },
    async reload() {
      const result = await ADMIN_API.search(this.searchParams)
      const { content, totalElements } = result
      this.adminUsers = content
      this.total = totalElements
    },
    async search({ page, size }) {
      this.searchParams.page = page
      if (!size && size > 0) {
        this.searchParams.size = size
      }
      await this.reload()
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
    async userIdCheck() {
      const { userId } = this.register
      const res = await ADMIN_API.userIdCheck({ userId })

      this.register.alReadyCheck = !res.data.result

      return this.register.alReadyCheck
    },
    initRegisterForm() {
      this.register = {
        userId: null,
        alReadyCheck: false,
        userName: null,
        userPassword: null,
        phoneNumber: null
      }
    },
    adminRegister() {
      ADMIN_API.register(this.register).then(() => {
        this.$alert('등록 되었습니다.', '확인', {})
        this.initRegisterForm()
      }).catch(() => {
        console.log(this)
        this.$alert('처리 중 오류가 발생 했습니다.', '확인', {})
      })
    },
    adminModify() {
      const { userSeq, userName, phoneNumber } = this.selectedUser
      ADMIN_API.modify({ userSeq, userName, phoneNumber }).then(() => {
        this.$alert('수정 되었습니다.', '확인', {})
        this.reload().then(() => {
          this.modifyPopup = false
        })
      }).catch(() => {
        this.$alert('처리 중 오류가 발생 했습니다.', '확인', {})
      })
    },
    selected(row) {
      this.selectedUser = row
      this.modifyPopup = true
    },
    modifyCallBack(modifyUsers) {
      const modifyUsersMap = _.keyBy(modifyUsers, function(o) {
        const { userSeq } = o
        return userSeq
      })

      this.adminUsers.forEach(function(user) {
        const { userSeq } = user
        if (modifyUsersMap[userSeq]) {
          const { userStatus, userStatusNm, updatedAt } = modifyUsersMap[userSeq]
          user.userStatus = userStatus
          user.userStatusNm = userStatusNm
          user.updatedAt = updatedAt
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
