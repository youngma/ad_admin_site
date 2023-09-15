<template>
  <div class="comm_comp">
<!--    <el-row>-->
<!--      <el-col class="comm_form_box comm_text_tit">캠페인 조회</el-col>-->
<!--    </el-row>-->
    <div class="frame_comp">
      <el-row :gutter="10">
        <el-col :span="4">
          <strong class="comm_tit_box">캠페인 명</strong>
        </el-col>
        <el-col :span="8">
          <el-input v-model="campaigns.searchParams.campaignName" placeholder="Please input" />
        </el-col>
        <el-col :span="4">
          <strong class="comm_tit_box">캠페인 코드</strong>
        </el-col>
        <el-col :span="8">
          <el-input
            v-model="campaigns.searchParams.campaignCode"
            placeholder="Please input" />
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="4" class="col_tit">
          <strong class="comm_tit_box">광고 기간</strong>
        </el-col>
        <el-col :span="8" class="col_desc">
          <el-row :gutter="10">
            <el-col
              :span="20"
            >
              <el-date-picker
                v-model="campaigns.searchParams.adDate"
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
        </el-col>
        <el-col :span="4">
          <strong class="comm_tit_box">타켓 URL</strong>
        </el-col>
        <el-col :span="8">
          <el-input
            v-model="campaigns.searchParams.targetUrl"
            placeholder="Please input" />
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="4">
          <strong class="comm_tit_box">캠페인 타입</strong>
        </el-col>
        <el-col :span="8">
<!--          <el-input-->
<!--            v-model="campaignSearchParams.campaignType"-->
<!--            placeholder="Please input" />-->

          <el-select v-model="campaigns.searchParams.campaignType" class="m-2" placeholder="Select" size="large">
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
          <strong class="comm_tit_box">캠페인 상태</strong>
        </el-col>
        <el-col :span="8">
          <el-select v-model="campaigns.searchParams.campaignStatus" class="m-2" placeholder="Select" size="large">
            <el-option key="" label="전체" value=""/>
            <el-option
              v-for="code of CampaignStatus"
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
        <el-button type="primary" class="comm_form_btn" @click="search({ page: 1, size: 20 })">검색</el-button>
      </el-col>
    </el-row>
    <el-row justify="end" >
      <el-col class="t_r comm_form_box">
      </el-col>
    </el-row>
  </div>
</template>

<script setup>

import { advertiserStore } from '@/store/modules/admin/advertiserStore.js'
import { commonStore } from '@/store/modules/admin/commonStore.js'

import { storeToRefs } from 'pinia'

defineOptions({
  name: 'PartnerCampaignSearchForm'
})

const store = advertiserStore()
const common = commonStore()

const { campaigns } = storeToRefs(store)
const { CampaignType, CampaignStatus } = storeToRefs(common)

// const defaultAdDate = ref([moment().add(10, 'days').toDate(), Date.now()])

function clickInit() {
  this.store.tabInitCampaign()
}

function search({ page, size }) {
  this.store.searchByCampaigns({ page, size })
}

</script>

<style scoped lang="scss">

</style>
