import { defineStore } from 'pinia'
import * as REPORT_QUIZ_API from '@/api/REPORT_QUIZ_API.js'
import _ from 'lodash'
import moment from 'moment'

export const quizReportStore = defineStore('quizReportStore', {
  state: () => ({
    advertiser: {
      searchParams: {
        advertiserSeq: null,
        page: 1,
        size: 20,
        searchDate: [moment().add(-10, 'days').toDate(), moment().add(-1, 'days').toDate()]
      },
      list: [],
      total: 0
    },
    partner: {
      searchParams: {
        partnerSeq: null,
        page: 1,
        size: 20,
        searchDate: [moment().add(-10, 'days').toDate(), moment().add(-1, 'days').toDate()]
      },
      list: [],
      total: 0
    }
  }),
  getters: {
  },
  actions: {
    initByAdvertiser() {
      this.advertiser.searchParams = {
        advertiserSeq: null,
        page: 1,
        size: 20,
        searchDate: [moment().add(-10, 'days').format('YYYY-MM-DD'), moment().add(-1, 'days').format('YYYY-MM-DD')]
      }
    },
    async reloadByAdvertiser(params) {
      const searchParams = Object.assign(
        params, {
          startDate: this.advertiser.searchParams.searchDate[0],
          endDate: this.advertiser.searchParams.searchDate[1]
        }
      )

      const result = await REPORT_QUIZ_API.searchByAdvertiser(searchParams)
      const { content, totalElements } = result

      this.advertiser.list = content
      this.advertiser.total = totalElements
    },
    async searchByAdvertiser({ page, size }) {
      const params = {
        page: page,
        size: !size && size > 0 ? size : undefined
      }
      await this.reloadByAdvertiser(params)
    },
    setAdvertiser(advertiserSeq) {
      this.advertiser.searchParams.advertiserSeq = advertiserSeq
    },
    initByPartner() {
      this.partner.searchParams = {
        partnerSeq: null,
        page: 1,
        size: 20,
        searchDate: [moment().add(-10, 'days').format('YYYY-MM-DD'), moment().add(-1, 'days').format('YYYY-MM-DD')]
      }
    },
    async reloadByPartner(params) {
      const searchParams = Object.assign(
        params, {
          startDate: this.partner.searchParams.searchDate[0],
          endDate: this.partner.searchParams.searchDate[1]
        }
      )

      const result = await REPORT_QUIZ_API.searchByPartner(searchParams)
      const { content, totalElements } = result

      this.partner.list = content
      this.partner.total = totalElements
    },
    async searchByPartner({ page, size }) {
      const params = {
        page: page,
        size: !size && size > 0 ? size : undefined
      }
      await this.reloadByPartner(params)
    },
    setPartner(partnerSeq) {
      this.partner.searchParams.partnerSeq = partnerSeq
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'quizReport',
        storage: localStorage
      }
    ]
  }
}, {
})
