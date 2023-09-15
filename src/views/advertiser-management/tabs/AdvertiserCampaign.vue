<template>
  <div class="" type="">
    <CampaignSearchFormTab/>
    <CampaignDataTableTab/>
    <el-row class="mt_15" justify="end">
      <el-col class="t_r comm_form_box" tag="span">
        <el-button type="success" class="comm_form_btn" @click="moveRegisterPage()">등록</el-button>
      </el-col>
    </el-row>
<!--    <AdvertiserAccountRegisterModal v-if="campaignRegisterModal" />-->
  </div>
</template>

<script lang="js">
import CampaignSearchFormTab from '@/components/AdvertiserManagement/Campaign/CampaignSearchFormTab.vue'
import CampaignDataTableTab from '@/components/AdvertiserManagement/Campaign/CampaignDataTableTab.vue'
import { advertiserStore } from '@/store/modules/admin/advertiserStore.js'
import { campaignStore } from '@/store/modules/admin/campaignStore.js'

import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

export default {
  components: {
    CampaignSearchFormTab, CampaignDataTableTab
  },
  props: {
  },
  setup(props) {
    const store = advertiserStore()
    const campaign = campaignStore()
    const router = useRouter()

    const { campaignRegisterModal, advertisers, selected } = storeToRefs(store)
    onMounted(async() => {
    })

    return {
      store, campaign, campaignRegisterModal, router, advertisers, selected
    }
  },
  methods: {
    moveRegisterPage() {
      this.campaign.init('register')
      this.campaign.init('search')

      this.campaign.setAdvertisers({
        advertisers: this.advertisers,
        selected: this.selected
      })

      this.router.push({ name: 'AdCampaignRegister', query: { referrer: '/advertiser-management/detail' }})
    }
  }

}

</script>

<style lang="scss" scoped>
</style>

