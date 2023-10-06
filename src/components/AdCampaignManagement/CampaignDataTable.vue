<template>
  <el-table
    :data="list"
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
        <div v-if="scope.row.quiz">
          <img
            width="150"
            height="150"
            :src="[filePath, 'files', scope.row.quiz.mainImage.fileName].join('/')"
            :alt="scope.row.quiz.mainImage.originName"
            @click="open([filePath, 'files', scope.row.quiz.mainImage.fileName].join('/'))"
          />
          <br/>
          <span> {{scope.row.quiz.mainImage.originName}} </span>
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
        <span v-else>
          - 원
        </span>
      </template>
    </el-table-column>
    <el-table-column  prop="adEndDate" label="광고 일자" width="250" header-align="center" align="center" >
      <template #default="scope">
        {{ scope.row.adEndDate.split(' ')[0] }} ~ {{ scope.row.adEndDate.split(' ')[0] }}
      </template>
    </el-table-column>
    <el-table-column  prop="campaignStatusName" label="캠페인 상태" width="150" header-align="center" align="center" >
      <template #default="scope">
        <el-popover
          placement="bottom-start"
          title="변경 사유"
          :width="200"
          trigger="hover"
        >
          <template #reference>
            {{ scope.row.campaignStatusName }}
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
        <el-button type="primary" tag="span" class="comm_form_btn" @click="goCampaignDetail(scope.row)">수정</el-button>

        <el-button v-if="scope.row.campaignStatus === 'Request'"  type="success" tag="span" class="comm_form_btn" @click="approval(scope.row)">승인</el-button>
        <el-button v-if="scope.row.campaignStatus === 'Request'"  type="success" tag="span" class="comm_form_btn" @click="statusModalOpen(scope.row, 'reject')">거절</el-button>
        <el-button v-if="scope.row.campaignStatus === 'Request'"  type="success" tag="span" class="comm_form_btn" @click="statusModalOpen(scope.row, 'hold')">보류</el-button>

      </template>
    </el-table-column>

  </el-table>

  <div class="page-box">
    <el-pagination
      :page-size="size"
      :current-page="page_count"
      background
      :default-current-page=1
      :default-page-size=20
      :total="total"
      layout="prev, pager, next"
      class="mt-4"
      @size-change="pageChange"
      @current-change="pageChange"
    />
<!--    <b-pagination hide-ellipsis v-model="listCondition.offset" :total-rows="listCondition.total" :per-page="listCondition.limit" @input="pageChange" />-->
  </div>

  <CampaignStatusModal :advertiser-seq="statusAdvertiserSeq" :campaign-seq="statusCampaignSeq" :status="campaignStatus" />

</template>

<script setup>

import CampaignStatusModal from '@/components/AdCampaignManagement/CampaignStatusModal.vue'

import { partnerStore } from '@/store/modules/admin/partnerStore.js'
import { moneyFormatter, phoneFormatter } from '@/utils/customElTableFormatter'
import { computed, defineEmits, defineProps, ref } from 'vue'
import { useRouter } from 'vue-router'
import {advertiserStore} from "@/store/modules/admin/advertiserStore.js";

defineOptions({
  name: 'CampaignDataTable'
})

const emit = defineEmits(['search-call'])

const { list, total, page, size, referrer } = defineProps({
  list: {
    type: Array,
    default: [],
    required: true
  },
  total: {
    type: Number,
    default: 1,
    required: true
  },
  page: {
    type: Number,
    default: 1,
    required: true
  },
  size: {
    type: Number,
    default: 1,
    required: true
  },
  referrer: {
    type: String,
    required: false
  }
})

const filePath = computed(() => import.meta.env.VITE_FILE_SERVER)

const statusAdvertiserSeq = ref(0)
const statusCampaignSeq = ref(0)
const campaignStatus = ref('')
const page_count = ref(page)

const router = useRouter()
const store = advertiserStore()

// const { campaigns } = storeToRefs(store)

function pageChange(number) {
  this.store.search({ page: number })
  emit('search-call', { page: number })
  page_count.value = page
}

function open(url) {
  window.open(url)
}

function approval(row) {
  const { advertiser, seq } = row
  const { advertiserSeq } = advertiser
  this.store.campaignApproval(advertiserSeq, seq)
}

function goCampaignDetail(row) {
  this.store.setCampaignDetail(row)
  this.router.push({ name: 'AdCampaignDetail', query: { referrer }})
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
