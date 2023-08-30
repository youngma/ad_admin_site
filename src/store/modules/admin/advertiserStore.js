import { defineStore } from 'pinia'
import * as ADVERTISER_API from '@/api/ADVERTISER_API'
import _ from 'lodash'

const initData = {
  searchParams: {
    businessName: null,
  }
}

export const advertiserStore = defineStore('advertiserStore', {
  state: () => ({
    searchParams: {
      businessName: null,
      page: 1,
      size: 50,
    },
    advertisers: [],
    selected: [],
    loading: false,
  }),
  getters: {
    options: (state) => state.advertisers.map((item) => {
      return {
        label: item.businessName,
        value: item.advertiserSeq
      }
    }),
    advertiser: (state) => state.advertisers.filter((t) => {
      return state.selected.includes(t.advertiserSeq)
    })[0]
  },
  actions: {
    init() {
      this.searchParams = {
        businessName: null,
      }
      this.selected = []
      this.advertisers = []
    },
    async reload() {
      const result = await ADVERTISER_API.search(this.searchParams)
      const { content, totalElements } = result
      this.advertisers = content
      this.total = totalElements
    },
    async search(query) {

      this.searchParams.businessName = query
      this.searchParams.page = 1
      this.searchParams.size = 50
      await this.reload()
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'advertiser',
        storage: localStorage
      }
    ]
  }
}, {
})
