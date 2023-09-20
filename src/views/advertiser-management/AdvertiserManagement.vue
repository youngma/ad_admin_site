<template>
  <div class="components-container" type="">
    <AdvertiserSearchForm/>
    <AdvertiserDataTable/>
  </div>
</template>

<script setup>

import AdvertiserSearchForm from '@/components/AdvertiserManagement/AdvertiserSearchForm.vue'
import AdvertiserDataTable from '@/components/AdvertiserManagement/AdvertiserDataTable.vue'
import { onBeforeMount } from 'vue'
import { advertiserManagementStore } from '@/store/modules/admin/advertiserManagementStore.js'

const store = advertiserManagementStore()

onBeforeMount(async() => {
  advertiserManagementStore().init()
  await advertiserManagementStore().search({ page: 1 })
})

</script>

<style scoped lang="scss">

</style>
