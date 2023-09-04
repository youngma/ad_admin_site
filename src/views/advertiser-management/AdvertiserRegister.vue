<template>
  <div class="components-container" type="">
    <AdvertiserRegisterForm/>
  </div>
</template>

<script setup>

import AdvertiserRegisterForm from '@/components/AdvertiserManagement/AdvertiserRegisterForm.vue'
import { onMounted } from 'vue'
import { advertiserManagementStore } from '@/store/modules/admin/advertiserManagementStore.js'

defineOptions({
  name: 'AdvertiserRegister'
})

const store = advertiserManagementStore()

onMounted(async() => {
  store.initRegisterForm()
})

</script>

<style scoped lang="scss">

</style>
