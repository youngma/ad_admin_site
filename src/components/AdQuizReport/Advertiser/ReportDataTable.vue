<template>
  <el-row justify="end" >
    <el-col class="t_r comm_form_box mb_15">
      <el-button type="success" class="comm_form_btn" @click="excel()">Excel</el-button>
    </el-col>
  </el-row>
  <el-table
    :data="advertiser.list"
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
    <el-table-column  prop="businessName" label="광고주 명" width="150" header-align="center" align="center" />
    <el-table-column  prop="campaignCode" label="광고 코드" width="150" header-align="center" align="center" />
    <el-table-column  prop="campaignName" label="광고 명" header-align="center" align="center" />
<!--    <el-table-column  prop="reqCnt" label="광고 요청 건"  width="150" header-align="center" align="right" >-->
<!--      <template #default="scope">-->
<!--        {{moneyFormatter(scope.row.reqCnt) }} 건-->
<!--      </template>-->
<!--    </el-table-column>-->
    <el-table-column  prop="impressionCnt" label="노출 수" width="150" header-align="center" align="right" >
      <template #default="scope">
        {{moneyFormatter(scope.row.impressionCnt) }} 건
      </template>
    </el-table-column>d
    <el-table-column  prop="hintCnt" label="클릭 수" width="150" header-align="center" align="right" >
      <template #default="scope">
        {{moneyFormatter(scope.row.hintCnt) }} 건
      </template>
    </el-table-column>

    <el-table-column label="CTR" width="120" align="center" title="CTR" header-align="center" >
      <template #default="scope">
        {{
          scope.row.impressionCnt > 0 ? (scope.row.clickCnt / scope.row.impressionCnt * 100).toFixed(2) : Number(0).toFixed(2)
        }} %
      </template>
    </el-table-column>

    <el-table-column  prop="clickCnt" label="참여자 수"   width="150" header-align="center" align="right" >
      <template #default="scope">
        {{moneyFormatter(scope.row.clickCnt) }} 명
      </template>
    </el-table-column>

    <el-table-column  prop="originAdCost" label="광고 단가" width="150" header-align="center" align="right" >
      <template #default="scope">
        {{ moneyFormatter(scope.row.originAdCost) }} 원
      </template>
    </el-table-column>
    <el-table-column  prop="adCost" label="광고 금액(합산)" width="180" header-align="center" align="right" >
      <template #default="scope">
        {{ moneyFormatter(scope.row.adCost) }} 원
      </template>
    </el-table-column>
  </el-table>

  <div class="page-box">
    <el-pagination
      :page-size="advertiser.searchParams.size"
      :current-page="advertiser.searchParams.page"
      background
      :default-current-page=1
      :default-page-size=20
      :total="advertiser.total"
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
  name: 'AdvertiserDailyReportDataTable'
})

const store = quizReportStore()

const { advertiser } = storeToRefs(store)

function pageChange(number) {
  store.searchByAdvertiser({ page: number })
}
function excel() {
  store.excelByAdvertiser({})
}

const getSummaries = (param) => {
  const { columns, data } = param
  const { summary } = advertiser.value
  const sums = []

  columns.forEach((column, index) => {
    if (index === 0) {
      sums[0] = '합계'
    } else {
      const key = column.property
      if (key === 'businessName') {
        sums[index] = moneyFormatter(summary['advertiserCount']).concat(' 건')
      } else if (key === 'campaignCode') {
        sums[index] = moneyFormatter(summary['campaignCount']).concat(' 건')
      } else if (
        key === 'campaignName' ||
        key === 'originAdCost'
      ) {
        sums[index] = '-'
      } else {
        sums[index] = moneyFormatter(summary[key]).concat(' 건')
      }
    }
  })

  sums[7] = summary['impressionCnt'] > 0 ? (summary['clickCnt'] / summary['impressionCnt'] * 100).toFixed(2).concat(' %') : Number(0).toFixed(2).concat(' %')

  return sums
}

// function getSummaries(columns) {

//
// }
</script>

<style scoped lang="scss">

</style>
