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
          <el-input v-model="store.searchParams.userId" placeholder="Please input" />
        </el-col>
        <el-col :span="4">
          <strong class="comm_tit_box">관리자 이름</strong>
        </el-col>
        <el-col :span="8">
          <el-input v-model="store.searchParams.userName" placeholder="Please input" />
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="4">
          <strong class="comm_tit_box">전화 번호</strong>
        </el-col>
        <el-col :span="8">
          <el-input v-model="store.searchParams.phoneNumber" placeholder="Please input" />
        </el-col>
        <el-col :span="4">
          <strong class="comm_tit_box">상태</strong>
        </el-col>
        <el-col :span="8">
          <el-select v-model="store.searchParams.userStatus" class="m-2" placeholder="Select" size="large">
            <el-option
              v-for="item in options"
              :key="item.code"
              :label="item.value"
              :value="item.value"
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

import { ref } from 'vue'
import { adminManagementStore } from '@/store/modules/admin/adminManagementStore.js'

defineOptions({
  name: 'AdminSearchFrom'
})

const store = adminManagementStore()

function clickInit() {
  store.init()
}

function search({ page, size }) {
  store.search({ page, size })
}

const options = ref([{
  code: 'search',
  value: 'search'
}, {
  code: 'search',
  value: 'search'
}, {
  code: 'search',
  value: 'search'
}])

</script>

<style scoped lang="scss">

</style>
