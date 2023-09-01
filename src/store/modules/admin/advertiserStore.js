import { defineStore } from 'pinia'
import * as ADVERTISER_API from '@/api/ADVERTISER_API'
import _ from 'lodash'

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
    },
    accounts: {
      searchParams: {
        page: 1,
        size: 20,
        bankCode: '',
        bankAccount: null,
        accountHolder: null,
        accountUse: ''
      },
      list: [],
      selectedAccount: null,
      total: 0,
      registerModal: false,
      register: {
        bankCode: '',
        bankAccount: null,
        accountHolder: null,
        alReadyCheck: false
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
    userModifyModal: (state) => state.users.modifyModal,

    accountSearchParams: (state) => state.accounts.searchParams,
    accountList: (state) => state.accounts.list,
    accountTotal: (state) => state.accounts.total,
    accountRegisterModal: (state) => state.accounts.registerModal,
    selectedAccount: (state) => state.accounts.selectedAccount,
    accountModifyModal: (state) => state.accounts.modifyModal
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
    tabInitAccount() {
      this.accounts.searchParams = {
        page: 1,
        size: 20,
        bankCode: '',
        bankAccount: null,
        accountHolder: null,
        accountUse: ''
      }
      this.accounts.list = []
      this.accounts.selectedUser = null
      this.accounts.registerModal = false
      this.accounts.modifyModal = false
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
    async reloadByAccounts() {
      const params = this.generateParams(this.accounts.searchParams)

      const result = await ADVERTISER_API.searchByAccount(params)
      const { content, totalElements } = result

      this.accounts.list = content
      this.accounts.total = totalElements
    },
    async searchByAccounts({ page, size }) {
      this.accounts.searchParams.page = page
      if (!size && size > 0) {
        this.accounts.searchParams.size = size
      }
      await this.reloadByAccounts()
    },
    initRegisterForm(target) {
      if (target === 'user') {
        this.users.register = {
          userId: null,
          alReadyCheck: false,
          userName: null,
          userPassword: null,
          phoneNumber: null
        }
        this.users.registerModal = false
      }

      if (target === 'account') {
        this.accounts.register = {
          seq: null,
          bankCode: '',
          bankAccount: null,
          accountHolder: null,
          alReadyCheck: false
        }
        this.accounts.registerModal = false
      }
    },
    userModalOpen(target) {
      if (target === 'register') {
        this.initRegisterForm('user')
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
        this.initRegisterForm('user')
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
    },
    async accountCheck() {
      const { bankCode, bankAccount } = this.accounts.register

      const result = await ADVERTISER_API.accountNumberCheck(this.generateParams({ bankCode, bankAccount }))

      this.accounts.register.alReadyCheck = !result
      return this.accounts.register.alReadyCheck
    },
    async accountUsed(seq) {
      const params = this.generateParams({ seq })
      const result = await ADVERTISER_API.accountUsed(params)
      this.accountModifyCallBack(result)
    },
    async accountUnused(seq) {
      const params = this.generateParams({ seq })
      const result = await ADVERTISER_API.accountUnused(params)
      this.accountModifyCallBack(result)
    },
    accountModifyCallBack(modifyUsers) {
      const modifyAccountsMap = _.keyBy([modifyUsers], function(o) {
        const { seq } = o
        return seq
      })

      this.accounts.list.forEach((account) => {
        const { seq } = account
        if (modifyAccountsMap[seq]) {
          const { accountUse, updatedAt } = modifyAccountsMap[seq]
          account.accountUse = accountUse
          account.updatedAt = updatedAt
        }
      })
    },
    async accountRegister() {
      const newAccount = this.generateParams(this.accounts.register)
      ADVERTISER_API.accountRegister(newAccount).then(() => {
        this.$alert('등록 되었습니다.', '확인', {})
        this.initRegisterForm('account')
        this.reloadByAccounts().then(() => {
        })
      }).catch(() => {
        this.$alert('처리 중 오류가 발생 했습니다.', '확인', {})
      })
    },
    async accountDelete(row) {
      const { seq } = row
      const account = this.generateParams({ seq })
      ADVERTISER_API.accountDelete(account).then(() => {
        this.$alert('삭제 되었습니다.', '확인', {})
        this.reloadByAccounts().then(() => {
        })
      }).catch(() => {
        this.$alert('처리 중 오류가 발생 했습니다.', '확인', {})
      })
    },
    accountModalOpen(target) {
      if (target === 'register') {
        this.initRegisterForm('account')
        this.accounts.registerModal = true
      }
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
