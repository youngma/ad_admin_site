import { defineStore } from 'pinia'
import * as COMMON_API from '@/api/COMMON_API'
import _ from 'lodash'

export const commonStore = defineStore('commonStore', {
  state: () => ({
    codes: {
    }
  }),
  getters: {
    UserStatus: (state) => {
      return state.codes['UserStatus']
    },
    Bank: (state) => {
      return state.codes['Bank']
    },
    PaymentTerms: (state) => {
      return state.codes['PaymentTerms']
    },
    CampaignType: (state) => {
      return state.codes['CampaignType']
    },
    CampaignStatus: (state) => {
      return state.codes['CampaignStatus']
    },
    AdGroupStatus: (state) => {
      return state.codes['AdGroupStatus']
    }
  },
  actions: {
    async loadCode() {
      this.codes = await COMMON_API.loadCode()
    },
    toMap(codeName) {
      return _.mapValues(_.keyBy(this.codes[codeName], 'key'), 'value')
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'commonStore',
        storage: localStorage
      }
    ]
  }
}, {
})
