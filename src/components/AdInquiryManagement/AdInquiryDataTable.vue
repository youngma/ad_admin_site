<template >
  <el-table
    :data="list"
    class="custom-table"
    style="width: 100%"
  >
    <el-table-column  prop="rptDate" label="문의 일자" width="150" header-align="center" align="center" >
      <template #default="scope">
        {{scope.row.requestAt }}
      </template>
    </el-table-column>
    <el-table-column  prop="advertiserName" label="광고주" header-align="center" align="left" />
    <el-table-column  prop="campaignCode" label="광고 코드" header-align="center" align="center" />
    <el-table-column  prop="businessName" label="매체사 명" header-align="center" align="left" />
    <el-table-column  prop="insertedId" label="회원 코드" header-align="center" align="center" />
    <el-table-column  prop="quizTitle" label="퀴즈 타이틀" header-align="center" align="left" />
    <el-table-column  prop="title" label="문의 내용" header-align="center" align="left" >
      <template #default="scope" >
          <el-text>
            <template v-for="row of lineFormatter(scope.row.title)" >
              {{ row }} <br/>
            </template>
          </el-text>
      </template>
    </el-table-column>
    <el-table-column  prop="phone" label="연락처" header-align="center" align="left" />
    <el-table-column  prop="statusName" label="처리 상태" header-align="center" align="center" />
    <el-table-column  prop="answerAt" label="답변 등록 일시" header-align="center" align="center" />
    <el-table-column label="" width="250" header-align="center" align="center">
      <template #default="scope">
        <el-button type="success" tag="span" class="comm_form_btn" @click="() => modal(scope.row)">답변 하기</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="page-box">
    <el-pagination
      :page-size="searchParams.size"
      :current-page="searchParams.page"
      background
      :default-current-page=1
      :default-page-size=20
      :total="total"
      layout="prev, pager, next"
      class="mt-4"
      @size-change="(v) => pageChange(v)"
      @current-change="(v) => pageChange(v)"
    />
  </div>

  <AdInquiryModal />

</template>

<script setup>

import AdInquiryModal from '@/components/AdInquiryManagement/AdInquiryModal.vue'
import { storeToRefs } from 'pinia'
import { lineFormatter } from '@/utils/customElTableFormatter.js'
import { inquiryStore } from '@/store/modules/admin/inquiryStore.js'

defineOptions({
  name: 'AdminDailyReportDataTable'
})

const store = inquiryStore()

const { list, total, modeal, searchParams } = storeToRefs(store)

function pageChange(number) {
  console.log(number)
  store.search({ page: number })
}

function modal(row) {
  console.log(row)
  store.setRow(row)
}

</script>

<style scoped lang="scss">

</style>
