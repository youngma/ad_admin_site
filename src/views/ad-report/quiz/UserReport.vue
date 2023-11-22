<template>
  <div class="components-container" type="">
    <UserRawReportSearchForm/>
    <UserRawReportDataTable/>
  </div>
</template>

<script setup>

import UserRawReportSearchForm from '@/components/AdQuizReport/User/ReportSearchForm.vue'
import UserRawReportDataTable from '@/components/AdQuizReport/User/ReportDataTable.vue'
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
