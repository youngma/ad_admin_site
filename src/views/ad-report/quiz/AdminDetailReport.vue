<template>
  <div class="components-container" type="">
    <AdminDetailReportSearchForm/>
    <AdminDailyReportDataTable/>
  </div>
</template>

<script setup>

defineComponent({
  name: 'AdminDetailReport'
})

import AdminDetailReportSearchForm from '@/components/AdQuizReport/AdminDetail/ReportSearchForm.vue'
import AdminDailyReportDataTable from '@/components/AdQuizReport/AdminDetail/ReportDataTable.vue'
import { defineComponent, onBeforeMount } from 'vue'
import { quizReportStore } from '@/store/modules/admin/quizReportStore.js'

const store = quizReportStore()

onBeforeMount(async() => {
  // quizReportStore().initByAdvertiser()
  // await quizReportStore().searchByAdvertiser({ page: 1 })
})

</script>

<style scoped lang="scss">

</style>
