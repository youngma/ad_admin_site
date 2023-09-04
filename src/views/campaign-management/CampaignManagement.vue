<template>
  <div class="components-container" type="">
    <AdvertiserSearchForm2
      title="캠페인 조회"
      class="select-width-full"
      :multiple=true
      :selected="searchFormSelected"
      :advertisers="searchFormAdvertisers"
      :multiple-limit=5
      @search-update="searchUpdate"
      @on-change="onChange"
    />
    <CampaignSearchForm/>
    <CampaignDataTable/>
  </div>
</template>

<script setup>

import CampaignSearchForm from '@/components/AdCampaignManagement/CampaignSearchForm.vue'
import CampaignDataTable from '@/components/AdCampaignManagement/CampaignDataTable.vue'
import { onMounted } from 'vue'
import { campaignStore } from '@/store/modules/admin/campaignStore.js'
import AdvertiserSearchForm2 from '@/components/AdvertiserManagement/AdvertiserSearchForm2.vue'
import { storeToRefs } from 'pinia'

const store = campaignStore()
const { searchFormSelected, searchFormAdvertisers } = storeToRefs(store)

function searchUpdate({ content, current }) {
  searchFormAdvertisers.value = content
  searchFormSelected.value = current
}

function onChange(value) {
  searchFormSelected.value = value
}

onMounted(async() => {
})

</script>

<style scoped lang="scss">

</style>
