import { defineStore } from 'pinia'
import * as ADVERTISER_API from '@/api/ADVERTISER_API'
import _ from 'lodash'
import * as ADMIN_API from '@/api/ADMIN_API.js'
import { userEnable } from '@/api/ADVERTISER_API'

const initData = {
  searchParams: {
    businessName: null
  }
}

export const advertiserStore = defineStore('advertiserStore', {
  state: () => ({
    searchParams: {
      businessName: null,
      page: 1,
      size: 50
    },
    advertisers: [],
    selected: [],
    loading: false,
    users: {
      searchParams: {
        page: 1,
        size: 20,
        userId: null,
        userName: null,
        userStatus: ''
      },
      list: [],
      selectedUser: null,
      total: 0,
      registerModal: false,
      modifyModal: false,
      register: {
        userId: null,
        alReadyCheck: false,
        userName: null,
        userPassword: null,
        phoneNumber: null
      }
    }
  }),
  getters: {
    options: (state) => state.advertisers.map((item) => {
      return {
        label: item.businessName,
        value: item.advertiserSeq
      }
    }),
    advertiser: (state) => state.advertisers.filter((t) => {
      return state.selected.includes(t.advertiserSeq)
    })[0],
    userSearchParams: (state) => state.users.searchParams,
    userList: (state) => state.users.list,
    userTotal: (state) => state.users.total,
    userRegisterModal: (state) => state.users.registerModal,
    selectedUser: (state) => state.users.selectedUser,
    userModifyModal: (state) => state.users.modifyModal
  },
  actions: {
    init() {
      this.searchParams = {
        businessName: null
      }
      this.selected = []
      this.advertisers = []

    },
    async reload() {
      const result = await ADVERTISER_API.search(this.searchParams)
      const { content, totalElements } = result
      this.advertisers = content
      this.total = totalElements
    },
    async search(query) {
      this.loading = true
      this.searchParams.businessName = query
      this.searchParams.page = 1
      this.searchParams.size = 50

      await this.reload()

      this.loading = false
    },
    tabInitUser() {
      this.users.searchParams = {
        page: 1,
        size: 20,
        userId: null,
        userName: null,
        userStatus: ''
      }

      this.users.list = []
      this.users.selectedUser = null
      this.users.registerModal = false
      this.users.modifyModal = false
    },
    generateParams(source) {
      return Object.assign({
        advertiserSeq: this.advertiser.advertiserSeq
      }, source)
    },
    async reloadByUsers() {
      const params = this.generateParams(this.users.searchParams)

      const result = await ADVERTISER_API.searchByUser(params)
      const { content, totalElements } = result

      this.users.list = content
      this.users.total = totalElements
    },
    async searchByUsers({ page, size }) {
      this.users.searchParams.page = page
      if (!size && size > 0) {
        this.users.searchParams.size = size
      }
      await this.reloadByUsers()
    },
    initRegisterForm() {
      this.users.register = {
        userId: null,
        alReadyCheck: false,
        userName: null,
        userPassword: null,
        phoneNumber: null
      }

      this.users.registerModal = false
    },
    userModalOpen(target) {
      if (target === 'register') {
        this.initRegisterForm()
        this.users.registerModal = true
      } else if (target === 'modify') {
        this.users.modifyModal = true
      }
    },
    async userIdCheck() {
      const { userId } = this.users.register

      const result = await ADVERTISER_API.userIdCheck(this.generateParams(userId))

      this.users.register.alReadyCheck = !result
      return this.users.register.alReadyCheck
    },
    userSelected(row) {
      this.users.selectedUser = Object.assign({}, row)
    },
    userRegister() {
      const newUser = this.generateParams(this.users.register)

      ADVERTISER_API.userRegister(newUser).then(() => {
        this.$alert('등록 되었습니다.', '확인', {})
        this.initRegisterForm()
        this.reloadByUsers().then(() => {
        })
      }).catch(() => {
        this.$alert('처리 중 오류가 발생 했습니다.', '확인', {})
      })
    },
    userModify() {
      const { userSeq, userName, phoneNumber } = this.users.selectedUser
      const params = this.generateParams({ userSeq, userName, phoneNumber })

      ADVERTISER_API.userModify(params).then(() => {
        this.$alert('수정 되었습니다.', '확인', {})
        this.users.modifyModal = false
        this.reloadByUsers().then(() => {
        })
      }).catch(() => {
        this.$alert('처리 중 오류가 발생 했습니다.', '확인', {})
      })
    },
    async userEnable(...userSeq) {
      const params = this.generateParams({ userSeqList: userSeq })
      const result = await ADVERTISER_API.userEnable(params)
      this.UserModifyCallBack(result)
    },
    async userDisable(...userSeq) {
      const params = this.generateParams({ userSeqList: userSeq })
      const result = await ADVERTISER_API.userDisable(params)
      this.UserModifyCallBack(result)
    },
    UserModifyCallBack(modifyUsers) {
      const modifyUsersMap = _.keyBy(modifyUsers, function(o) {
        const { userSeq } = o
        return userSeq
      })

      this.users.list.forEach(function(user) {
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
        key: 'advertiser',
        storage: localStorage
      }
    ]
  }
}, {
})
