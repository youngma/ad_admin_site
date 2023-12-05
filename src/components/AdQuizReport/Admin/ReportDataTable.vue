<template>
  <el-row justify="end" >
    <el-col class="t_r comm_form_box mb_15">
      <el-button type="success" class="comm_form_btn" @click="excel()">Excel</el-button>
    </el-col>
  </el-row>
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
    <el-table-column  prop="advertiserCnt" label="광고주" width="120" header-align="center" align="center" >
      <template #default="scope">
        <el-button type="info"  @click="move('AdvertiserSearch')">
          {{moneyFormatter(scope.row.advertiserCnt) }} 건
        </el-button>
      </template>
    </el-table-column>
    <el-table-column  prop="campaignCnt" label="진행 광고 수" width="120" header-align="center" align="center" >
      <template #default="scope">
        <el-button type="info"  @click="move('AdCampaignSearch')">
        {{moneyFormatter(scope.row.campaignCnt) }} 건
        </el-button>
      </template>
    </el-table-column>
    <el-table-column  prop="partnerCnt" label="매체사" width="120" header-align="center" align="center" >
      <template #default="scope">
        <el-button type="info"  @click="move('PartnerSearch')">
        {{moneyFormatter(scope.row.partnerCnt) }} 건
        </el-button>
      </template>
    </el-table-column>
    <el-table-column  prop="adGroupCnt" width="120" label="광고 지면" header-align="center" align="center" >
      <template #default="scope">
        <el-button type="info"  @click="move('AdGroupSearch')">
        {{moneyFormatter(scope.row.adGroupCnt) }} 건
        </el-button>
      </template>
    </el-table-column>
<!--    <el-table-column  prop="reqCnt" label="광고 요청 건" header-align="center" align="right" >-->
<!--      <template #default="scope">-->
<!--        {{moneyFormatter(scope.row.reqCnt) }} 건-->
<!--      </template>-->
<!--    </el-table-column>-->
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
import { useRouter } from 'vue-router'

defineOptions({
  name: 'AdminDailyReportDataTable'
})

const store = quizReportStore()
const router = useRouter()

const { admin } = storeToRefs(store)

function pageChange(number) {
  store.searchByAdmin({ page: number })
}

function excel() {
  store.excelByAdmin({})
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

function move(name) {
  this.router.push({
    name,
    query: {
      referrer: '/report-quiz-management/admin',
    }
  })
}

</script>

<style scoped lang="scss">

</style>
