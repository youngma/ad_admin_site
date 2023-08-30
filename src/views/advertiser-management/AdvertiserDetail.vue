<template>
  <div class="components-container" type="">
    <SearchForm2 />
  </div>
</template>

<script setup>

import { onMounted } from 'vue'
import SearchForm2 from '@/components/AdvertiserManagement/SearchForm2.vue'
import { advertiserStore } from '@/store/modules/admin/advertiserStore.js'

defineOptions({
  name: 'AdvertiserDetail'
})

const store = advertiserStore();

onMounted(async() => {
  store.init()
})

</script>

<style scoped lang="scss">

</style>
