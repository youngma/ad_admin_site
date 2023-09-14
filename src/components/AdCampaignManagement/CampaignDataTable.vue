<template>
  <el-table
    :data="campaigns"
    class="custom-table"
    style="width: 100%"
  >
    <el-table-column fixed prop="campaignName" label="캠페인 명" width="150" header-align="center" align="center" />
    <el-table-column  prop="campaignTypeName" label="캠페인 타입" width="150" header-align="center" align="center" />
    <el-table-column  prop="campaignCode" label="캠페인 코드" width="150" header-align="center" align="center" />
    <el-table-column  prop="image" label="이미지" width="300" header-align="center" align="center" >
      <template #default="scope">
        <div v-if="scope.row.smartStore">
          <img
            width="150"
            height="150"
            :src="[filePath, 'files', scope.row.smartStore.image.fileName].join('/')"
            :alt="scope.row.smartStore.image.originName"
            @click="open([filePath, 'files', scope.row.smartStore.image.fileName].join('/'))"
          />
          <br/>
          <span> {{scope.row.smartStore.originName}} </span>
        </div>
      </template>
    </el-table-column>
    <el-table-column  prop="totalParticipationLimit" label="참여 제한" width="150" header-align="center" align="right" >
      <template #default="scope">
        <div>
          총 {{moneyFormatter(scope.row.totalParticipationLimit) }} 명
          <br/>
          일 {{moneyFormatter(scope.row.dayParticipationLimit)}} 명
        </div>
      </template>
    </el-table-column>
    <el-table-column  prop="totalBudget" label="총예산" width="150" header-align="center" align="right" >
      <template #default="scope">
        <span v-if="scope.row.smartStore">
          {{ moneyFormatter(scope.row.smartStore.totalBudget) }} 원
        </span>
      </template>
    </el-table-column>
    <el-table-column  prop="adEndDate" label="광고 일자" width="250" header-align="center" align="center" >
      <template #default="scope">
        {{ scope.row.adEndDate.split(' ')[0] }} ~ {{ scope.row.adEndDate.split(' ')[0] }}
      </template>
    </el-table-column>
    <el-table-column  prop="campaignStatusNm" label="캠페인 상태" width="150" header-align="center" align="center" >
      <template #default="scope">
        <el-popover
          placement="bottom-start"
          title="변경 사유"
          :width="200"
          trigger="hover"
        >
          <template #reference>
            {{ scope.row.campaignStatusNm }}
          </template>
          <template #default>
            {{ getStatusMessage(scope.row) }}
            <br>
            <br>
            {{ getStatusAt(scope.row) }}
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column  label="" width="350" header-align="center" align="center" >
      <template #default="scope">
        <el-button type="primary" tag="span" class="comm_form_btn" @click="openModifyModal(scope.row)">수정</el-button>

        <el-button v-if="scope.row.campaignStatus === 'Request'"  type="success" tag="span" class="comm_form_btn" @click="approval(scope.row)">승인</el-button>
        <el-button v-if="scope.row.campaignStatus === 'Request'"  type="success" tag="span" class="comm_form_btn" @click="statusModalOpen(scope.row, 'reject')">거절</el-button>
        <el-button v-if="scope.row.campaignStatus === 'Request'"  type="success" tag="span" class="comm_form_btn" @click="statusModalOpen(scope.row, 'hold')">보류</el-button>

      </template>
    </el-table-column>

  </el-table>

  <div class="page-box">
    <el-pagination
      :page-size="campaignSearchParams.size"
      :current-page="campaignSearchParams.page"
      background
      :default-current-page=1
      :default-page-size=20
      :total="total"
      layout="prev, pager, next"
      class="mt-4"
      @size-change="(number) => pageChange(number)"
      @current-change="(number) => pageChange(number)"
    />
<!--    <b-pagination hide-ellipsis v-model="listCondition.offset" :total-rows="listCondition.total" :per-page="listCondition.limit" @input="pageChange" />-->
  </div>

  <CampaignModifyModal />
  <CampaignStatusModal :advertiser-seq="statusAdvertiserSeq" :campaign-seq="statusCampaignSeq" :status="campaignStatus" />

</template>

<script setup>

import CampaignModifyModal from '@/components/AdCampaignManagement/CampaignModifyModal.vue'
import CampaignStatusModal from '@/components/AdCampaignManagement/CampaignStatusModal.vue'

import { campaignStore } from '@/store/modules/admin/campaignStore.js'
import { moneyFormatter, phoneFormatter } from '@/utils/customElTableFormatter'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

defineOptions({
  name: 'CampaignDataTable'
})

const filePath = computed(() => import.meta.env.VITE_FIEL_SERVER)

const statusAdvertiserSeq = ref(0)
const statusCampaignSeq = ref(0)
const campaignStatus = ref('')

const store = campaignStore()

const { campaigns, campaignSearchParams, total, selectedCampaign } = storeToRefs(store)

function pageChange(number) {
  this.store.search({ page: number })
}

function open(url) {
  window.open(url)
}

function approval(row) {
  const { advertiser, seq } = row
  const { advertiserSeq } = advertiser
  this.store.campaignApproval(advertiserSeq, seq)
}

function openModifyModal(row) {
  this.store.adCampaignModalOpen('modify', row)
}

function statusModalOpen(row, status) {
  this.store.adCampaignModalOpen('status', row)

  const { advertiser, seq } = row
  const { advertiserSeq } = advertiser

  statusAdvertiserSeq.value = advertiserSeq
  statusCampaignSeq.value = seq
  campaignStatus.value = status
}

function getStatusAt(row) {
  const { requestAt, approvalAt, holdAt, rejectAt, holdMessage, rejectMessage } = row

  let at = null

  switch (row.campaignStatus) {
    case 'Request':
      at = requestAt
      break
    case 'Approval':
      at = approvalAt
      break
    case 'Hold':
      at = holdAt
      break
    case 'Reject':
      at = rejectAt
      break
  }

  return at
}

function getStatusMessage(row) {
  const { requestAt, approvalAt, holdAt, rejectAt, holdMessage, rejectMessage } = row

  let message = null

  switch (row.campaignStatus) {
    case 'Hold':
      message = holdMessage
      break
    case 'Reject':
      message = rejectMessage
      break
  }

  return message
}


</script>

<style scoped lang="scss">

</style>
