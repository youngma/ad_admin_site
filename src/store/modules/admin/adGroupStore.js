import { defineStore } from 'pinia'
import { partnerStore } from '@/store/modules/admin/partnerStore.js'

import * as PARTNER_API from '@/api/PARTNER_API.js'
import _ from 'lodash'
import { ElMessage } from 'element-plus'

export const adGroupStore = defineStore('adGroupStore', {
  state: () => ({
    searchParams: {
      groupName: '',
      groupCode: null,
      adType: '',
      groupStatus: ''
    },

    // partners: [],
    // selected: [],

    // adGroups: [],
    // total: 0,

    adGroupRegisterModal: false,
    adGroupModifyModal: false
  }),
  getters: {

  },
  actions: {
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
    async reloadByAdGroups(params) {
      const searchParams = Object.assign(
        params,
        this.searchParams
      )

      const result = await PARTNER_API.searchByAdGroups(searchParams)
      const { content, totalElements } = result

      return { content, totalElements }
    },
    async searchByAdGroups({ selected, page, size }) {
      const params = {
        partnerSeq: selected.value.join(','),
        page: page,
        size: !size && size > 0 ? size : undefined
      }
      return await this.reloadByAdGroups(params)
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
