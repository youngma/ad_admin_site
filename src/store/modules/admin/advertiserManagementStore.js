import { defineStore } from 'pinia'
import * as ADVERTISER_API from '@/api/ADVERTISER_API'
import _ from 'lodash'
import * as ADMIN_API from '@/api/ADMIN_API.js'
import { deepClone } from '@/utils/index.js'
import { ElMessage } from 'element-plus'
import { replaceNumber } from '@/utils/customElTableFormatter.js'
import * as PARNTER_API from "@/api/PARTNER_API.js";

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
    uploadFiles: [],
    register: {
      businessName: null,
      businessNumber: null,
      advertiserName: null,
      phoneNumber: null,
      email: null,
      taxBillEmail: null,
      alReadyCheck: false,
      file: null,
      ifCode: null
    },
    selected: null,
    modifyPopup: false,
    modifyPopupByBusinessNumber: false
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
    setDetail(row) {
      this.advertisers = [row]
      this.selected = [row.advertiserSeq]
    },
    initRegisterForm() {
      this.uploadFiles = []
      this.register = {
        businessName: null,
        businessNumber: null,
        advertiserName: null,
        phoneNumber: null,
        email: null,
        taxBillEmail: null,
        alReadyCheck: false,
        ifCode: null,
        // businessRegistrationOriginFileName: null,
        // businessRegistrationFile: null
        file: {
          fileType: null,
          originName: null,
          fileName: null
        }
      }
    },
    async businessNumberCheck(target) {

      if (target === 'register') {
        const { businessNumber } = this.register
        const result = await ADVERTISER_API.businessNumberCheck({
          businessNumber: replaceNumber(businessNumber)
        })

        this.register.alReadyCheck = !result
        return this.register.alReadyCheck
      } else {
        const { businessNumber } = this.selected

        const result = await ADVERTISER_API.businessNumberCheck({
          businessNumber: replaceNumber(businessNumber)
        })

        this.selected.alReadyCheck = !result
        return this.selected.alReadyCheck
      }
    },
    advertiserRegister() {
      const advertiser = deepClone(this.register)
      const { businessNumber, phoneNumber } = advertiser

      Object.assign(advertiser, {
        businessNumber: replaceNumber(businessNumber),
        phoneNumber: replaceNumber(phoneNumber)
      })

      ADVERTISER_API.register(advertiser).then(() => {
        this.$alert('등록 되었습니다.', '확인', {})
        this.initRegisterForm()
      }).catch(() => {
        this.$alert('처리 중 오류가 발생 했습니다.', '확인', {})
      })
    },
    selectedAdvertiser(target, row) {
      if (row) {
        this.selected = deepClone(row)
        const { file, businessNumber } = this.selected

        this.selected.alReadyCheck = false
        this.selected.originBusinessNumber = businessNumber

        this.uploadFiles = [
          {
            name: file ? file.originName : null,
            type: file ? file.fileType : null,
            url: file ? [import.meta.env.VITE_FILE_SERVER, 'files', file.fileName].join('/') : null
          }
        ]

        if (target === 'info') {
          this.modifyPopup = true
        } else if (target === 'businessNumber') {
          this.modifyPopupByBusinessNumber = true
        }
      } else {
        this.selected = null
        this.modifyPopup = false
        this.modifyPopupByBusinessNumber = false
      }
    },
    modifyAdvertiser() {
      const { advertiserSeq, businessName, advertiserName, phoneNumber, email, taxBillEmail, ifCode } = this.selected
      ADVERTISER_API.modify({ advertiserSeq, businessName, advertiserName, phoneNumber, email, taxBillEmail, ifCode }).then(() => {
        this.$alert('수정 되었습니다.', '확인', {})
        this.reload().then(() => {
          this.modifyPopup = false
        })
      }).catch(() => {
        this.$alert('처리 중 오류가 발생 했습니다.', '확인', {})
      })
    },
    modifyBusinessNumber() {
      const { advertiserSeq, businessName, businessNumber, file } = this.selected
      ADVERTISER_API.businessNumberModify({
        advertiserSeq,
        businessName,
        businessNumber: replaceNumber(businessNumber),
        file
      }).then(() => {
        this.$alert('수정 되었습니다.', '확인', {})
        this.reload().then(() => {
          this.modifyPopupByBusinessNumber = false
        })
      }).catch(() => {
        this.$alert('처리 중 오류가 발생 했습니다.', '확인', {})
      })
    },
    uploadSuccess(data, uploadFile) {
      const { raw } = uploadFile
      const { type } = raw
      const { result } = data

      this.uploadFiles = result.map(file => {
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
      if (type !== 'application/pdf') {
        ElMessage.error('PDF 파일만 등록 가능 합니다.')
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
