<template>
  <el-table
    :data="partner.list"
    class="custom-table"
    style="width: 100%"
  >
    <el-table-column  prop="rptDate" label="리포팅 일자" width="150" header-align="center" align="center" >
      <template #default="scope">
        {{dateFormatter(scope.row.rptDate) }}
      </template>
    </el-table-column>
    <el-table-column  prop="businessName" label="파트너 명" width="150" header-align="center" align="center" />
    <el-table-column  prop="groupCode" label="지면 코드" width="150" header-align="center" align="center" />
    <el-table-column  prop="groupName" label="지면 명" width="150" header-align="center" align="center" />
    <el-table-column  prop="reqCnt" label="광고 요청 건"  header-align="center" align="right" >
      <template #default="scope">
        {{moneyFormatter(scope.row.reqCnt) }} 건
      </template>
    </el-table-column>
    <el-table-column  prop="impressionCnt" label="광고 노출 건" header-align="center" align="right" >
      <template #default="scope">
        {{moneyFormatter(scope.row.impressionCnt) }} 건
      </template>
    </el-table-column>d
    <el-table-column  prop="hintCnt" label="힌트 클릭 건" header-align="center" align="right" >
      <template #default="scope">
        {{moneyFormatter(scope.row.hintCnt) }} 건
      </template>
    </el-table-column>
    <el-table-column  prop="clickCnt" label="정답 클릭 건"  header-align="center" align="right" >
      <template #default="scope">
        {{moneyFormatter(scope.row.answerCnt) }} 건
      </template>
    </el-table-column>
  </el-table>

  <div class="page-box">
    <el-pagination
      :page-size="partner.searchParams.size"
      :current-page="partner.searchParams.page"
      background
      :default-current-page=1
      :default-page-size=20
      :total="partner.total"
      layout="prev, pager, next"
      class="mt-4"
      @size-change="(v) => pageChange(v)"
      @current-change="(v) => pageChange(v)"
    />
  </div>
</template>

<script setup>

import { quizReportStore } from '@/store/modules/admin/quizReportStore.js'
import { storeToRefs } from 'pinia'
import { dateFormatter, moneyFormatter } from '@/utils/customElTableFormatter.js'

defineOptions({
  name: 'PartnerDailyReportDataTable'
})

const store = quizReportStore()

const { partner } = storeToRefs(store)

function pageChange(number) {
  store.searchByPartner({ page: number })
}

</script>

<style scoped lang="scss">

</style>
