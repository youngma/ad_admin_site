<template>
  <div class="components-container" type="">

  </div>
</template>

<script setup>

import { onMounted } from 'vue'
import { advertiserManagementStore } from '@/store/modules/admin/advertiserManagementStore.js'

defineOptions({
  name: 'AdvertiserDetail'
})

const store = advertiserManagementStore()

onMounted(async() => {
})

</script>

<style scoped lang="scss">

</style>
