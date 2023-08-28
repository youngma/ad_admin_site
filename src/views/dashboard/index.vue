<template>
  <div class="dashboard-container">
    <component :is="currentRole === 'editorDashboard' ? editorDashboard : adminDashboard" />
  </div>
</template>

<script setup>
import adminDashboard from './admin/index.vue'
import editorDashboard from './editor/index.vue'

import { authStore } from '@/store/modules/core/auth.js'
import { ref, onMounted } from 'vue'

defineOptions({
  name: 'DashBoard'
})

const currentRole = ref('adminDashboard')

const auth = authStore()

onMounted(() => {
  if (!auth.status.roles.includes('ADMIN')) {
    currentRole.value = 'editorDashboard'
  }
})

// export default {
//   name: 'DashboardMain',
//   components: { adminDashboard, editorDashboard },
//   setup() {
//   },
//   data() {
//     return {
//       currentRole: 'adminDashboard'
//     }
//   },
//   computed: {
//     const auth = authStore();
//
//     role() { return this.status.roles }
//   },
//   created() {
//     if (!this.role.includes('ADMIN')) {
//       this.currentRole = 'editorDashboard'
//     }
//   }
// }
</script>
