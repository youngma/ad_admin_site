<template>
  <div class="comm_comp">

    <div class="frame_comp">

<!--      <el-row :gutter="10">-->
<!--        <el-col :span="4">-->
<!--          <strong class="comm_tit_box">광고주</strong>-->
<!--        </el-col>-->
<!--        <el-col :span="8">-->
<!--        </el-col>-->
<!--        <el-col :span="4">-->
<!--          <strong class="comm_tit_box">광고 코드</strong>-->
<!--        </el-col>-->
<!--        <el-col :span="8">-->
<!--        </el-col>-->
<!--      </el-row>-->

      <el-row :gutter="10">
<!--        <el-col :span="4">-->
<!--          <strong class="comm_tit_box">그룹 명</strong>-->
<!--        </el-col>-->
<!--        <el-col :span="8">-->
<!--        </el-col>-->
        <el-col :span="4">
          <strong class="comm_tit_box">리포팅 일자</strong>
        </el-col>
        <el-col :span="8">
          <el-date-picker
            v-model="admin.searchParams.searchDate"
            type="daterange"
            size="large"
            class="mt_5"
            start-placeholder="광고 시작 일자"
            end-placeholder="광고 종료 일자"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"
          />
        </el-col>
      </el-row>

    </div>
    <el-row justify="end">
      <el-col class="t_r comm_form_box" tag="span">
        <el-button type="info" class="comm_form_btn" @click="clickInit()">초기화</el-button>
        <el-button type="primary" class="comm_form_btn" @click="search({ page: 1, size: 50 })">검색</el-button>
      </el-col>
    </el-row>
    <el-row justify="end" >
      <el-col class="t_r comm_form_box">
      </el-col>
    </el-row>
  </div>
</template>

<script setup>

import { quizReportStore } from '@/store/modules/admin/quizReportStore.js'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'AdminDailyReportSearchForm'
})

const store = quizReportStore()

const { admin } = storeToRefs(store)
function search({ page, size }) {
  store.searchByAdmin({ page, size })
}
function clickInit() {
  store.initByAdmin()
}

</script>

<style scoped lang="scss">

</style>
