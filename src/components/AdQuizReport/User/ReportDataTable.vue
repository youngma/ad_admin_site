<template>
  <el-row justify="end" >
    <el-col class="t_r comm_form_box mb_15">
      <el-button type="success" class="comm_form_btn" @click="excel()">Excel</el-button>
    </el-col>
  </el-row>
  <el-table
    :data="user.list"
    :summary-method="getSummaries"
    show-summary
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

    <el-table-column  prop="partnerName" label="매체사 명" width="150" header-align="center" align="center" />
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

<!--    <el-table-column  prop="impressionCnt" label="광고 노출 시간" header-align="center" align="right" width="180">-->
<!--      <template #header="scope">-->
<!--        광고 노출 시간-->
<!--        <br/>-->
<!--        * 상세 이미지 노출-->
<!--      </template>-->
<!--      <template #default="scope">-->
<!--        {{ scope.row.impressaionAt }}-->
<!--      </template>-->
<!--    </el-table-column>-->
    <el-table-column  prop="hintCnt" label="클릭 시간(힌트)" header-align="center" align="right" width="180">
      <template #header="scope">
        클릭 시간(힌트)
      </template>
      <template #default="scope">
        {{ scope.row.hintAt }}
      </template>
    </el-table-column>
    <el-table-column  prop="clickCnt" label="클릭 시간(정답)" header-align="center" align="right" width="180">
      <template #header="scope">
        클릭 시간(전환)
      </template>
      <template #default="scope">
        {{ scope.row.clickAt }}
      </template>
    </el-table-column>
    <el-table-column  prop="clickCnt" label="정답 수"  header-align="center" align="right" width="180">
      <template #header="scope">
        정답 처리 시간
      </template>
      <template #default="scope">
        {{ scope.row.answerAt }}
      </template>
    </el-table-column>

    <el-table-column  prop="adCost" label="광고 금액" width="150" header-align="center" align="right" >
      <template #default="scope">
        {{ moneyFormatter(scope.row.adCost) }} 원
      </template>
    </el-table-column>

    <el-table-column  prop="partnerCommission" label="매체사 리워드" width="150" header-align="center" align="right" >
      <template #default="scope">
        {{ moneyFormatter(scope.row.partnerCommission) }} 원
      </template>
    </el-table-column>
    <el-table-column  prop="userCommission" label="사용자 리워드" width="150" header-align="center" align="right" >
      <template #default="scope">
        {{ moneyFormatter(scope.row.userCommission) }} 원
      </template>
    </el-table-column>
    <el-table-column  prop="adReword" label="지급 포인트" width="150" header-align="center" align="right" >
      <template #default="scope">
        {{ moneyFormatter(scope.row.adReword) }}
      </template>
    </el-table-column>
    <el-table-column  prop="postBackStatus" label="포스트백 결과" width="150" header-align="center" align="center" >
      <template #default="scope">
        <div>
          <el-popover
            ref="popover"
            title="연동 결과"
            trigger="hover"
            width="auto"
            content=""
          >
            <template #reference>
              {{ scope.row.postBackStatus === 200 ? '성공' : '실패'}}

            </template>
            <template #default>
              {{
                scope.row.postBackResult != null ? JSON.stringify(JSON.parse(scope.row.postBackResult),null,2) : null
              }}
            </template>

          </el-popover>
        </div>
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

function excel() {
  store.excelByUser({})
}

const getSummaries = (param) => {
  const { columns, data } = param
  const { summary } = user.value
  const sums = []

  columns.forEach((column, index) => {
    sums[0] = '합계 ('.concat(summary.reqCnt).concat(' 건)')
    const key = column.property
    if (key === 'advertiserName') {
      sums[index] = moneyFormatter(summary['advertiserCount']).concat(' 건')
    } else if (key === 'campaignCode') {
      sums[index] = moneyFormatter(summary['campaignCount']).concat(' 건')
    } else if (key === 'campaignName') {
      sums[index] = '-'
    } if (key === 'partnerName') {
      sums[index] = moneyFormatter(summary['partnerCount']).concat(' 건')
    } else if (key === 'groupCode') {
      sums[index] = moneyFormatter(summary['adGroupCount']).concat(' 건')
    } else if (key === 'groupName') {
      sums[index] = '-'
    } else if (key === 'adReword') {
      sums[index] = moneyFormatter(summary['adReword'])
    } else if (key === 'partnerCommission') {
      sums[index] = moneyFormatter(summary['partnerCommission']).concat(' 원')
    } else if (key === 'userCommission') {
      sums[index] = moneyFormatter(summary['userCommission']).concat(' 원')
    } else if (key === 'userKey') {
      sums[index] = moneyFormatter(summary['userCount']).concat(' 명')
    } else {
      sums[index] = moneyFormatter(summary[key]).concat(' 건')
    }
  })

  return sums
}

</script>

<style scoped lang="scss">

</style>
