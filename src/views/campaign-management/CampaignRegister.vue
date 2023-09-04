
<template>
  <div class="components-container">
    <AdvertiserSearchForm2 title="캠페인 등록" :multiple=false :selected="selected" :advertisers="advertisers" @search-update="searchUpdate" @on-change="onChange"/>
    <CampaignRegisterForm v-if="selected.length > 0 && selected[0] !== null" />
    <el-alert v-else title="광고주를 선택해 주세요." type="info" />
  </div>
</template>

<script setup>

import CampaignRegisterForm from '@/components/AdCampaignManagement/CampaignRegisterForm.vue'

import { campaignStore } from '@/store/modules/admin/campaignStore.js'
import { onMounted } from 'vue'
import AdvertiserSearchForm2 from '@/components/AdvertiserManagement/AdvertiserSearchForm2.vue'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'CampaignRegister'
})

const store = campaignStore()
const { selected, advertisers } = storeToRefs(store)

onMounted(async() => {
  // store.init('register')
})

function searchUpdate({ content, current }) {
  advertisers.value = content
  selected.value = [current]
}

function onChange(value) {
  selected.value = [value]
}

</script>

<style scoped lang="scss">

</style>
