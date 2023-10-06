<template>
  <div class="" type="">
    <CampaignSearchFormTab/>
    <CampaignDataTable
      :list="campaigns.list"
      :total="campaigns.total"
      :page="campaigns.searchParams.page"
      :size="campaigns.searchParams.size"
      referrer="/advertiser-management/detail"
    />
    <el-row class="mt_15" justify="end">
      <el-col class="t_r comm_form_box" tag="span">
        <el-button type="success" class="comm_form_btn" @click="goRegisterForm()">등록</el-button>
      </el-col>
    </el-row>
<!--    <AdvertiserAccountRegisterModal v-if="campaignRegisterModal" />-->
  </div>
</template>

<script lang="js">
import CampaignSearchFormTab from '@/components/AdvertiserManagement/Campaign/CampaignSearchFormTab.vue'
import CampaignDataTable from '@/components/AdCampaignManagement/CampaignDataTable.vue'
import { advertiserStore } from '@/store/modules/admin/advertiserStore.js'

import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

export default {
  components: {
    CampaignSearchFormTab, CampaignDataTable
  },
  props: {
  },
  setup(props) {
    const store = advertiserStore()
    const router = useRouter()

    const { campaigns, selected } = storeToRefs(store)
    onMounted(async() => {
    })

    return {
      store, campaigns, selected, router
    }
  },
  methods: {
    goRegisterForm() {
      this.store.initRegisterForm('campaigns')
      this.router.push({
        name: 'AdCampaignRegister',
        query: {
          referrer: '/advertiser-management/detail',
          init: false
        }
      })
    },
    async search({ page, size }) {
      await this.store.searchByCampaigns({ selected: this.selected, page, size })
    }
  }

}

</script>

<style lang="scss" scoped>
</style>

