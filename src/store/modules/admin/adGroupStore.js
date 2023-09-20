import { defineStore } from 'pinia'
import { partnerStore } from '@/store/modules/admin/partnerStore.js'

import * as PARTNER_API from '@/api/PARTNER_API.js'
import _ from 'lodash'
import { ElMessage } from 'element-plus'

export const adGroupStore = defineStore('adGroupStore', {
  state: () => ({
    searchParams: {
      adType: null,
      groupName: null,
      groupCode: null,
      groupStatus: null,
      page: 1,
      size: 20
    },

    partners: [],
    selected: [],

    adGroups: [],
    total: 0,

    adGroupRegisterModal: false,
    adGroupModifyModal: false
  }),
  getters: {

  },
  actions: {
    init(type) {
      if (type === 'search') {
        this.searchParams = {
          adType: null,
          groupName: null,
          groupCode: null,
          groupStatus: null,
          page: 1,
          size: 20
        }
        this.partners = []
        this.selected = []
      }
      if (type === 'register') {

      }
    },
    generateParams(source) {
      return Object.assign({
        partnerSeq: this.partner.partnerSeq
      }, source)
    },
    tabInitAdGroup() {
      this.partnerStore.tabInitAdGroup()
    },
    pageChange(number) {
      this.partnerStore.searchByAdGroups({ page: number })
    },
    initAdGroup() {
      this.searchParams = {
        size: 20,
        groupName: '',
        groupCode: null,
        adType: '',
        groupStatus: ''
      }
      this.adGroups = []
      this.total = 0
    },
    async reloadByAdGroups() {
      const searchParams = Object.assign(
        {
          partnerSeq: this.selected.join(',')
        },
        this.searchParams)

      const result = await PARTNER_API.searchByAdGroups(searchParams)
      const { content, totalElements } = result

      this.adGroups = content
      this.total = totalElements
    },
    async searchByAdGroups({ page, size }) {
      this.searchParams.page = page
      if (!size && size > 0) {
        this.searchParams.size = size
      }
      await this.reloadByAdGroups()
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'adGroups',
        storage: localStorage
      }
    ]
  }
}, {
})
