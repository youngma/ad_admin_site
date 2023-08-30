<template>
  <div class="components-container" type="">
    <RegisterForm/>
  </div>
</template>

<script setup>

import RegisterForm from '@/components/AdvertiserManagement/RegisterForm.vue'
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
