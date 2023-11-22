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
          <el-input v-model="campaignSearchParams.campaignName" placeholder="캠페인 명을 입력 해주세요." />
        </el-col>
        <el-col :span="4">
          <strong class="comm_tit_box">캠페인 코드</strong>
        </el-col>
        <el-col :span="8">
          <el-input
            v-model="campaignSearchParams.campaignCode"
            placeholder="캠페인 코드를 입력 해주세요." />
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
                v-model="campaignSearchParams.adDate"
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
            v-model="campaignSearchParams.targetUrl"
            placeholder="타켓 URL를 입력 해주세요" />
        </el-col>
      </el-row>

      <el-row :gutter="10">
<!--        <el-col :span="4">-->
<!--          <strong class="comm_tit_box">캠페인 타입</strong>-->
<!--        </el-col>-->
<!--        <el-col :span="8">-->
<!--&lt;!&ndash;          <el-input&ndash;&gt;-->
<!--&lt;!&ndash;            v-model="campaignSearchParams.campaignType"&ndash;&gt;-->
<!--&lt;!&ndash;            placeholder="Please input" />&ndash;&gt;-->

<!--          <el-select v-model="campaignSearchParams.campaignType" class="m-2" placeholder="Select" size="large">-->
<!--            <el-option key="" label="전체" value=""/>-->
<!--            <el-option-->
<!--              v-for="code of CampaignType"-->
<!--              :key="code.key"-->
<!--              :label="code.value"-->
<!--              :value="code.key"-->
<!--            />-->
<!--          </el-select>-->

<!--        </el-col>-->
        <el-col :span="4">
          <strong class="comm_tit_box">노출 여부</strong>
        </el-col>
        <el-col :span="8">
          <!--          <el-input-->
          <!--            v-model="campaignSearchParams.campaignType"-->
          <!--            placeholder="Please input" />-->

          <el-select v-model="campaignSearchParams.exposureStatus" class="m-2" placeholder="Select" size="large">
            <el-option key="" label="전체" value="" />
            <el-option key="1" label="노출" value="1"/>
            <el-option key="0" label="미노출" value="0"/>
          </el-select>

        </el-col>
        <el-col :span="4">
          <strong class="comm_tit_box">캠페인 상태</strong>
        </el-col>
        <el-col :span="8">
          <el-select v-model="campaignSearchParams.campaignStatus" class="m-2" placeholder="Select" size="large">
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

import { campaignStore } from '@/store/modules/admin/campaignStore.js'
import { commonStore } from '@/store/modules/admin/commonStore.js'

import { storeToRefs } from 'pinia'

defineOptions({
  name: 'CampaignSearchForm'
})
const emit = defineEmits(['search-call'])

const store = campaignStore()
const common = commonStore()

const { campaignSearchParams } = storeToRefs(store)
const { CampaignType, CampaignStatus, PaymentTerms } = storeToRefs(common)

// const defaultAdDate = ref([moment().add(10, 'days').toDate(), Date.now()])

function clickInit() {
  store.init('search')
}

function search({ page, size }) {
  // this.store.search({ page, size })
  emit('search-call', { page, size })
}

</script>

<style scoped lang="scss">

</style>
