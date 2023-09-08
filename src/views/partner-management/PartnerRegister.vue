<template>
  <div class="components-container" type="">
    <PartnerRegisterForm/>
  </div>
</template>

<script setup>

import PartnerRegisterForm from '@/components/ParnterManagement/PartnerRegisterForm.vue'
import { onMounted } from 'vue'
import { partnerManagementStore } from '@/store/modules/admin/partnerManagementStore.js'

defineOptions({
  name: 'AdvertiserRegister'
})

const store = partnerManagementStore()

onMounted(async() => {
  store.initRegisterForm()
})

</script>

<style scoped lang="scss">

</style>
