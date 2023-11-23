<template>
  <el-table
    :data="admin.list"
    :summary-method="getSummaries"
    show-summary
    class="custom-table"
    style="width: 100%"
  >
    <el-table-column  prop="rptDate" label="리포팅 일자" width="150" header-align="center" align="center" >
      <template #default="scope">
        {{dateFormatter(scope.row.rptDate) }}
      </template>
    </el-table-column>
    <el-table-column  prop="advertiserCnt" label="광고주" header-align="center" align="center" >
      <template #default="scope">
        {{moneyFormatter(scope.row.advertiserCnt) }} 건
      </template>
    </el-table-column>
    <el-table-column  prop="campaignCnt" label="진행 광고 수" header-align="center" align="center" >
      <template #default="scope">
        {{moneyFormatter(scope.row.campaignCnt) }} 건
      </template>
    </el-table-column>
    <el-table-column  prop="partnerCnt" label="매체사" header-align="center" align="center" >
      <template #default="scope">
        {{moneyFormatter(scope.row.partnerCnt) }} 건
      </template>
    </el-table-column>
    <el-table-column  prop="adGroupCnt" label="진행 광고 지면" header-align="center" align="right" >
      <template #default="scope">
        {{moneyFormatter(scope.row.adGroupCnt) }} 건
      </template>
    </el-table-column>
    <el-table-column  prop="reqCnt" label="광고 요청 건" header-align="center" align="right" >
      <template #default="scope">
        {{moneyFormatter(scope.row.reqCnt) }} 건
      </template>
    </el-table-column>
    <el-table-column  prop="impressionCnt" label="광고 노출 건" header-align="center" align="right" >
      <template #default="scope">
        {{moneyFormatter(scope.row.impressionCnt) }} 건
      </template>
    </el-table-column>
    <el-table-column  prop="answerCnt" label="정답 수" header-align="center" align="right" >
      <template #default="scope">
        {{moneyFormatter(scope.row.answerCnt) }} 건
      </template>
    </el-table-column>
    <el-table-column  prop="hintCnt" label="힌트 클릭 건" header-align="center" align="right" >
      <template #default="scope">
        {{moneyFormatter(scope.row.hintCnt) }} 건
      </template>
    </el-table-column>
    <el-table-column  prop="clickCnt" label="광고 클릭 건"  header-align="center" align="right" >
      <template #default="scope">
        {{moneyFormatter(scope.row.clickCnt) }} 건
      </template>
    </el-table-column>

    <el-table-column  prop="adCost" label="광고 금액" width="150" header-align="center" align="right" >
      <template #default="scope">
        {{ moneyFormatter(scope.row.adCost) }}
      </template>
    </el-table-column>
    <el-table-column  prop="partnerCommission" label="파트너 지급 금액"  header-align="center" align="right" >
      <template #default="scope">
        {{moneyFormatter(scope.row.partnerCommission) }} 원
      </template>
    </el-table-column>
    <el-table-column  prop="userCommission" label="사용자 지급 금액"  header-align="center" align="right" >
      <template #default="scope">
        {{moneyFormatter(scope.row.userCommission) }} 원
      </template>
    </el-table-column>

  </el-table>

  <div class="page-box">
    <el-pagination
      :page-size="admin.searchParams.size"
      :current-page="admin.searchParams.page"
      background
      :default-current-page=1
      :default-page-size=20
      :total="admin.total"
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
import { isNumber } from 'element-plus/es/utils/index'

defineOptions({
  name: 'AdminDailyReportDataTable'
})

const store = quizReportStore()

const { admin } = storeToRefs(store)

function pageChange(number) {
  store.searchByAdmin({ page: number })
}

const getSummaries = (param) => {
  const { columns, data } = param
  const { summary } = admin.value
  const sums = []

  columns.forEach((column, index) => {
    if (index === 0) {
      sums[0] = '합계'
    } else {
      const key = column.property
      if (isNumber(summary[key])) {
        sums[index] = moneyFormatter(summary[key]).concat(' 건')
      } else {
        sums[index] = '-'
      }
    }
  })

  return sums
}

</script>

<style scoped lang="scss">

</style>
