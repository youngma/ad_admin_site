import { defineStore } from 'pinia'
import * as ADVERTISER_API from '@/api/ADVERTISER_API'
import _ from 'lodash'
import * as ADMIN_API from '@/api/ADMIN_API.js'
import { deepClone } from '@/utils/index.js'

const initData = {
  searchParams: {
    page: 1,
    size: 20,
    businessName: null,
    businessNumber: null,
    phoneNumber: null,
    email: null
  }
}

export const advertiserManagementStore = defineStore('advertiserManagementStore', {
  state: () => ({
    advertisers: [],
    total: 0,
    searchParams: {
      page: 1,
      size: 20,
      businessName: null,
      businessNumber: null,
      phoneNumber: null,
      email: null
    },
    fileList: [],
    register: {
      businessName: null,
      businessNumber: null,
      advertiserName: null,
      phoneNumber: null,
      email: null,
      alReadyCheck: false,
      businessRegistrationOriginFileName: null,
      businessRegistrationFile: null
    },
    selected: null,
    modifyPopup: false
  }),
  getters: {
  },
  actions: {
    init() {
      this.searchParams = {
        page: 1,
        size: 20,
        businessName: null,
        businessNumber: null,
        phoneNumber: null,
        email: null,
        alReadyCheck: false
      }
      this.selected = null
      this.modifyPopup = false
    },
    async reload() {
      const result = await ADVERTISER_API.search(this.searchParams)
      const { content, totalElements } = result
      this.advertisers = content
      this.total = totalElements
    },
    async search({ page, size }) {
      this.searchParams.page = page
      if (!size && size > 0) {
        this.searchParams.size = size
      }

      await this.reload()
    },
    initRegisterForm() {
      this.fileList = []
      this.register = {
        businessName: null,
        businessNumber: null,
        advertiserName: null,
        phoneNumber: null,
        email: null,
        alReadyCheck: false,
        // businessRegistrationOriginFileName: null,
        // businessRegistrationFile: null
        file: {
          fileType: null,
          originName: null,
          fileName: null
        }
      }
    },
    async businessNumberCheck() {
      const { businessNumber } = this.register
      const result = await ADVERTISER_API.businessNumberCheck({ businessNumber })

      this.register.alReadyCheck = !result

      return this.register.alReadyCheck
    },
    advertiserRegister() {
      ADVERTISER_API.register(this.register).then(() => {
        this.$alert('등록 되었습니다.', '확인', {})
        this.initRegisterForm()
      }).catch(() => {
        console.log(this)
        this.$alert('처리 중 오류가 발생 했습니다.', '확인', {})
      })
    },
    selectedAdvertiser(row) {
      this.selected = deepClone(row)
      this.modifyPopup = true
    },
    modifyAdvertiser() {
      const { advertiserSeq, businessName, advertiserName, phoneNumber, email } = this.selected
      ADVERTISER_API.modify({ advertiserSeq, businessName, advertiserName, phoneNumber, email }).then(() => {
        this.$alert('수정 되었습니다.', '확인', {})
        this.reload().then(() => {
          this.modifyPopup = false
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
        key: 'advertisers',
        storage: localStorage
      }
    ]
  }
}, {
})
