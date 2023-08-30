<template>
  <div class="components-container" type="">
    <SearchForm/>
    <DataTable/>
  </div>
</template>

<script setup>

import SearchForm from '@/components/AdvertiserManagement/SearchForm.vue'
import DataTable from '@/components/AdvertiserManagement/DataTable.vue'
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
