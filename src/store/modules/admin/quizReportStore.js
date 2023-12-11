import { defineStore } from 'pinia'
import * as REPORT_QUIZ_API from '@/api/REPORT_QUIZ_API.js'
import _ from 'lodash'
import moment from 'moment'
import {
  searchByAdmin,
  searchByAdminSummary,
  searchByPartnerExcel,
  searchByUserExcel,
  searchByUserSummary
} from '@/api/REPORT_QUIZ_API.js'

export const quizReportStore = defineStore('quizReportStore', {
  state: () => ({
    advertiser: {
      searchParams: {
        advertiserSeq: null,
        campaignName: null,
        campaignCode: null,
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
        groupName: null,
        groupCode: null,
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
    xcode: {
      searchParams: {
        page: 1,
        size: 20,
        groupName: null,
        groupCode: null,
        campaignName: null,
        campaignCode: null,
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
        campaignName: null,
        campaignCode: null,
        page: 1,
        size: 20,
        searchDate: [moment().add(-10, 'days').format('YYYYMMDD'), moment().format('YYYYMMDD')]
      }
    },
    async reloadByAdvertiser(params) {
      const searchParams = Object.assign(
        params, {
          startDate: this.advertiser.searchParams.searchDate[0],
          endDate: this.advertiser.searchParams.searchDate[1],
          advertiserSeq: this.advertiser.searchParams.advertiserSeq,
          campaignName: this.advertiser.searchParams.campaignName,
          campaignCode: this.advertiser.searchParams.campaignCode
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
    async excelByAdvertiser(params) {
      const searchParams = Object.assign(
        params, {
          startDate: this.advertiser.searchParams.searchDate[0],
          endDate: this.advertiser.searchParams.searchDate[1],
          advertiserSeq: this.advertiser.searchParams.advertiserSeq,
          campaignName: this.advertiser.searchParams.campaignName,
          campaignCode: this.advertiser.searchParams.campaignCode
        }
      )

      const { data, headers } = await REPORT_QUIZ_API.searchByAdvertiserExcel(searchParams)
      this.downExcel(data, headers)
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
        groupName: null,
        groupCode: null,
        page: 1,
        size: 20,
        searchDate: [moment().add(-10, 'days').format('YYYYMMDD'), moment().format('YYYYMMDD')]
      }
    },
    async reloadByPartner(params) {
      const searchParams = Object.assign(
        params, {
          startDate: this.partner.searchParams.searchDate[0],
          endDate: this.partner.searchParams.searchDate[1],
          groupName: this.partner.searchParams.groupName,
          groupCode: this.partner.searchParams.groupCode,
          partnerSeq: this.partner.searchParams.partnerSeq
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
    async excelByPartner(params) {
      const searchParams = Object.assign(
        params, {
          startDate: this.partner.searchParams.searchDate[0],
          endDate: this.partner.searchParams.searchDate[1],
          groupName: this.partner.searchParams.groupName,
          groupCode: this.partner.searchParams.groupCode,
          partnerSeq: this.partner.searchParams.partnerSeq
        }
      )

      const { data, headers } = await REPORT_QUIZ_API.searchByPartnerExcel(searchParams)
      this.downExcel(data, headers)
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
    async excelByAdmin(params) {
      const searchParams = Object.assign(
        params, {
          startDate: this.admin.searchParams.searchDate[0],
          endDate: this.admin.searchParams.searchDate[1]
        }
      )

      const { data, headers } = await REPORT_QUIZ_API.searchByAdminExcel(searchParams)
      this.downExcel(data, headers)
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
    },
    async excelByUser(params) {
      const searchParams = Object.assign(
        params, {
          userKey: this.user.searchParams.userKey,
          campaignName: this.user.searchParams.campaignName,
          campaignCode: this.user.searchParams.campaignCode,
          startDate: this.user.searchParams.searchDate[0],
          endDate: this.user.searchParams.searchDate[1]
        }
      )
      const { data, headers } = await REPORT_QUIZ_API.searchByUserExcel(searchParams)
      this.downExcel(data, headers)
    },

    initByXCode() {
      this.xcode.searchParams = {
        page: 1,
        size: 20,
        campaignName: null,
        campaignCode: null,
        groupCode: null,
        groupName: null,
        searchDate: [moment().add(-10, 'days').format('YYYYMMDD'), moment().format('YYYYMMDD')]
      }
    },
    async reloadByXCode(params) {
      const searchParams = Object.assign(
        params, {
          campaignName: this.xcode.searchParams.campaignName,
          campaignCode: this.xcode.searchParams.campaignCode,
          groupCode: this.xcode.searchParams.groupCode,
          groupName: this.xcode.searchParams.groupName,
          startDate: this.user.searchParams.searchDate[0],
          endDate: this.user.searchParams.searchDate[1]
        }
      )

      const result = await REPORT_QUIZ_API.searchByXCode(searchParams)
      const summary = await REPORT_QUIZ_API.searchByXCodeSummary(searchParams)

      const { content, totalElements } = result

      this.xcode.searchParams.page = searchParams.page
      this.xcode.list = content
      this.xcode.summary = summary
      this.xcode.total = totalElements
    },
    async searchByXCode({ page, size }) {
      const params = {
        page: page,
        size: !size && size > 0 ? size : undefined
      }
      await this.reloadByXCode(params)
    },
    async excelByXCode(params) {
      const searchParams = Object.assign(
        params, {
          campaignName: this.xcode.searchParams.campaignName,
          campaignCode: this.xcode.searchParams.campaignCode,
          groupCode: this.xcode.searchParams.groupCode,
          groupName: this.xcode.searchParams.groupName,
          startDate: this.user.searchParams.searchDate[0],
          endDate: this.user.searchParams.searchDate[1]
        }
      )
      const { data, headers } = await REPORT_QUIZ_API.searchByXCodeExcel(searchParams)
      this.downExcel(data, headers)
    },

    downExcel(data, headers) {
      const blob = new Blob([data], {
        type: headers['content-type']
      })
      const blobUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      const filename = headers['content-disposition']
        .split('filename=')[1]
        .split('.')[0]
      link.download = filename // 확장자는 굳이 추가하지 않아도 .xlsx로 다운로드됨
      link.click()
      URL.revokeObjectURL(blobUrl)
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
