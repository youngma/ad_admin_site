<template>
  <div class="components-container" type="">
    <AdminSearchForm/>
    <AdminDataTable/>
  </div>
</template>

<script lang="js">
import AdminSearchForm from '@/components/AdminManagement/AdminSearchForm.vue'
import AdminDataTable from '@/components/AdminManagement/AdminDataTable.vue'
import { onMounted } from 'vue'
import { adminManagementStore } from '@/store/modules/admin/adminManagementStore.js'

export default {
  components: {
    AdminSearchForm, AdminDataTable
  },
  props: {
  },
  setup(props) {
    const store = adminManagementStore()

    onMounted(async() => {
      store.init()
      await store.search({ page: 1 })
    })
  }
}

</script>

<style lang="scss" scoped>
</style>

