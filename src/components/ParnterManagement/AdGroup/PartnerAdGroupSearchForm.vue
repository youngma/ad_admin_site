<template>
  <div class="comm_comp">
    <el-row>
      <el-col class="comm_form_box comm_text_tit">광고 그룹 조회</el-col>
    </el-row>
    <div class="frame_comp">
      <el-row :gutter="10">
        <el-col :span="4">
          <strong class="comm_tit_box">그룹 명</strong>
        </el-col>
        <el-col :span="8">
          <el-input v-model="adGroups.searchParams.groupName" placeholder="Please input" />
        </el-col>
        <el-col :span="4">
          <strong class="comm_tit_box">그룹 코드 번호</strong>
        </el-col>
        <el-col :span="8">
          <el-input
                    v-model="adGroups.searchParams.groupCode"
                    placeholder="Please input" />
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="4">
          <strong class="comm_tit_box">캠페인 타입</strong>
        </el-col>
        <el-col :span="8">
          <el-select v-model="adGroups.searchParams.adType" class="m-2" placeholder="Select" size="large">
            <el-option key="" label="전체" value=""/>
            <el-option
              v-for="code of CampaignType"
              :key="code.key"
              :label="code.value"
              :value="code.key"
            />
          </el-select>
        </el-col>

        <el-col :span="4">
          <strong class="comm_tit_box">광고 그룹 상태</strong>
        </el-col>
        <el-col :span="8">
          <el-select v-model="adGroups.searchParams.groupStatus" class="m-2" placeholder="Select" size="large">
            <el-option key="" label="전체" value=""/>
            <el-option
              v-for="code of AdGroupStatus"
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

import { partnerStore } from '@/store/modules/admin/partnerStore.js'
import { commonStore } from '@/store/modules/admin/commonStore.js'
import { storeToRefs } from 'pinia'
import { businessNumberFormatter, phoneFormatter } from '@/utils/customElTableFormatter.js'

defineOptions({
  name: 'PartnerAdGroupSearchForm'
})

const store = partnerStore()
const common = commonStore()

const { adGroups } = storeToRefs(store)
const { CampaignType, AdGroupStatus } = storeToRefs(common)

function clickInit() {
  this.store.tabInitAdGroup()
}

function search({ page, size }) {
  this.store.searchByAdGroups({ page, size })
}

</script>

<style scoped lang="scss">

</style>
