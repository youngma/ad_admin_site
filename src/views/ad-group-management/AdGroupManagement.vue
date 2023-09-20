<template>
  <div class="components-container" type="">
    <PartnerSearchForm2
      title="광고 그룹 조회"
      class="select-width-full"
      :multiple=true
      :selected="selected"
      :partners="partners"
      :multiple-limit=5
      @search-update="searchUpdate"
      @on-change="onChange"
    />
    <AdGroupSearchForm/>
    <AdGroupDataTable/>
  </div>
</template>

<script setup>

import PartnerSearchForm2 from '@/components/ParnterManagement/PartnerSearchForm2.vue'
import AdGroupSearchForm from '@/components/AdGroupManagement/AdGroupSearchForm.vue'
import AdGroupDataTable from '@/components/AdGroupManagement/AdGroupDataTable.vue'

import { adGroupStore } from '@/store/modules/admin/adGroupStore.js'

import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const store = adGroupStore()
const { selected, partners } = storeToRefs(store)

function searchUpdate({ content, current }) {
  partners.value = content
  selected.value = current
}

function onChange(value) {
  selected.value = value
}

onMounted(async() => {
})

</script>

<style scoped lang="scss">

</style>
