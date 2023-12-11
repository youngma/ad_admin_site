<template>
  <el-row justify="end" >
    <el-col class="t_r comm_form_box mb_15">
      <el-button type="success" class="comm_form_btn" @click="excel()">Excel</el-button>
    </el-col>
  </el-row>
  <el-table
    :data="xcode.list"
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

    <el-table-column  prop="partnerName" label="파트너 명" header-align="center" align="left" />
    <el-table-column  prop="groupName" label="채널 명" header-align="center" align="center" />
    <el-table-column  prop="groupCode" label="채널 코드" header-align="center" align="left" />

    <el-table-column  prop="advertiserName" label="광고주 명" header-align="center" align="left" />
    <el-table-column  prop="campaignCode" label="캠페인 코드" header-align="center" align="center" />
    <el-table-column  prop="campaignName" label="캠페인 명" header-align="center" align="left" />

    <el-table-column  prop="impressionCnt" label="노출 수" header-align="center" align="right" >
      <template #default="scope">
        {{moneyFormatter(scope.row.impressionCnt) }} 건
      </template>
    </el-table-column>
    <el-table-column  prop="answerCnt" label="참여자 수" header-align="center" align="right" >
      <template #default="scope">
        {{moneyFormatter(scope.row.answerCnt) }} 건
      </template>
    </el-table-column>
    <el-table-column  prop="hintCnt" label="클릭 수(힌트)" header-align="center" align="right" >
      <template #default="scope">
        {{moneyFormatter(scope.row.hintCnt) }} 건
      </template>
    </el-table-column>
    <el-table-column  prop="clickCnt" label="클릭 수(정답)"  header-align="center" align="right" >
      <template #default="scope">
        {{moneyFormatter(scope.row.clickCnt) }} 건
      </template>
    </el-table-column>

    <el-table-column label="CTR" width="120" align="center" title="CTR" header-align="center" >
      <template #default="scope">
        {{
          scope.row.impressionCnt > 0 ? (scope.row.clickCnt / scope.row.impressionCnt * 100).toFixed(2) : Number(0).toFixed(2)
        }} %
      </template>
    </el-table-column>

    <el-table-column  prop="adCost" label="광고 금액(합계)" width="150" header-align="center" align="right" >
      <template #default="scope">
        {{ moneyFormatter(scope.row.adCost) }} 원
      </template>
    </el-table-column>
    <el-table-column  prop="partnerCommission" label="매체사 리워드"  header-align="center" align="right" >
      <template #default="scope">
        {{moneyFormatter(scope.row.partnerCommission) }} 원
      </template>
    </el-table-column>
    <el-table-column  prop="userCommission" label="사용자 리워드"  header-align="center" align="right" >
      <template #default="scope">
        {{moneyFormatter(scope.row.userCommission) }} 원
      </template>
    </el-table-column>
    <el-table-column  prop="userCommission" label="자몽랩 리워드"  header-align="center" align="right" >
      <template #default="scope">
        {{moneyFormatter(scope.row.adCost - scope.row.partnerCommission ) }} 원
      </template>
    </el-table-column>
  </el-table>

  <div class="page-box">
    <el-pagination
      :page-size="xcode.searchParams.size"
      :current-page="xcode.searchParams.page"
      background
      :default-current-page=1
      :default-page-size=20
      :total="xcode.total"
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
import { useRouter } from 'vue-router'

defineOptions({
  name: 'AdminDailyReportDataTable'
})

const store = quizReportStore()
const router = useRouter()

const { xcode } = storeToRefs(store)

function pageChange(number) {
  store.searchByXCode({ page: number })
}

function excel() {
  store.excelByXCode({})
}

const getSummaries = (param) => {
  const { columns, data } = param
  const { summary } = xcode.value
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

function move(name) {
  this.router.push({
    name,
    query: {
      referrer: '/report-quiz-management/admin-detail'
    }
  })
}

</script>

<style scoped lang="scss">

</style>
