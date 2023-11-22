<template>
  <div class="comm_comp">

<!--    <PartnerSearchForm2-->
<!--      title="광고 참여 이력 조회"-->
<!--      class="select-width-full"-->
<!--      :multiple=false-->
<!--      :selected="selected"-->
<!--      :partners="partners"-->
<!--      :multiple-limit=5-->
<!--      @search-update="searchUpdate"-->
<!--      @on-change="(value) => onChange(value)"-->
<!--    />-->

    <div class="frame_comp">
      <el-row :gutter="10">
        <el-col :span="4">
          <strong class="comm_tit_box">캠페인 명</strong>
        </el-col>
        <el-col :span="8">
          <el-input
            v-model="user.searchParams.campaignName"
            placeholder="캠페인 명를 입력해주세요."
          >
          </el-input>
        </el-col>
        <el-col :span="4">
          <strong class="comm_tit_box">캠페인 코드</strong>
        </el-col>
        <el-col :span="8">
          <el-input
            v-model="user.searchParams.campaignCode"
            placeholder="캠페인 명를 입력해주세요."
          >
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="4">
          <strong class="comm_tit_box">사용자 식별 키</strong>
        </el-col>
        <el-col :span="8">
          <el-input
            v-model="user.searchParams.userKey"
            placeholder="사용자 식별키를 입력해주세요."
          >
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="4">
          <strong class="comm_tit_box">리포팅 일자</strong>
        </el-col>
        <el-col :span="8">
          <el-date-picker
            v-model="user.searchParams.searchDate"
            type="daterange"
            size="large"
            class="mt_5"
            start-placeholder="광고 시작 일자"
            end-placeholder="광고 종료 일자"
            format="YYYY/MM/DD"
            value-format="YYYYMMDD"
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
import PartnerSearchForm2 from '@/components/ParnterManagement/PartnerSearchForm2.vue'
import { ref } from 'vue'
import {moneyFormatter} from "@/utils/customElTableFormatter.js";

defineOptions({
  name: 'UserRawReportSearchForm'
})

const store = quizReportStore()

const { user } = storeToRefs(store)

const selected = ref([])
const partners = ref([])
function searchUpdate({ content, current }) {
  partners.value = content
  selected.value = current
}

function onChange(value) {
  selected.value = value
  store.setPartner(value)
}

function clickInit() {
  store.initByUser()
}

function search({ page, size }) {
  store.searchByUser({ page, size })
}

</script>

<style scoped lang="scss">

</style>
