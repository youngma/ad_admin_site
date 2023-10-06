<template>
  <div class="components-container" type="">
    <AdvertiserDailyReportSearchForm/>
    <AdvertiserDailyReportDataTable/>
  </div>
</template>

<script setup>

import AdvertiserDailyReportSearchForm from '@/components/AdQuizReport/Advertiser/ReportSearchForm.vue'
import AdvertiserDailyReportDataTable from '@/components/AdQuizReport/Advertiser/ReportDataTable.vue'
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
