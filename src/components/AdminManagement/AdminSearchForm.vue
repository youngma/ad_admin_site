<template>
  <div class="comm_comp">
    <el-row>
      <el-col class="comm_form_box comm_text_tit">관리자 조회</el-col>
    </el-row>
    <div class="frame_comp">
      <el-row :gutter="10">
        <el-col :span="4">
          <strong class="comm_tit_box">관리자 아이디</strong>
        </el-col>
        <el-col :span="8">
          <el-input v-model="searchParams.userId" placeholder="관리자 아이디를 입력 해주세요." />
        </el-col>
        <el-col :span="4">
          <strong class="comm_tit_box">관리자 이름</strong>
        </el-col>
        <el-col :span="8">
          <el-input v-model="searchParams.userName" placeholder="관리자 이름을 입력 해주세요." />
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
            placeholder="관리자 전화번호을 입력 해주세요" />
        </el-col>
        <el-col :span="4">
          <strong class="comm_tit_box">상태</strong>
        </el-col>
        <el-col :span="8">
          <el-select v-model="searchParams.userStatus" class="m-2" placeholder="관리자 상태을 선택 해주세요." size="large">
            <el-option key="" label="전체" value=""/>
            <el-option
              v-for="code of UserStatus"
              :key="code.key"
              :label="code.value"
              :value="code.key"
            />
          </el-select>
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

import { adminManagementStore } from '@/store/modules/admin/adminManagementStore.js'
import { commonStore } from '@/store/modules/admin/commonStore.js'
import { storeToRefs } from 'pinia'
import { businessNumberFormatter, phoneFormatter } from '@/utils/customElTableFormatter.js'

defineOptions({
  name: 'AdminSearchFrom'
})

const store = adminManagementStore()
const common = commonStore()

const { searchParams } = storeToRefs(store)
const { UserStatus } = storeToRefs(common)

function clickInit() {
  store.init()
}

function search({ page, size }) {
  store.search({ page, size })
}

</script>

<style scoped lang="scss">

</style>
