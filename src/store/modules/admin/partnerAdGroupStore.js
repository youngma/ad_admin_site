import { defineStore } from 'pinia'
import * as PARTNER_API from '@/api/PARTNER_API.js'
import _ from 'lodash'
import { ElMessage } from 'element-plus'

const initData = {
  searchParams: {
    businessName: null
  }
}

export const partnerAdGroupStore = defineStore('partnerAdGroupStore', {
  state: () => ({
    searchParams: {
      adType: null,
      groupName: null,
      groupCode: null,
      groupStatus: null,
      page: 1,
      size: 20
    },
    partner: null,
    selected: null,
    adGroups: [],
    adGroupRegisterModal: false,
    adGroupModifyModal: false
  }),
  getters: {
  },
  actions: {
    generateParams(params) {
      const { partnerSeq } = this.partner
      return Object.assign({
        partnerSeq
      }, params)
    },
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
      }
      if (type === 'register') {

      }
    },
    search() {

    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'partnerAdGroups',
        storage: localStorage
      }
    ]
  }
}, {
})
