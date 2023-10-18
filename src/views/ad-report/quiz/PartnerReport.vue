<template>
  <div class="components-container" type="">
    <PartnerDailyReportSearchForm/>
    <PartnerDailyReportDataTable/>
  </div>
</template>

<script setup>

import PartnerDailyReportSearchForm from '@/components/AdQuizReport/Partner/ReportSearchForm.vue'
import PartnerDailyReportDataTable from '@/components/AdQuizReport/Partner/ReportDataTable.vue'
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
