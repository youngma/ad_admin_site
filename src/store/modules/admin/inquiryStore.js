import { defineStore } from 'pinia'
import * as INQUIRY_API from '@/api/INQUIRY_API.js'
import moment from 'moment'
import * as CAMPAIGN_API from '@/api/CAMPAIGN_API.js'
export const inquiryStore = defineStore('inquiryStore', {
  state: () => ({
    searchParams: {
      page: 1,
      size: 20,
      searchType: 'advertiserName',
      searchText: '',
      inquiryStatus: 'ALL',
      searchDate: [moment().add(-10, 'days').format('YYYY-MM-DD'), moment().add(0, 'days').format('YYYY-MM-DD')]
    },
    list: [],
    modal: false,
    selected: null,
    total: 0
  }),
  getters: {
  },
  actions: {
    init() {
      this.searchParams = {
        page: 1,
        size: 20,
        searchType: 'advertiserName',
        searchText: '',
        inquiryStatus: 'ALL',
        searchDate: [moment().add(-10, 'days').format('YYYY-MM-DD'), moment().add(0, 'days').format('YYYY-MM-DD')]
      }
    },
    async reload(params) {
      const searchParams = Object.assign(
        params, {
          searchType: this.searchParams.searchType,
          searchText: this.searchParams.searchText,
          inquiryStatus: this.searchParams.inquiryStatus,
          startDate: this.searchParams.searchDate[0] + ' 00:00:01',
          endDate: this.searchParams.searchDate[1] + ' 23:59:59'
        }
      )

      const result = await INQUIRY_API.search(searchParams)
      const { content, totalElements } = result

      this.list = content
      this.total = totalElements
    },
    async search({ page, size }) {
      const params = {
        page: page,
        size: !size && size > 0 ? size : undefined
      }

      if (page) {
        this.searchParams.page = page
      }

      await this.reload(params)
    },
    setRow(row) {
      this.selected = row
      this.modal = true
    },
    registerAnswer() {
      const { seq, answer } = this.selected
      INQUIRY_API.answer({
        seq, answer
      }).then(() => {
        this.$alert('답변이 등록 되었습니다.', '확인', {})

        const params = {
          page: this.searchParams.page,
          size: this.searchParams.size
        }

        this.reload(params).then(() => {
          this.modal = false
        })
      }).catch((e) => {
        this.$alert('답변 등록 중 오류가 발생 했습니다.', '확인', {})
      })
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'inquiryStore',
        storage: localStorage
      }
    ]
  }
}, {
})
