<template>
  <el-table
    :data="user.list"
    class="custom-table"
    style="width: 100%"
  >
    <el-table-column  prop="rptDate" fixed label="요청 일자" width="180" header-align="center" align="center"  >
      <template #default="scope">
        {{ scope.row.requestAt }}
      </template>
    </el-table-column>
    <el-table-column  prop="userKey" fixed label="사용자" width="150" header-align="center" align="center" />
    <el-table-column  prop="advertiserName" label="광고주 명" width="150" header-align="center" align="center" />
    <el-table-column  prop="campaignCode" label="캠페인 코드" width="150" header-align="center" align="center" />
    <el-table-column  prop="campaignName" label="캠페인 명" width="150" header-align="center" align="center" />

    <el-table-column  prop="partnerName" label="파트너 명" width="150" header-align="center" align="center" />
    <el-table-column  prop="groupCode" label="지면 코드" width="150" header-align="center" align="center" />
    <el-table-column  prop="groupName" label="지면 명" width="150" header-align="center" align="center" />

    <el-table-column  prop="impressionCnt" label="광고 노출 시간" header-align="center" align="right" width="180">
      <template #header="scope">
        광고 노출 시간
        <br/>
        * 상세 진입
      </template>
      <template #default="scope">
        {{ scope.row.detailAt }}
      </template>
    </el-table-column>

    <el-table-column  prop="impressionCnt" label="광고 노출 시간" header-align="center" align="right" width="180">
      <template #header="scope">
        광고 노출 시간
        <br/>
        * 상세 이미지 노출
      </template>
      <template #default="scope">
        {{ scope.row.impressaionAt }}
      </template>
    </el-table-column>
    <el-table-column  prop="hintCnt" label="힌트 클릭 건" header-align="center" align="right" width="180">
      <template #header="scope">
        힌트 클릭 시간
      </template>
      <template #default="scope">
        {{ scope.row.hintAt }}
      </template>
    </el-table-column>
    <el-table-column  prop="clickCnt" label="클릭 건" header-align="center" align="right" width="180">
      <template #header="scope">
        클릭 시간
      </template>
      <template #default="scope">
        {{ scope.row.clickAt }}
      </template>
    </el-table-column>
    <el-table-column  prop="clickCnt" label="정답 건"  header-align="center" align="right" width="180">
      <template #header="scope">
        클릭 시간
      </template>
      <template #default="scope">
        {{ scope.row.answerAt }}
      </template>
    </el-table-column>

    <el-table-column  prop="partnerCommission" label="파트너 지급 금액" width="150" header-align="center" align="right" >
      <template #default="scope">
        {{ moneyFormatter(scope.row.partnerCommission) }}
      </template>
    </el-table-column>
    <el-table-column  prop="userCommission" label="유저 지급 금액" width="150" header-align="center" align="right" >
      <template #default="scope">
        {{ moneyFormatter(scope.row.userCommission) }}
      </template>
    </el-table-column>
    <el-table-column  prop="adReword" label="지급 포인트" width="150" header-align="center" align="right" >
      <template #default="scope">
        {{ moneyFormatter(scope.row.adReword) }}
      </template>
    </el-table-column>

  </el-table>

  <div class="page-box">
    <el-pagination
      :page-size="user.searchParams.size"
      :current-page="user.searchParams.page"
      background
      :default-current-page=1
      :default-page-size=20
      :total="user.total"
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
  name: 'UserRawReportDataTable'
})

const store = quizReportStore()

const { user } = storeToRefs(store)

function pageChange(number) {
  store.searchByUser({ page: number })
}

</script>

<style scoped lang="scss">

</style>
