import { defineStore } from 'pinia'
import * as PARTNER_API from '@/api/PARTNER_API.js'
import * as CAMPAIGN_API from '@/api/CAMPAIGN_API.js'
import _ from 'lodash'
import { ElMessage } from 'element-plus'
import { deepClone } from '@/utils/index.js'
import { sha512 } from 'js-sha512'
import { saveMappingAds } from '@/api/PARTNER_API.js'

const initData = {
  searchParams: {
    businessName: null
  }
}

export const partnerStore = defineStore('partnerStore', {
  state: () => ({
    searchParams: {
      businessName: null,
      page: 1,
      size: 50
    },

    partners: [],
    selected: [],

    tabIndex: 'user',

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
        phoneNumber: null,
        email: null
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
      uploadFiles: [],
      list: [],
      selectedAccount: null,
      total: 0,
      registerModal: false,
      register: {
        bankCode: '',
        bankAccount: null,
        accountHolder: null,
        alReadyCheck: false,
        file: null
      }
    },
    adGroups: {
      searchParams: {
        page: 1,
        size: 20,
        groupName: '',
        groupCode: null,
        adType: '',
        groupStatus: ''
      },
      mappingAds: [],
      total: 0,
      list: [],
      registerModal: false,
      selectedAdGroup: null,
      register: {
        adType: 'ALL',
        groupName: null,
        logoFile: null,
        pointIconFile: null,
        pointName: null,
        callBackUrl: null,
        commissionRate: 1,
        userCommissionRate: 1,
        rewordRate: 0.1
      },
      uploadLogoFile: [],
      uploadPointIconFile: [],
      statusModal: false,
      modifyModal: false
    },
    campaigns: {
      searchParams: {
        page: 1,
        size: 10
      },
      total: 0,
      list: []
    }
  }),
  getters: {
    // options: (state) => state.advertisers.map((item) => {
    //   return {
    //     label: item.businessName,
    //     value: item.advertiserSeq
    //   }
    // }),
    partner: (state) => state.partners.filter((t) => {
      const list = [].concat(state.selected)
      return list.includes(t.partnerSeq)
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
    accountModifyModal: (state) => state.accounts.modifyModal,

    adGroupSearchParams: (state) => state.adGroups.searchParams,
    adGroupList: (state) => state.adGroups.list,
    adGroupTotal: (state) => state.adGroups.total,
    adGroupRegisterModal: (state) => state.adGroups.registerModal,
    adGroupModifyModal: (state) => state.adGroups.modifyModal

  },
  actions: {
    init() {
      this.searchParams = {
        businessName: null
      }
      this.selected = []
      this.partners = []
    },
    // async reload() {
    //   const result = await PARTNER_API.search(this.searchParams)
    //   const { content, totalElements } = result
    //   this.advertisers = content
    //   this.total = totalElements
    // },
    // async search(query) {
    //   this.loading = true
    //   this.searchParams.businessName = query
    //   this.searchParams.page = 1
    //   this.searchParams.size = 50
    //
    //   await this.reload()
    //
    //   this.loading = false
    // },
    tabInitUser(type) {
      this.users.searchParams = {
        page: 1,
        size: 20,
        userId: null,
        userName: null,
        userStatus: ''
      }
      if (type === 'ALL') {
        this.users.list = []
      }
      this.users.selectedUser = null
      this.users.registerModal = false
      this.users.modifyModal = false
    },
    tabInitAccount(type) {
      this.accounts.searchParams = {
        page: 1,
        size: 20,
        bankCode: '',
        bankAccount: null,
        accountHolder: null,
        accountUse: ''
      }
      if (type === 'ALL') {
        this.accounts.list = []
      }
      this.accounts.selectedAccount = null
      this.accounts.registerModal = false
      this.accounts.modifyModal = false
    },
    tabInitAdGroup(type) {
      this.adGroups.searchParams = {
        size: 20,
        groupName: '',
        groupCode: null,
        adType: '',
        groupStatus: ''
      }
      if (type === 'ALL') {
        this.adGroups.list = []
      }
      this.adGroups.selectedAdGroup = null
      this.adGroups.registerModal = false
      this.adGroups.modifyModal = false
      this.adGroups.statusModal = false
    },
    generateParams(source) {
      const { partnerSeq } = this.partner
      return Object.assign({
        partnerSeq
      }, source)
    },
    async reloadByUsers() {
      const params = this.generateParams(this.users.searchParams)

      const result = await PARTNER_API.searchByUser(params)
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

      const result = await PARTNER_API.searchByAccount(params)
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
    async reloadByAdGroups() {
      const params = this.generateParams(this.adGroups.searchParams)

      const result = await PARTNER_API.searchByAdGroups(params)
      const { content, totalElements } = result

      this.adGroups.list = content
      this.adGroups.total = totalElements
    },
    async searchByAdGroups({ page, size }) {
      this.adGroups.searchParams.page = page
      if (!size && size > 0) {
        this.adGroups.searchParams.size = size
      }
      await this.reloadByAdGroups()
    },
    initRegisterForm(target) {
      if (target === 'user') {
        this.users.register = {
          userId: null,
          alReadyCheck: false,
          userName: null,
          userPassword: null,
          phoneNumber: null,
          email: null

        }
        this.users.registerModal = false
      }

      if (target === 'account') {
        this.accounts.register = {
          seq: null,
          bankCode: '',
          bankAccount: null,
          accountHolder: null,
          alReadyCheck: false,
          file: null
        }
        this.accounts.uploadFiles = []
        this.accounts.registerModal = false
      }

      if (target === 'adGroup') {
        this.adGroups.register = {
          adType: 'ALL',
          groupName: null,
          logoFile: null,
          pointIconFile: null,
          pointName: null,
          callBackUrl: null,
          commissionRate: 1,
          userCommissionRate: 1,
          rewordRate: 0.1
        }
        this.adGroups.uploadLogoFile = []
        this.adGroups.uploadPointIconFile = []
        this.adGroups.registerModal = false
        this.adGroups.mappingAds = []

        this.campaigns = {
          searchParams: {
            page: 1,
            size: 10
          },
          total: 0,
          list: []
        }
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
    userModalClose(target) {
      if (target === 'register') {
        this.users.registerModal = close
      } else if (target === 'modify') {
        this.users.modifyModal = close
      }
    },
    async userIdCheck() {
      const { userId } = this.users.register

      const result = await PARTNER_API.userIdCheck(this.generateParams({ userId }))

      this.users.register.alReadyCheck = !result
      return this.users.register.alReadyCheck
    },
    userSelected(row) {
      this.users.selectedUser = Object.assign({}, row)
    },
    userRegister() {
      const newUser = this.generateParams(this.users.register)

      const hash = sha512.create()

      hash.update(newUser.userPassword)
      const password = hash.hex()

      PARTNER_API.userRegister(Object.assign(
        newUser,
        {
          userPassword: password
        })).then(() => {
        this.$alert('등록 되었습니다.', '확인', {})
        this.initRegisterForm('user')
        this.reloadByUsers().then(() => {
        })
      }).catch(() => {
        this.$alert('처리 중 오류가 발생 했습니다.', '확인', {})
      })
    },
    userModify() {
      const { userSeq, userName, phoneNumber, email } = this.users.selectedUser
      const params = this.generateParams({ userSeq, userName, phoneNumber, email })

      PARTNER_API.userModify(params).then(() => {
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
      const result = await PARTNER_API.userEnable(params)
      this.UserModifyCallBack(result)
    },
    async userDisable(...userSeq) {
      const params = this.generateParams({ userSeqList: userSeq })
      const result = await PARTNER_API.userDisable(params)
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
          const { userStatus, userStatusName, updatedAt } = modifyUsersMap[userSeq]
          user.userStatus = userStatus
          user.userStatusName = userStatusName
          user.updatedAt = updatedAt
        }
      })
    },
    async accountCheck() {
      const { bankCode, bankAccount } = this.accounts.register

      const result = await PARTNER_API.accountNumberCheck(this.generateParams({ bankCode, bankAccount }))

      this.accounts.register.alReadyCheck = !result
      return this.accounts.register.alReadyCheck
    },
    async accountUsed(seq) {
      const params = this.generateParams({ seq })
      const result = await PARTNER_API.accountUsed(params)
      this.accountModifyCallBack(result)
    },
    async accountUnused(seq) {
      const params = this.generateParams({ seq })
      const result = await PARTNER_API.accountUnused(params)
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
      PARTNER_API.accountRegister(newAccount).then(() => {
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
      PARTNER_API.accountDelete(account).then(() => {
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
    },
    uploadSuccess(regType, data, uploadFile) {
      const { raw } = uploadFile
      const { type } = raw
      const { result } = data

      switch (regType) {
        case 'account':
          this.accounts.uploadFiles = result.map(file => {
            const { originFileName, newFileName, target } = file
            return {
              name: originFileName,
              type,
              url: [import.meta.env.VITE_FILE_SERVER, 'temp', target, newFileName].join('/')
            }
          })
          break

        case 'logoFile':
          this.adGroups.uploadLogoFile = result.map(file => {
            const { originFileName, newFileName, target } = file
            return {
              name: originFileName,
              type,
              url: [import.meta.env.VITE_FILE_SERVER, 'temp', target, newFileName].join('/')
            }
          })
          break

        case 'pointIconFile':
          this.adGroups.uploadPointIconFile = result.map(file => {
            const { originFileName, newFileName, target } = file
            return {
              name: originFileName,
              type,
              url: [import.meta.env.VITE_FILE_SERVER, 'temp', target, newFileName].join('/')
            }
          })
          break
      }

      return { result, type }
    },
    handlePreview(uploadFile) {
      window.open(uploadFile.url)
    },
    handleBeforeUpload(regType, rawFile) {
      // console.log(rawFile)
      const { type, size } = rawFile

      switch (regType) {
        case 'account':
          if (!['application/pdf', 'image/png', 'image/jpg'].includes(type)) {
            ElMessage.error('PDF, PNG, JPEG 파일만 등록 가능 합니다.')
            return false
          } else if (size / 1024 / 1024 > 2) {
            ElMessage.error('파일 사이즈는 2MB 를 초과 할 수 없습니다.')
            return false
          }

          break

        case 'adGroup':
          if (!['image/png', 'image/jpg'].includes(type)) {
            ElMessage.error('PNG, JPEG 파일만 등록 가능 합니다.')
            return false
          } else if (size / 1024 / 1024 > 1) {
            ElMessage.error('파일 사이즈는 1MB 를 초과 할 수 없습니다.')
            return false
          }

          break
      }
      return true
    },
    handleExceed(type) {
      alert(type)
      switch (type) {
        case 'account':
        case 'adGroup':
          ElMessage.warning(
            '파일은 1개만 업로드 가능 합니다.'
          )

          break
      }
    },
    setPartners({ partners, selected }) {
      this.partners = partners
      this.selected = selected
    },
    setPartnerSeq({ selected }) {
      this.selected = selected
    },
    async adGroupRegister(callback) {
      let newAdGroup = this.generateParams(this.adGroups.register)

      newAdGroup = Object.assign(newAdGroup, {
        mappingAds: this.adGroups.mappingAds
      })

      PARTNER_API.adGroupRegister(newAdGroup).then(() => {
        this.$alert('등록 되었습니다.', '확인', { callback })
        // this.reloadByAdGroups().then(() => {
        // })
      }).catch(() => {
        this.$alert('처리 중 오류가 발생 했습니다.', '확인', {})
      })
    },
    setAdGroupDetail(row) {
      if (row) {
        this.adGroups.selectedAdGroup = deepClone(row)
        const { pointIconFile, logoFile } = this.adGroups.selectedAdGroup

        this.adGroups.uploadLogoFile = [pointIconFile].map(file => {
          const { originName, fileType, fileName } = file
          return {
            name: originName,
            type: fileType,
            url: [import.meta.env.VITE_FILE_SERVER, 'files', fileName].join('/')
          }
        })

        this.adGroups.uploadPointIconFile = [logoFile].map(file => {
          const { originName, fileType, fileName } = file
          return {
            name: originName,
            type: fileType,
            url: [import.meta.env.VITE_FILE_SERVER, 'files', fileName].join('/')
          }
        })
      } else {
        this.adGroups.selectedAdGroup = null
        this.adGroups.mappingAds = []
        this.campaigns = {
          searchParams: {
            page: 1,
            size: 10
          },
          total: 0,
          list: []
        }
      }
    },
    adGroupModalOpen(target, row) {
      if (target === 'register') {
        // this.initRegisterForm('adGroup')
        // this.adGroups.registerModal = true
      } else if (target === 'modify') {
        this.adGroups.modifyModal = true
        this.adGroups.selectedAdGroup = row
        const { pointIconFile, logoFile } = row

        this.adGroups.uploadLogoFile = [pointIconFile].map(file => {
          const { originName, fileType, fileName } = file
          return {
            name: originName,
            type: fileType,
            url: [import.meta.env.VITE_FILE_SERVER, 'files', fileName].join('/')
          }
        })

        this.adGroups.uploadPointIconFile = [logoFile].map(file => {
          const { originName, fileType, fileName } = file
          return {
            name: originName,
            type: fileType,
            url: [import.meta.env.VITE_FILE_SERVER, 'files', fileName].join('/')
          }
        })
      } else if (target === 'status') {
        this.adGroups.statusModal = true
      }
    },
    adGroupApproval({ partnerSeq, groupSeq }, callback) {
      const adGroupStatus = {
        partnerSeq,
        groupSeq,
        message: ''
      }

      PARTNER_API.adGroupApproval(adGroupStatus).then(() => {
        this.$alert('승인 되었습니다.', '확인', { callback })
      }).catch(() => {
        this.$alert('처리 중 오류가 발생 했습니다.', '확인', {})
      })
    },
    adGroupHold(groupSeq, message) {
      const adGroupStatus = this.generateParams({
        groupSeq,
        message
      })

      PARTNER_API.adGroupHold(adGroupStatus).then(() => {
        this.$alert('승인 보류 되었습니다.', '확인', {})
        this.reloadByAdGroups().then(() => {
          this.adGroups.statusModal = false
        })
      }).catch(() => {
        this.$alert('처리 중 오류가 발생 했습니다.', '확인', {})
      })
    },
    adGroupReject(groupSeq, message) {
      const adGroupStatus = this.generateParams({
        groupSeq,
        message
      })

      PARTNER_API.adGroupReject(adGroupStatus).then(() => {
        this.$alert('승인 거절 되었습니다.', '확인', {})
        this.reloadByAdGroups().then(() => {
          this.adGroups.statusModal = false
        })
      }).catch(() => {
        this.$alert('처리 중 오류가 발생 했습니다.', '확인', {})
      })
    },
    adGroupModify(callback) {
      const { groupSeq, partner, groupName, pointName, logoFile, pointIconFile, rewordRate, commissionRate, userCommissionRate, callBackUrl } = this.adGroups.selectedAdGroup
      const { partnerSeq } = partner

      const adGroupModify = {
        partnerSeq, groupSeq, groupName, pointName, logoFile, pointIconFile, rewordRate, commissionRate, userCommissionRate, callBackUrl
      }

      PARTNER_API.adGroupModify(adGroupModify).then(() => {
        this.$alert('수정 되었습니다.', '확인', { callback })
      }).catch(() => {
        this.$alert('처리 중 오류가 발생 했습니다.', '확인', {})
      })
    },
    async reloadByMappingAds(groupSeq, partnerSeq) {
      this.adGroups.mappingAds = await PARTNER_API.mappingAds({ partnerSeq, groupSeq })
    },
    async searchByMappingAds(groupSeq, partnerSeq) {
      await this.reloadByMappingAds(groupSeq, partnerSeq)
    },
    async reloadByCampaigns(page) {
      this.campaigns.searchParams.page = page

      const params = Object.assign({
        campaignStatus: 'APPROVAL',
        exposureStatus: 1

      }, this.campaigns.searchParams)

      const result = await CAMPAIGN_API.search(params)
      const { content, totalElements } = result

      this.campaigns.list = content.map(campaign => {
        return Object.assign({ selected: this.adGroups.mappingAds.includes(campaign.seq) }, campaign)
      })
      this.campaigns.total = totalElements
    },
    async searchByCampaigns({ page }) {
      await this.reloadByCampaigns(page)
    },
    async savaMappingAds(callback) {
      const { partnerSeq } = this.adGroups.selectedAdGroup.partner
      const { groupSeq } = this.adGroups.selectedAdGroup
      const { mappingAds } = this.adGroups

      const params = {
        partnerSeq,
        groupSeq,
        mappingAds
      }

      PARTNER_API.saveMappingAds(params).then(() => {
        this.$alert('저장 되었습니다.', '확인', { callback })
      }).catch(() => {
        this.$alert('처리 중 오류가 발생 했습니다.', '확인', {})
      })
    }

  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'partner',
        storage: localStorage
      }
    ]
  }
}, {
})
