<template>
  <div class="comm_comp">
    <el-row>
      <el-col class="comm_form_box comm_text_tit">매체사 조회</el-col>
    </el-row>
    <div class="frame_comp">
      <el-row :gutter="10">
        <el-col :span="4">
          <strong class="comm_tit_box">사업자 명</strong>
        </el-col>
        <el-col :span="8">
          <el-input v-model="searchParams.businessName" placeholder="Please input" />
        </el-col>
        <el-col :span="4">
          <strong class="comm_tit_box">사업자 번호</strong>
        </el-col>
        <el-col :span="8">
          <el-input
                    v-model="searchParams.businessNumber"
                    :formatter="(value) => businessNumberFormatter(value)"
                    placeholder="Please input" />
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="4">
          <strong class="comm_tit_box">전화 번호</strong>
        </el-col>
        <el-col :span="8">
          <el-input
                    v-model="searchParams.phoneNumber"
                    :formatter="(value) => phoneFormatter(value)"
                    placeholder="Please input" />
        </el-col>
        <el-col :span="4">
          <strong class="comm_tit_box">이메일</strong>
        </el-col>
        <el-col :span="8">
          <el-input v-model="searchParams.email" placeholder="Please input" />
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

import { partnerManagementStore } from '@/store/modules/admin/partnerManagementStore.js'
import { commonStore } from '@/store/modules/admin/commonStore.js'
import { storeToRefs } from 'pinia'
import { businessNumberFormatter, phoneFormatter } from '@/utils/customElTableFormatter.js'

defineOptions({
  name: 'PartnerSearchFrom'
})

const store = partnerManagementStore()

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
