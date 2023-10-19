import { defineStore } from 'pinia'
import * as ADVERTISER_API from '@/api/ADVERTISER_API'
import * as CAMPAIGN_API from '@/api/CAMPAIGN_API.js'
import _ from 'lodash'
import { ElMessage } from 'element-plus'
import { deepClone } from '@/utils/index.js'
import {
  endDatePostFix,
  moneyFormatter,
  numberFormatter,
  phoneFormatter,
  startDatePostFix
} from '@/utils/customElTableFormatter.js'

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

    campaigns: {
      searchParams: {
        page: 1,
        size: 20,
        campaignName: null,
        campaignType: '',
        campaignCode: null,
        adStartDate: null,
        adEndDate: null,
        targetUrl: null,
        campaignStatus: ''
      },
      list: [],
      modifyMode: false,
      selectedCampaign: {
        smartStore: null,
        quiz: null,
        uploads: {
          smartStore: [],
          quiz: {
            mainImage: [],
            detailImage1: [],
            detailImage2: []
          }
        }
      },

      register: {
        campaignType: null,
        campaignName: null,
        campaignDesc: null,
        totalParticipationLimit: 0,
        dayParticipationLimit: 0,
        adDate: [],
        adStartDate: null,
        adEndDate: null,
        smartStore: {
          useHow: null,
          image: null,
          targetUrlPc: null,
          targetUrlMobile: null,
          goodsCode: null,
          paymentTerms: null,
          holdingTime: 0,
          totalBudget: 0,
          adPrice: 0
        },
        quiz: {
          useHow: null,
          quizTitle: null,
          quizAnswer: null,
          mainImage: null,
          detailImage1: null,
          detailImage2: null,
          targetUrlPc: null,
          targetUrlMobile: null,
          goodsCode: null
        },
        uploads: {
          smartStore: [],
          quiz: {
            mainImage: [],
            detailImage1: [],
            detailImage2: []
          }
        }
      },
      total: 0,
      registerModal: false
    }
  }),
  getters: {
    // options: (state) => state.advertisers.map((item) => {
    //   return {
    //     label: item.businessName,
    //     value: item.advertiserSeq
    //   }
    // }),
    advertiser: (state) => state.advertisers.filter((t) => {
      const list = [].concat(state.selected)
      return list.includes(t.advertiserSeq)
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

    campaignSearchParams: (state) => state.campaigns.searchParams,
    campaignList: (state) => state.campaigns.list,
    campaignTotal: (state) => state.campaigns.total,
    campaignRegisterModal: (state) => state.campaigns.registerModal
  },
  actions: {
    init() {
      this.searchParams = {
        businessName: null
      }
      this.selected = []
      this.advertisers = []
    },
    // async reload() {
    //   const result = await ADVERTISER_API.search(this.searchParams)
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

      this.accounts.selectedUser = null
      this.accounts.registerModal = false
      this.accounts.modifyModal = false
    },
    tabInitCampaign(type) {
      this.campaigns.searchParams = {
        page: 1,
        size: 20,
        campaignName: null,
        campaignType: '',
        campaignCode: null,
        adStartDate: null,
        adEndDate: null,
        targetUrl: null,
        campaignStatus: ''
      }

      if (type === 'ALL') {
        this.campaigns.list = []
      }

      this.campaigns.selectedCampaign = null
      this.campaigns.total = 0
      this.campaigns.registerModal = false
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
    async reloadByCampaigns() {
      const params = this.generateParams(this.campaigns.searchParams)

      const result = await CAMPAIGN_API.search(params)
      const { content, totalElements } = result

      this.campaigns.list = content
      this.campaigns.total = totalElements
    },
    async searchByCampaigns({ page, size }) {
      this.campaigns.searchParams.page = page
      if (!size && size > 0) {
        this.campaigns.searchParams.size = size
      }
      await this.reloadByCampaigns()
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
          alReadyCheck: false,
          file: null
        }
        this.accounts.uploadFiles = []
        this.accounts.registerModal = false
      }

      if (target === 'campaigns') {
        console.log('campaigns')
        this.campaigns.register = {
          campaignType: null,
          campaignName: null,
          campaignDesc: null,
          totalParticipationLimit: 0,
          dayParticipationLimit: 0,
          adDate: [],
          adStartDate: null,
          adEndDate: null,
          smartStore: {
            useHow: null,
            image: null,
            targetUrlPc: null,
            targetUrlMobile: null,
            goodsCode: null,
            paymentTerms: null,
            holdingTime: 0,
            totalBudget: 0,
            adPrice: 0
          },
          quiz: {
            useHow: null,
            quizTitle: null,
            quizAnswer: null,
            mainImage: null,
            detailImage1: null,
            detailImage2: null,
            targetUrlPc: null,
            targetUrlMobile: null,
            goodsCode: null
          },
          uploads: {
            smartStore: [],
            quiz: {
              mainImage: [],
              detailImage1: [],
              detailImage2: []
            }
          }
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
    async userIdCheck() {
      const { userId } = this.users.register

      const result = await ADVERTISER_API.userIdCheck(this.generateParams({ userId }))

      this.users.register.alReadyCheck = !result
      return this.users.register.alReadyCheck
    },
    userSelected(row) {
      if (row) {
        const { phoneNumber } = row
        this.users.selectedUser = Object.assign(deepClone(row), {
          phoneNumber: phoneFormatter(phoneNumber)
        })
        this.userModalOpen('modify')
      } else {
        this.userModalClose('modify')
        this.users.selectedUser = null
      }
    },
    userModalClose(target) {
      if (target === 'register') {
        this.users.registerModal = false
      } else if (target === 'modify') {
        this.users.modifyModal = false
      }
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
    },
    uploadSuccess(data, uploadFile) {
      const { raw } = uploadFile
      const { type } = raw
      const { result } = data

      this.accounts.uploadFiles = result.map(file => {
        const { originFileName, newFileName, target } = file
        return {
          name: originFileName,
          type,
          url: [import.meta.env.VITE_FILE_SERVER, 'temp', target, newFileName].join('/')
        }
      })

      return { result, type }
    },
    handlePreview(uploadFile) {
      window.open(uploadFile.url)
    },
    handleBeforeUpload(rawFile) {
      const { type, size } = rawFile
      if (!['application/pdf', 'application/png', 'application/jpg'].includes(type)) {
        ElMessage.error('PDF, PNG, JPEG 파일만 등록 가능 합니다.')
        return false
      } else if (size / 1024 / 1024 > 2) {
        ElMessage.error('파일 사이즈는 2MB 를 초과 할 수 없습니다.')
        return false
      }
      return true
    },
    handleExceed() {
      ElMessage.warning(
        '파일은 1개만 업로드 가능 합니다.'
      )
    },

    setAdvertisers({ advertisers, selected }) {
      this.advertisers = advertisers
      this.selected = selected
    },
    setAdvertiserSeq({ selected }) {
      this.selected = selected
    },
    initCampaignDetail() {
      this.campaigns.selectedCampaign = {
        smartStore: null,
        quiz: null,
        uploads: {
          smartStore: [],
          quiz: {
            mainImage: [],
            detailImage1: [],
            detailImage2: []
          }
        }
      }
    },
    setCampaignDetail(row) {
      if (row) {
        // init
        this.initCampaignDetail()

        const { adStartDate, adEndDate, totalParticipationLimit, dayParticipationLimit, smartStore, quiz } = row

        if (smartStore) {
          const { image, holdingTime, totalBudget, adPrice } = smartStore

          Object.assign(smartStore, {
            totalBudget: numberFormatter(totalBudget),
            adPrice: numberFormatter(adPrice),
            holdingTime: numberFormatter(holdingTime)
          })

          this.campaigns.selectedCampaign.uploads.smartStore = [image].map(file => {
            const { originName, fileType, fileName } = file
            return {
              name: originName,
              type: fileType,
              url: [import.meta.env.VITE_FILE_SERVER, 'files', fileName].join('/')
            }
          })
        }

        if (quiz) {
          const { mainImage, detailImage1, detailImage2 } = quiz
          this.campaigns.selectedCampaign.uploads.quiz.mainImage = [mainImage].map(file => {
            const { originName, fileType, fileName } = file
            return {
              name: originName,
              type: fileType,
              url: [import.meta.env.VITE_FILE_SERVER, 'files', fileName].join('/')
            }
          })

          this.campaigns.selectedCampaign.uploads.quiz.detailImage1 = [detailImage1].map(file => {
            const { originName, fileType, fileName } = file
            return {
              name: originName,
              type: fileType,
              url: [import.meta.env.VITE_FILE_SERVER, 'files', fileName].join('/')
            }
          })

          this.campaigns.selectedCampaign.uploads.quiz.detailImage2 = [detailImage2].map(file => {
            const { originName, fileType, fileName } = file
            return {
              name: originName,
              type: fileType,
              url: [import.meta.env.VITE_FILE_SERVER, 'files', fileName].join('/')
            }
          })
        }

        this.campaigns.selectedCampaign = Object.assign(deepClone(row), {
          adDate: [adStartDate.split(' ')[0], adEndDate.split(' ')[0]],
          dayParticipationLimit: moneyFormatter(dayParticipationLimit),
          totalParticipationLimit: moneyFormatter(totalParticipationLimit),
          smartStore,
          quiz,
          uploads: this.campaigns.selectedCampaign.uploads
        })
      } else {
        this.campaigns.selectedCampaign = {
          smartStore: null,
          quiz: null,
          uploads: {
            smartStore: [],
            quiz: {
              mainImage: [],
              detailImage1: [],
              detailImage2: []
            }
          }
        }
      }
    },
    adCampaignModalOpen(type, row) {
      if (type === 'modify') {
        this.setCampaignDetail(row)
        this.modifyModal = true
      } else if (type === 'status') {
        this.statusModal = true
      }
    },
    campaignRegister() {
      const newCampaign = deepClone(this.campaigns.register)
      const { adDate, totalParticipationLimit, dayParticipationLimit, campaignType, smartStore, quiz } = this.campaigns.register

      let newSmartStore = {}
      let newQuiz = {}

      if (smartStore) {
        const { image, paymentTerms, holdingTime, totalBudget, adPrice } = smartStore
        newSmartStore = campaignType === 'TYPE1' ? Object.assign(newSmartStore, {
          useHow: smartStore.useHow,
          targetUrlPc: smartStore.targetUrlPc,
          targetUrlMobile: smartStore.targetUrlMobile,
          goodsCode: smartStore.goodsCode,
          image, paymentTerms,
          totalBudget: numberFormatter(totalBudget),
          adPrice: numberFormatter(adPrice),
          holdingTime: numberFormatter(holdingTime)
        }) : null
      }

      if (quiz) {
        const { quizTitle, quizAnswer, mainImage, detailImage1, detailImage2 } = quiz
        newQuiz = campaignType === 'QUIZ01' ? Object.assign(newQuiz, {
          useHow: quiz.useHow,
          targetUrlPc: quiz.targetUrlPc,
          targetUrlMobile: quiz.targetUrlMobile,
          goodsCode: quiz.goodsCode,
          quizTitle, quizAnswer, mainImage, detailImage1, detailImage2
        }) : null
      }

      Object.assign(newCampaign, {
        adStartDate: startDatePostFix(adDate[0]),
        adEndDate: endDatePostFix(adDate[1]),
        dayParticipationLimit: numberFormatter(dayParticipationLimit),
        totalParticipationLimit: numberFormatter(totalParticipationLimit),
        smartStore: newSmartStore,
        quiz: newQuiz
      })

      return CAMPAIGN_API.register(this.generateParams(newCampaign))
    },
    modifyAfCampaign() {
      const selectedCampaign = deepClone(this.campaigns.selectedCampaign)

      const { adDate, totalParticipationLimit, dayParticipationLimit, advertiser, smartStore, quiz } = selectedCampaign
      const { advertiserSeq } = advertiser

      if (smartStore) {
        const { holdingTime, totalBudget, adPrice } = smartStore
        Object.assign(smartStore, {
          totalBudget: numberFormatter(totalBudget),
          adPrice: numberFormatter(adPrice),
          holdingTime: numberFormatter(holdingTime)
        })
      }

      const newCampaign = Object.assign(selectedCampaign, {
        advertiserSeq,
        adStartDate: startDatePostFix(adDate[0]),
        adEndDate: endDatePostFix(adDate[1]),
        dayParticipationLimit: numberFormatter(dayParticipationLimit),
        totalParticipationLimit: numberFormatter(totalParticipationLimit),
        smartStore: smartStore,
        quiz: quiz,
        advertiser: null
      })

      return CAMPAIGN_API.modify(newCampaign)
    },
    campaignApproval(advertiserSeq, seq) {
      const status = {
        advertiserSeq,
        seq,
        message: ''
      }

      CAMPAIGN_API.campaignApproval(status).then(() => {
        this.$alert('승인 되었습니다.', '확인', {})
        this.reload().then(() => {
        })
      }).catch(() => {
        this.$alert('처리 중 오류가 발생 했습니다.', '확인', {})
      })
    },
    campaignHold(advertiserSeq, seq, message) {
      const status = {
        advertiserSeq,
        seq,
        message
      }

      CAMPAIGN_API.campaignHold(status).then(() => {
        this.$alert('승인 보류 되었습니다.', '확인', {})
        this.reload().then(() => {
          this.statusModal = false
        })
      }).catch(() => {
        this.$alert('처리 중 오류가 발생 했습니다.', '확인', {})
      })
    },
    campaignReject(advertiserSeq, seq, message) {
      const status = {
        advertiserSeq,
        seq,
        message
      }

      CAMPAIGN_API.campaignReject(status).then(() => {
        this.$alert('승인 거절 되었습니다.', '확인', {})
        this.reload().then(() => {
          this.statusModal = false
        })
      }).catch(() => {
        this.$alert('처리 중 오류가 발생 했습니다.', '확인', {})
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
