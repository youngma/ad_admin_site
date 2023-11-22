<template>
  <div class="components-container" type="">
    <AdvertiserSearchForm2
      title="캠페인 조회"
      class="select-width-full"
      :multiple=true
      :selected="selected"
      :advertisers="advertisers"
      :multiple-limit=5
      @search-update="searchUpdate"
      @on-change="onChange"
    />
    <CampaignSearchForm @search-call="({ page, size }) => search({ page, size })"/>
    <CampaignDataTable
      :list="list"
      :total="total"
      :page="page"
      :size="size"
      referrer="/campaign-management/search"
      @search-call="({ page, size }) => search({ page, size })"
    />
  </div>
</template>

<script setup>

import CampaignSearchForm from '@/components/AdCampaignManagement/CampaignSearchForm.vue'
import AdvertiserSearchForm2 from '@/components/AdvertiserManagement/AdvertiserSearchForm2.vue'
import CampaignDataTable from '@/components/AdCampaignManagement/CampaignDataTable.vue'
import { campaignStore } from '@/store/modules/admin/campaignStore.js'
import { onMounted, ref } from 'vue'

const selected = ref([])
const advertisers = ref([])

const list = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(20)

function searchUpdate({ content, current }) {
  advertisers.value = content
  selected.value = current
}

function onChange(value) {
  selected.value = value
}

async function search({ page, size }) {
  console.log(selected)
  const { content, totalElements } = await campaignStore().search({ selected, page, size })
  list.value = content
  total.value = totalElements
}




onMounted(async() => {
})

</script>

<style scoped lang="scss">

</style>
