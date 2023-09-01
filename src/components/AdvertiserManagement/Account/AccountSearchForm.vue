<template>
  <div class="comm_comp">
    <el-row>
      <el-col class="comm_form_box comm_text_tit">광고주 계좌 조회</el-col>
    </el-row>
    <div class="frame_comp">
      <el-row :gutter="10">
        <el-col :span="4">
          <strong class="comm_tit_box">은행</strong>
        </el-col>
        <el-col :span="8">
          <el-select v-model="accounts.searchParams.bankCode" class="m-2" placeholder="Select" size="large">
            <el-option key="" label="전체" value=""/>
            <el-option
              v-for="code of Bank"
              :key="code.key"
              :label="code.value"
              :value="code.key"
            />
          </el-select>
        </el-col>
        <el-col :span="4">
          <strong class="comm_tit_box">계좌 상태</strong>
        </el-col>
        <el-col :span="8">
          <el-select v-model="accounts.searchParams.accountUse" class="m-2" placeholder="Select" size="large">
            <el-option key="" label="전체" value=""/>
            <el-option key="true" label="사용" value="true"/>
            <el-option key="false" label="미사용" value="false"/>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="4">
          <strong class="comm_tit_box">계좌 번호</strong>
        </el-col>
        <el-col :span="8">
          <el-input v-model="accounts.searchParams.bankAccount" placeholder="Please input" />
        </el-col>
        <el-col :span="4">
          <strong class="comm_tit_box">예금주</strong>
        </el-col>
        <el-col :span="8">
          <el-input v-model="accounts.searchParams.accountHolder" placeholder="Please input" />
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

import { advertiserStore } from '@/store/modules/admin/advertiserStore.js'
import { commonStore } from '@/store/modules/admin/commonStore.js'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'AdvertiserAccountSearchFrom'
})

const store = advertiserStore()
const common = commonStore()

const { accounts } = storeToRefs(store)
const { Bank } = storeToRefs(common)

function clickInit() {
  this.store.tabInitAccount()
}

function search({ page, size }) {
  this.store.searchByAccounts({ page, size })
}

</script>

<style scoped lang="scss">

</style>
