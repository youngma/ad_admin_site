<template>
  <div class="components-container" type="">
    <AdminRegisterForm/>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import AdminRegisterForm from '@/components/AdminManagement/AdminRegisterForm.vue'
import { adminManagementStore } from '@/store/modules/admin/adminManagementStore.js'

defineOptions({
  name: 'AdminRegister'
})

const store = adminManagementStore()

onMounted(async() => {
  store.initRegisterForm()
})

</script>

<style lang="scss" scoped>
</style>

