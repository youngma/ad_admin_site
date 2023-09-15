import { defineStore } from 'pinia'
import * as CAMPAIGN_API from '@/api/CAMPAIGN_API'
import _ from 'lodash'
import { startDatePostFix, endDatePostFix, numberFormatter, moneyFormatter } from '@/utils/customElTableFormatter.js'
import { deepClone } from '@/utils/index.js'
import * as PARTNER_API from '@/api/PARTNER_API.js'
import { campaignApproval, campaignHold, campaignReject } from '@/api/CAMPAIGN_API'

export const campaignStore = defineStore('campaignStore', {
  state: () => ({
    advertisers: [],
    selected: [],

    searchFormAdvertisers: [],
    searchFormSelected: [],

    campaigns: [],
    total: 0,

    campaignSearchParams: {
      // advertiserSeqList: [],
      campaignName: null,
      targetUrl: null,
      campaignCode: null,
      goodsCode: null,
      adDate: [],
      adStartDate: null,
      adEndDate: null,
      campaignType: '',
      paymentTerms: '',
      campaignStatus: '',
      page: 1,
      size: 20
    },

    selectedCampaign: {
      smartStore: null,
      uploads: {
        smartStore: []
      }
    },

    modifyModal: false,
    statusModal: false,

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
      uploads: {
        smartStore: []
      }
    }
  }),
  getters: {
    defaultAdDate: () => [Date.now(), Date.now()],
    advertiser: (state) => state.advertisers.filter((t) => {
      return state.selected.includes(t.advertiserSeq)
    })[0]
  },
  actions: {
    init(type) {
      if (type === 'register') {
        // this.advertisers = []
        // this.selected = []
        this.register = {
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
            paymentTerms: 'TIME',
            holdingTime: 0,
            totalBudget: 0,
            adPrice: 0
          },
          uploads: {
            smartStore: []
          }
        }
        this.register.uploadssmartStore = []
      }

      if (type === 'search') {
        this.campaignSearchParams = {
          campaignName: null,
          targetUrl: null,
          campaignCode: null,
          goodsCode: null,
          adDate: [],
          adStartDate: null,
          adEndDate: null,
          campaignType: '',
          paymentTerms: '',
          campaignStatus: '',
          page: 1,
          size: 20
        }
      }
    },
    setAdvertisers({ advertisers, selected }) {
      this.advertisers = advertisers
      this.selected = selected
    },
    generateParams(source) {
      return Object.assign({
        advertiserSeq: this.advertiser.advertiserSeq
      }, source)
    },
    campaignRegister() {
      const { adDate, totalParticipationLimit, dayParticipationLimit, smartStore } = this.register
      const { useHow, image, targetUrlPc, targetUrlMobile, goodsCode, paymentTerms, holdingTime, totalBudget, adPrice } = smartStore

      const newSmartStore = Object.assign({}, {
        useHow, image, targetUrlPc, targetUrlMobile, goodsCode, paymentTerms,
        totalBudget: numberFormatter(totalBudget),
        adPrice: numberFormatter(adPrice),
        holdingTime: numberFormatter(holdingTime)
      })

      const newCampaign = Object.assign(this.register, {
        adStartDate: startDatePostFix(adDate[0]),
        adEndDate: endDatePostFix(adDate[1]),
        dayParticipationLimit: numberFormatter(dayParticipationLimit),
        totalParticipationLimit: numberFormatter(totalParticipationLimit),
        smartStore: newSmartStore
      })

      return CAMPAIGN_API.register(this.generateParams(newCampaign))
    },
    async reload() {
      const searchParams = Object.assign({
        advertiserSeq: this.searchFormSelected.join(',')
      }, this.campaignSearchParams)

      const result = await CAMPAIGN_API.search(searchParams)
      const { content, totalElements } = result
      this.campaigns = content
      this.total = totalElements
    },
    async search({ page, size }) {
      this.campaignSearchParams.page = page
      if (size && size > 0) {
        this.campaignSearchParams.size = size
      }
      await this.reload()
    },
    adCampaignModalOpen(type, row) {
      if (type === 'modify') {
        const { adStartDate, adEndDate, totalParticipationLimit, dayParticipationLimit, smartStore } = row
        const { seq, useHow, image, targetUrlPc, targetUrlMobile, goodsCode, paymentTerms, holdingTime, totalBudget, adPrice } = smartStore

        const uploads = [image].map(file => {
          const { originName, fileType, fileName } = file
          return {
            name: originName,
            type: fileType,
            url: [import.meta.env.VITE_FIEL_SERVER, 'files', fileName].join('/')
          }
        })

        const smartStoreDump = Object.assign(smartStore, {
          seq, useHow, image, targetUrlPc, targetUrlMobile, goodsCode, paymentTerms,
          totalBudget: moneyFormatter(totalBudget),
          adPrice: moneyFormatter(adPrice),
          holdingTime: moneyFormatter(holdingTime)
        })

        const adCampaign = Object.assign(row, {
          adDate: [adStartDate.split(' ')[0], adEndDate.split(' ')[0]],
          dayParticipationLimit: moneyFormatter(dayParticipationLimit),
          totalParticipationLimit: moneyFormatter(totalParticipationLimit),
          smartStore: smartStoreDump,
          uploads: {
            smartStore: uploads
          }
        })

        this.selectedCampaign = deepClone(adCampaign)
        this.modifyModal = true
      } else if (type === 'status') {
        this.statusModal = true
      }
    },
    modifyAfCampaign() {
      const { seq, adDate, totalParticipationLimit, dayParticipationLimit, smartStore, advertiser } = this.selectedCampaign
      const { advertiserSeq } = advertiser
      const { useHow, image, targetUrlPc, targetUrlMobile, goodsCode, paymentTerms, holdingTime, totalBudget, adPrice } = smartStore

      const newSmartStore = Object.assign(smartStore, {
        useHow, image, targetUrlPc, targetUrlMobile, goodsCode, paymentTerms,
        totalBudget: numberFormatter(totalBudget),
        adPrice: numberFormatter(adPrice),
        holdingTime: numberFormatter(holdingTime)
      })

      const newCampaign = Object.assign(this.selectedCampaign, {
        advertiserSeq,
        adStartDate: startDatePostFix(adDate[0]),
        adEndDate: endDatePostFix(adDate[1]),
        dayParticipationLimit: numberFormatter(dayParticipationLimit),
        totalParticipationLimit: numberFormatter(totalParticipationLimit),
        smartStore: newSmartStore,
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
        key: 'campaigns',
        storage: localStorage
      }
    ]
  }
}, {
})
