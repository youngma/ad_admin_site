
<template>

  <div class="components-container">
    {{  selected }}
    <AdvertiserSearchForm2
      ref="adCampaignRegisterSearchForm"
      title="캠페인 등록"
      :multiple=false
      :multiple-limit=1
      :selected="selected"
      :advertisers="advertisers"
      @search-update="({ content, current }) => searchUpdate({ content, current })"
      @on-change="(value) => onSearchChange(value)"
    />
    <CampaignRegisterForm v-if="selected.length > 0 && selected[0] !== null" />
    <el-alert v-else title="광고주를 선택해 주세요." type="info" />
  </div>
</template>

<script setup>

import AdvertiserSearchForm2 from '@/components/AdvertiserManagement/AdvertiserSearchForm2.vue'
import CampaignRegisterForm from '@/components/AdCampaignManagement/CampaignRegisterForm.vue'

import { advertiserStore } from '@/store/modules/admin/advertiserStore.js'

import {onActivated, onBeforeMount, ref} from 'vue'
import { storeToRefs } from 'pinia'
import PartnerSearchForm2 from '@/components/ParnterManagement/PartnerSearchForm2.vue'

defineOptions({
  name: 'CampaignRegister'
})
const adCampaignRegisterSearchForm = ref(null)
const store = advertiserStore()

const { selected, advertisers } = storeToRefs(store)

function searchUpdate({ content, current }) {
  this.store.setAdvertisers({
    advertisers: content,
    selected: current
  })
}
function onSearchChange(value) {
  this.store.setAdvertiserSeq({ selected: value })
}

function searchFormInit() {
  adCampaignRegisterSearchForm.value.initSet(selected.value, advertisers.value)
}

onActivated(() => {
  searchFormInit()
})

</script>

<style scoped lang="scss">

</style>
