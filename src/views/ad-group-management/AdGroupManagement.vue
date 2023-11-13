<template>
  <div class="components-container" type="">
    <PartnerSearchForm2
      title="광고 지면 조회"
      class="select-width-full"
      :multiple=true
      :selected="selected"
      :partners="partners"
      :multiple-limit=5
      @search-update="searchUpdate"
      @on-change="onChange"
    />
    <AdGroupSearchForm @search-call="({ page, size }) => search({ page, size })"/>
    <AdGroupDataTable
      :list="list"
      :total="total"
      :page="page"
      :size="size"
      referrer="/ad-group-management/search"
      @search-call="({ page, size }) => search({ page, size })"
   />
  </div>
</template>

<script setup>

import PartnerSearchForm2 from '@/components/ParnterManagement/PartnerSearchForm2.vue'
import AdGroupSearchForm from '@/components/AdGroupManagement/AdGroupSearchForm.vue'
import AdGroupDataTable from '@/components/AdGroupManagement/AdGroupDataTable.vue'
import { adGroupStore } from '@/store/modules/admin/adGroupStore.js'
import { onMounted, ref } from 'vue'

// const store = adGroupStore()

const selected = ref([])
const partners = ref([])

const list = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(20)

// const { selected, partners } = storeToRefs(store)

function searchUpdate({ content, current }) {
  partners.value = content
  selected.value = current
}

function onChange(value) {
  selected.value = value
}

async function search({ page, size }) {
  const { content, totalElements } = await adGroupStore().searchByAdGroups({ selected, page, size })
  list.value = content
  total.value = totalElements
}

onMounted(() => {
  search({ page, size })
})

</script>

