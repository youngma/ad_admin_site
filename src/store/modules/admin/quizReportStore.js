import { defineStore } from 'pinia'
import * as REPORT_QUIZ_API from '@/api/REPORT_QUIZ_API.js'
import _ from 'lodash'
import moment from 'moment'
import {searchByAdmin, searchByAdminSummary, searchByUserSummary} from '@/api/REPORT_QUIZ_API.js'

export const quizReportStore = defineStore('quizReportStore', {
  state: () => ({
    advertiser: {
      searchParams: {
        advertiserSeq: null,
        page: 1,
        size: 20,
        searchDate: [moment().add(-10, 'days').format('YYYYMMDD'), moment().format('YYYYMMDD')]
      },
      list: [],
      summary: [],
      total: 0
    },
    partner: {
      searchParams: {
        partnerSeq: null,
        page: 1,
        size: 20,
        searchDate: [moment().add(-10, 'days').format('YYYYMMDD'), moment().format('YYYYMMDD')]

      },
      list: [],
      summary: [],
      total: 0
    },
    admin: {
      searchParams: {
        page: 1,
        size: 20,
        searchDate: [moment().add(-10, 'days').format('YYYYMMDD'), moment().format('YYYYMMDD')]
      },
      list: [],
      summary: [],
      total: 0
    },
    user: {
      searchParams: {
        page: 1,
        size: 20,
        userKey: null,
        campaignName: null,
        campaignCode: null,
        searchDate: [moment().add(-10, 'days').format('YYYYMMDD'), moment().format('YYYYMMDD')]
      },
      list: [],
      summary: [],
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
        searchDate: [moment().add(-10, 'days').format('YYYYMMDD'), moment().format('YYYYMMDD')]
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
      const summary = await REPORT_QUIZ_API.searchByAdvertiserSummary(searchParams)

      const { content, totalElements } = result

      this.advertiser.searchParams.page = searchParams.page
      this.advertiser.list = content
      this.advertiser.summary = summary
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
        searchDate: [moment().add(-10, 'days').format('YYYYMMDD'), moment().format('YYYYMMDD')]
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
      const summary = await REPORT_QUIZ_API.searchByPartnerSummary(searchParams)

      const { content, totalElements } = result

      this.partner.searchParams.page = searchParams.page
      this.partner.list = content
      this.partner.summary = summary
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
    },

    initByAdmin() {
      this.admin.searchParams = {
        page: 1,
        size: 20,
        userKey: null,
        searchDate: [moment().add(-10, 'days').format('YYYYMMDD'), moment().format('YYYYMMDD')]
      }
    },
    async reloadByAdmin(params) {
      const searchParams = Object.assign(
        params, {
          startDate: this.admin.searchParams.searchDate[0],
          endDate: this.admin.searchParams.searchDate[1]
        }
      )

      const result = await REPORT_QUIZ_API.searchByAdmin(searchParams)
      const summary = await REPORT_QUIZ_API.searchByAdminSummary(searchParams)

      const { content, totalElements } = result

      this.admin.searchParams.page = searchParams.page
      this.admin.list = content
      this.admin.summary = summary
      this.admin.total = totalElements
    },
    async searchByAdmin({ page, size }) {
      const params = {
        page: page,
        size: !size && size > 0 ? size : undefined
      }
      await this.reloadByAdmin(params)
    },
    initByUser() {
      this.user.searchParams = {
        page: 1,
        size: 20,
        userKey: null,
        campaignName: null,
        campaignCode: null,
        searchDate: [moment().add(-10, 'days').format('YYYYMMDD'), moment().format('YYYYMMDD')]
      }
    },
    async reloadByUser(params) {
      const searchParams = Object.assign(
        params, {
          userKey: this.user.searchParams.userKey,
          campaignName: this.user.searchParams.campaignName,
          campaignCode: this.user.searchParams.campaignCode,
          startDate: this.user.searchParams.searchDate[0],
          endDate: this.user.searchParams.searchDate[1]
        }
      )

      const result = await REPORT_QUIZ_API.searchByUser(searchParams)
      const summary = await REPORT_QUIZ_API.searchByUserSummary(searchParams)

      const { content, totalElements } = result

      this.user.searchParams.page = searchParams.page
      this.user.list = content
      this.user.summary = summary
      this.user.total = totalElements
    },
    async searchByUser({ page, size }) {
      const params = {
        page: page,
        size: !size && size > 0 ? size : undefined
      }
      await this.reloadByUser(params)
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
