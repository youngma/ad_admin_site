<template>
  <div class="comm_comp">
    <!--    <el-row>-->
    <!--      <el-col class="comm_form_box comm_text_tit">광고 그룹 조회</el-col>-->
    <!--    </el-row>-->
    <div class="frame_comp">

      <el-row :gutter="10">
        <el-col :span="4">
          <strong class="comm_tit_box">기간</strong>
        </el-col>
        <el-col :span="8">
          <el-date-picker
            v-model="searchParams.searchDate"
            type="daterange"
            size="large"
            class="mt_5"
            start-placeholder="등록 시작 일자"
            end-placeholder="등록 종료 일자"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"
          />
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="4">
          <strong class="comm_tit_box">검색</strong>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="24">
            <el-col :span="8" >
              <el-select v-model="searchParams.searchType" class="m-2" placeholder="Select" size="large">
                <el-option key="advertiserName" label="광고주 명" value="advertiserName"/>
                <el-option key="partnerName" label="매체사 명" value="partnerName"/>
                <el-option key="quizTitle" label="퀴즈 제목" value="quizTitle"/>
              </el-select>
            </el-col>
            <el-col :span="16" >
              <el-input v-model="searchParams.searchText" placeholder="검색어를 입력 해주세요." />
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="4">
          <strong class="comm_tit_box">기간</strong>
        </el-col>
        <el-col :span="8">
          <el-radio-group v-model="searchParams.inquiryStatus" class="mt_10 mb_10" size="large">
            <el-radio-button label="all" > 전체 </el-radio-button>
            <el-radio-button label="reuqest" > 대기 </el-radio-button>
            <el-radio-button label="answer" > 완료 </el-radio-button>
          </el-radio-group>
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

import { inquiryStore } from '@/store/modules/admin/inquiryStore.js'
import { commonStore } from '@/store/modules/admin/commonStore.js'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'AdInquirySearchForm'
})

const store = inquiryStore()
const common = commonStore()

const { searchParams } = storeToRefs(store)

function clickInit() {
  store.init()
}

function search({ page, size }) {
  store.search({ page, size })
}

</script>

<style scoped lang="scss">

</style>
