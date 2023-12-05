<template>
  <el-row justify="end" >
    <el-col class="t_r comm_form_box mb_15">
      <el-button type="success" class="comm_form_btn" @click="excel()">Excel</el-button>
    </el-col>
  </el-row>
  <el-table
    :data="partner.list"
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
    <el-table-column  prop="businessName" label="매체사 명" width="150" header-align="center" align="center" />
    <el-table-column  prop="groupCode" label="지면 코드" width="150" header-align="center" align="center" />
    <el-table-column  prop="groupName" label="지면 명" header-align="center" align="center" />
<!--    <el-table-column  prop="reqCnt" label="광고 요청 건"  header-align="center" align="right" >-->
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
    <el-table-column  prop="CTR" label="CTR" width="120" header-align="center" align="right" >
      <template #default="scope">
        {{
          scope.row.impressionCnt > 0 ? (scope.row.clickCnt / scope.row.impressionCnt * 100).toFixed(2) : Number(0).toFixed(2)
        }} %
      </template>
    </el-table-column>
    <el-table-column  prop="clickCnt" label="참여자 수"  width="150" header-align="center" align="right" >
      <template #default="scope">
        {{moneyFormatter(scope.row.clickCnt) }} 명
      </template>
    </el-table-column>
    <el-table-column  prop="partnerCommission" label="매체사 리워드" width="150" header-align="center" align="right" >
      <template #default="scope">
        {{ moneyFormatter(scope.row.partnerCommission) }} 원
      </template>
    </el-table-column>
    <el-table-column  prop="userCommission" label="유저 리워드" width="150" header-align="center" align="right" >
      <template #default="scope">
        {{ moneyFormatter(scope.row.userCommission) }} 원
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

function excel() {
  store.excelByPartner({})
}

const getSummaries = (param) => {
  const { columns, data } = param
  const { summary } = partner.value
  const sums = []

  columns.forEach((column, index) => {
    if (index === 0) {
      sums[0] = '합계'
    } else {
      const key = column.property
      if (key === 'businessName') {
        sums[index] = moneyFormatter(summary['partnerCount']).concat(' 건')
      } else if (key === 'groupCode') {
        sums[index] = moneyFormatter(summary['adGroupCount']).concat(' 건')
      } else if (key === 'groupName') {
        sums[index] = '-'
      } else if (key === 'partnerCommission') {
        sums[index] = moneyFormatter(summary['partnerCommission']).concat(' 원')
      } else if (key === 'userCommission') {
        sums[index] = moneyFormatter(summary['userCommission']).concat(' 원')
      } else {
        sums[index] = moneyFormatter(summary[key]).concat(' 건')
      }
    }
  })

  sums[7] = summary['impressionCnt'] > 0 ? (summary['hintCnt'] / summary['impressionCnt'] * 100).toFixed(2).concat(' %') : Number(0).toFixed(2).concat(' %')

  return sums
}

</script>

<style scoped lang="scss">

</style>
