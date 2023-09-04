<template>
  <div class="components-container" type="">
    <AdvertiserSearchForm/>
    <AdvertiserDataTable/>
  </div>
</template>

<script setup>

import AdvertiserSearchForm from '@/components/AdvertiserManagement/AdvertiserSearchForm.vue'
import AdvertiserDataTable from '@/components/AdvertiserManagement/AdvertiserDataTable.vue'
import { onMounted } from 'vue'
import { advertiserManagementStore } from '@/store/modules/admin/advertiserManagementStore.js'

const store = advertiserManagementStore()

onMounted(async() => {
  store.init()
  await store.search({ page: 1 })
})

</script>

<style scoped lang="scss">

</style>
