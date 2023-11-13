<template>
  <div class="components-container" type="">
    <AdminDailyReportSearchForm/>
    <AdminDailyReportDataTable/>
  </div>
</template>

<script setup>

import AdminDailyReportSearchForm from '@/components/AdQuizReport/Admin/ReportSearchForm.vue'
import AdminDailyReportDataTable from '@/components/AdQuizReport/Admin/ReportDataTable.vue'
import { onBeforeMount } from 'vue'
import { quizReportStore } from '@/store/modules/admin/quizReportStore.js'

const store = quizReportStore()

onBeforeMount(async() => {
  // quizReportStore().initByAdvertiser()
  // await quizReportStore().searchByAdvertiser({ page: 1 })
})

</script>

<style scoped lang="scss">

</style>
