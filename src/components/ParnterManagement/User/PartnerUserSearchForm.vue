<template>
  <div class="comm_comp">
    <el-row>
      <el-col class="comm_form_box comm_text_tit">매체사 사용자 조회</el-col>
    </el-row>
    <div class="frame_comp">
      <el-row :gutter="10">
        <el-col :span="4">
          <strong class="comm_tit_box">아이디</strong>
        </el-col>
        <el-col :span="8">
          <el-input v-model="users.searchParams.userId" placeholder="Please input" />
        </el-col>
        <el-col :span="4">
          <strong class="comm_tit_box">이름</strong>
        </el-col>
        <el-col :span="8">
          <el-input v-model="users.searchParams.userName" placeholder="Please input" />
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="4">
          <strong class="comm_tit_box">상태</strong>
        </el-col>
        <el-col :span="8">
          <el-select v-model="users.searchParams.userStatus" class="m-2" placeholder="Select" size="large">
            <el-option key="" label="전체" value=""/>
            <el-option
              v-for="code of UserStatus"
              :key="code.key"
              :label="code.value"
              :value="code.key"
            />
          </el-select>
        </el-col>
        <el-col :span="4">
          <strong class="comm_tit_box"></strong>
        </el-col>
        <el-col :span="8">
        </el-col>
      </el-row>
    </div>
    <el-row justify="end">
      <el-col class="t_r comm_form_box" tag="span">
        <el-button type="info" class="comm_form_btn" @click="clickInit()">초기화</el-button>
        <el-button type="primary" class="comm_form_btn" @click="search({ page: 1, size: 50 })">검색</el-button>
      </el-col>
    </el-row>

  </div>
</template>

<script setup>

import { partnerStore } from '@/store/modules/admin/partnerStore.js'
import { commonStore } from '@/store/modules/admin/commonStore.js'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'PartnerUserSearchForm'
})

const store = partnerStore()
const common = commonStore()

const { users } = storeToRefs(store)
const { UserStatus } = storeToRefs(common)

function clickInit() {
  store.tabInitUser()
}

function search({ page, size }) {
  store.searchByUsers({ page, size })
}

</script>

<style scoped lang="scss">

</style>
