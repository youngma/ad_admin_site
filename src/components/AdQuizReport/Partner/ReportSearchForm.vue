<template>
  <div class="comm_comp">

    <PartnerSearchForm2
      title="퀴즈 매체사 리포팅"
      class="select-width-full"
      :multiple=false
      :selected="selected"
      :partners="partners"
      :multiple-limit=5
      @search-update="searchUpdate"
      @on-change="(value) => onChange(value)"
    />

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
            v-model="partner.searchParams.searchDate"
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
import PartnerSearchForm2 from '@/components/ParnterManagement/PartnerSearchForm2.vue'
import { ref } from 'vue'

defineOptions({
  name: 'PartnerDailyReportSearchForm'
})

const store = quizReportStore()

const { partner } = storeToRefs(store)

const selected = ref([])
const partners = ref([])
function searchUpdate({ content, current }) {
  partners.value = content
  selected.value = current
}

function onChange(value) {
  selected.value = value
  this.store.setPartner(value)
}

function clickInit() {
  this.store.initByPartner()
}

function search({ page, size }) {
  this.store.searchByPartner({ page, size })
}

</script>

<style scoped lang="scss">

</style>
