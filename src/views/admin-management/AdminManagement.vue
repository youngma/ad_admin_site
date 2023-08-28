<template>
  <div class="components-container" type="">
    <SearchForm/>
    <DataTable/>
  </div>
</template>

<script lang="js">
import SearchForm from '@/components/AdminManagement/SearchForm.vue'
import DataTable from '@/components/AdminManagement/DataTable.vue'
import { onMounted } from 'vue'
import { adminManagementStore } from '@/store/modules/admin/adminManagementStore.js'

export default {
  components: {
    SearchForm, DataTable
  },
  props: {
  },
  setup(props) {

    const store = adminManagementStore()

    onMounted(async() => {
      await store.search({ page: 1 })
    })
  }
}

</script>

<style lang="scss" scoped>
</style>

