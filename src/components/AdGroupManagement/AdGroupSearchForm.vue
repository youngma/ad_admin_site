<template>
  <div class="comm_comp">
<!--    <el-row>-->
<!--      <el-col class="comm_form_box comm_text_tit">광고 그룹 조회</el-col>-->
<!--    </el-row>-->
    <div class="frame_comp">
      <el-row :gutter="10">
        <el-col :span="4">
          <strong class="comm_tit_box">그룹 명</strong>
        </el-col>
        <el-col :span="8">
          <el-input v-model="searchParams.groupName" placeholder="그룹 명를 입력 해주세요." />
        </el-col>
        <el-col :span="4">
          <strong class="comm_tit_box">지면 코드</strong>
        </el-col>
        <el-col :span="8">
          <el-input
                    v-model="searchParams.groupCode"
                    placeholder="지면 코드를 입력 해주세요." />
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="4">
          <strong class="comm_tit_box">캠페인 타입</strong>
        </el-col>
        <el-col :span="8">
          <el-select v-model="searchParams.adType" class="m-2" placeholder="캠페인 타입" size="large">
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
          <strong class="comm_tit_box">광고 지면 상태</strong>
        </el-col>
        <el-col :span="8">
          <el-select v-model="searchParams.groupStatus" class="m-2" placeholder="지면 상태" size="large">
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

import { adGroupStore } from '@/store/modules/admin/adGroupStore.js'
import { commonStore } from '@/store/modules/admin/commonStore.js'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'AdGroupSearchForm'
})

const emit = defineEmits(['search-call'])

const store = adGroupStore()
const common = commonStore()

const { searchParams } = storeToRefs(store)
const { CampaignType, AdGroupStatus } = storeToRefs(common)

function clickInit() {
  store.initAdGroup()
}

function search({ page, size }) {
  // this.store.searchByAdGroups({ page, size })
  emit('search-call', { page, size })
}

</script>

<style scoped lang="scss">

</style>
