import { defineStore } from 'pinia'
import * as CAMPAIGN_API from '@/api/CAMPAIGN_API'
// import _ from 'lodash'
import { startDatePostFix, endDatePostFix, numberFormatter, moneyFormatter } from '@/utils/customElTableFormatter.js'
import { deepClone } from '@/utils/index.js'
import * as PARTNER_API from '@/api/PARTNER_API.js'
// import * as PARTNER_API from '@/api/PARTNER_API.js'
// import { campaignApproval, campaignHold, campaignReject } from '@/api/CAMPAIGN_API'

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
      exposureStatus: '',
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
          exposureStatus: '',
          page: 1,
          size: 20
        }
      }

      // if (type === 'search-result') {
      //   this.advertisers = []
      //   this.selected = []
      // }
    },
    setAdvertisers({ advertisers, selected }) {
      this.advertisers = advertisers
      this.selected = selected
    },
    setAdvertiserSeq({ selected }) {
      this.selected = selected
    },
    generateParams(source) {
      return Object.assign({
        advertiserSeq: this.advertiser.advertiserSeq
      }, source)
    },
    async reload(params) {
      const searchParams = Object.assign(
        params,
        this.campaignSearchParams
      )

      if (searchParams.exposureStatus === null) {
        searchParams.exposureStatus = undefined
      }

      const result = await CAMPAIGN_API.search(searchParams)
      const { content, totalElements } = result
      return { content, totalElements }
    },
    async search({ selected, page, size }) {
      const params = {
        advertiserSeq: selected.value.join(','),
        page: page,
        size: !size && size > 0 ? size : undefined
      }
      return await this.reload(params)
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
