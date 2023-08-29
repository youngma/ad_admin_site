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
    }
  },
  actions: {
    async loadCode() {
      this.codes = await COMMON_API.loadCode()
    },
    toMap(codeName) {
      console.log(this.codes)
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
