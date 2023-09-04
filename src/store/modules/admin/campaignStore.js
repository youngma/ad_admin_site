import { defineStore } from 'pinia'
import * as CAMPAIGN_API from '@/api/CAMPAIGN_API'
import _ from 'lodash'
import { startDatePostFix, endDatePostFix, numberFormatter } from '@/utils/customElTableFormatter.js'

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
    register: {
      campaignType: null,
      campaignName: null,
      campaignDesc: null,
      useHow: null,
      image: null,
      targetUrl: null,
      totalBudget: 0,
      adPrice: 0,
      dayParticipationLimit: 0,
      adDate: [],
      adStartDate: null,
      adEndDate: null,
      goodsCode: null,
      paymentTerms: null,
      holdingTime: 0
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
          campaignName: null,
          campaignDesc: null,
          useHow: null,
          image: null,
          targetUrl: null,
          campaignType: '',
          totalBudget: 0,
          adPrice: 0,
          dayParticipationLimit: 0,
          adDate: [],
          adStartDate: null,
          adEndDate: null,
          goodsCode: null,
          paymentTerms: 'TIME',
          holdingTime: 0
        }
      }
      if (type === 'search') {
        this.campaignSearchParams = {
          campaignName: null,
          targetUrl: null,
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
    generateParams(source) {
      return Object.assign({
        advertiserSeq: this.advertiser.advertiserSeq
      }, source)
    },
    campaignRegister() {
      const { adDate, totalBudget, adPrice, dayParticipationLimit, holdingTime } = this.register

      const newCampaign = Object.assign(this.register, {
        adStartDate: startDatePostFix(adDate[0]),
        adEndDate: endDatePostFix(adDate[1]),
        totalBudget: numberFormatter(totalBudget),
        adPrice: numberFormatter(adPrice),
        dayParticipationLimit: numberFormatter(dayParticipationLimit),
        holdingTime: numberFormatter(holdingTime)
      })

      CAMPAIGN_API.register(this.generateParams(newCampaign)).then(() => {
        this.$alert('등록 되었습니다.', '확인', {})
        this.init('register')
      }).catch(() => {
        this.$alert('처리 중 오류가 발생 했습니다.', '확인', {})
      })
    },
    async reload() {
      console.log(3, this.campaignSearchParams.size)

      const searchParams = Object.assign({
        advertiserSeq: this.searchFormSelected.join(',')
      }, this.campaignSearchParams)

      console.log(4, this.campaignSearchParams.size)

      console.log(5, searchParams.size)

      const result = await CAMPAIGN_API.search(searchParams)
      const { content, totalElements } = result
      this.campaigns = content
      this.total = totalElements
    },
    async search({ page, size }) {
      console.log(1, this.campaignSearchParams.size)

      this.campaignSearchParams.page = page
      if (size && size > 0) {
        console.log(12, this.campaignSearchParams.size)
        this.campaignSearchParams.size = size
      }
      console.log(2, this.campaignSearchParams.size)

      await this.reload()
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
