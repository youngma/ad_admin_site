<template>
  <div class="components-container" type="">
    <RegisterForm/>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import RegisterForm from '@/components/AdminManagement/RegisterForm.vue'
import { adminManagementStore } from '@/store/modules/admin/adminManagementStore.js'

defineOptions({
  name: 'RegisterForm'
})

const store = adminManagementStore()

onMounted(async() => {
  store.initRegisterForm()
})

</script>

<style lang="scss" scoped>
</style>

