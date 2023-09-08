<template>
  <div class="components-container" type="">
    <PartnerSearchForm/>
    <PartnerDataTable/>
  </div>
</template>

<script setup>

import PartnerSearchForm from '@/components/ParnterManagement/PartnerSearchForm.vue'
import PartnerDataTable from '@/components/ParnterManagement/PartnerDataTable.vue'



import { onMounted } from 'vue'
import { partnerManagementStore } from '@/store/modules/admin/partnerManagementStore.js'

const store = partnerManagementStore()

onMounted(async() => {
  store.init()
  await store.search({ page: 1 })
})

</script>

<style scoped lang="scss">

</style>
