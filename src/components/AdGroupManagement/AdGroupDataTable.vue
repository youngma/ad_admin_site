<template>
  <el-table
    :data="list"
    class="custom-table"
    style="width: 100%"
  >
    <el-table-column  prop="adTypeName" label="광고 타입" width="150" header-align="center" align="center" />
    <el-table-column  prop="groupCode" label="지면 코드" width="150" header-align="center" align="center" />
    <el-table-column  prop="groupName" label="지면 명" width="150" header-align="center" align="center" />
    <el-table-column  prop="logoFile" label="서비스 로고" width="150" header-align="center" align="center" >
      <template #default="scope">
        <img
          width="100"
          height="100"
          :src="[filePath, 'files', scope.row.logoFile.fileName].join('/')"
          :alt="scope.row.logoFile.originName"
          @click="open([filePath, 'files', scope.row.logoFile.fileName].join('/'))"
        />
        <br/>
        <span> {{scope.row.logoFile.originName}} </span>
      </template>
    </el-table-column>
    <el-table-column  prop="pointIconFile" label="포인트 로고" width="150" header-align="center" align="center" >
      <template #default="scope">
        <img
          width="100"
          height="100"
          :src="[filePath, 'files', scope.row.pointIconFile.fileName].join('/')"
          :alt="scope.row.pointIconFile.originName"
          @click="open([filePath, 'files', scope.row.pointIconFile.fileName].join('/'))"
        />
        <br/>
        <span> {{scope.row.pointIconFile.originName}} </span>
      </template>
    </el-table-column>

    <el-table-column prop="pointName" label="포인트 명" align="center" header-align="center" />
    <el-table-column prop="commissionRate" label="수수료(매체사)" width="150" align="center" header-align="center">
      <template #default="scope">
        {{ scope.row.commissionRate }}%
      </template>
    </el-table-column>
    <el-table-column prop="userCommissionRate" label="수수료(사용자)" width="150" align="center" header-align="center" >
      <template #default="scope">
        {{ scope.row.userCommissionRate }}%
      </template>
    </el-table-column>
    <el-table-column prop="rewordRate" label="포인트 교환 비율" width="150" align="center" header-align="center" >
      <template #default="scope">
       1 원을 {{ scope.row.rewordRate }} <b> {{  scope.row.pointName  }} </b> 으로 전환 합니다.
      </template>
    </el-table-column>
    <el-table-column prop="groupStatusName" label="서비스 상태" width="170" align="center" header-align="center" >
      <template #default="scope">
        <el-popover
          placement="bottom-start"
          title="변경 사유"
          :width="200"
          trigger="hover"
        >
          <template #reference>
            {{ scope.row.groupStatusName }}
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

    <el-table-column prop="requestAt" label="요청일" width="170" header-align="center" />
    <el-table-column prop="updatedAt" label="수정일" width="170" header-align="center" />
    <el-table-column label="" width="250" header-align="center" align="center">
      <template #default="scope">

        <!--
          // 승인 요청 -> 승인
          // 승인 요청 -> 보류 -> 승인
          // 승인 요청 -> 거절 -> 승인 요청 -> 승인
          // 승인 -> 중지
        -->
        <el-button type="primary" tag="span" class="comm_form_btn" @click="() => goAdGroupDetail(scope.row)">수정</el-button>
        <el-button v-if="scope.row.groupStatus === 'APPROVAL'"  type="info" tag="span" class="comm_form_btn" @click="() => goMappingAds(scope.row)">광고 맵핑</el-button>
        <el-button v-if="scope.row.groupStatus === 'REQUEST'"  type="success" tag="span" class="comm_form_btn" @click="({ scope }) =>approval(scope.row)">승인</el-button>
        <el-button v-if="scope.row.groupStatus === 'REQUEST'"  type="success" tag="span" class="comm_form_btn" @click="({ scope }) =>statusModalOpen(scope.row, 'reject')">거절</el-button>
        <el-button v-if="scope.row.groupStatus === 'REQUEST'"  type="success" tag="span" class="comm_form_btn" @click="({ scope }) =>statusModalOpen(scope.row, 'hold')">보류</el-button>
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
  </div>
  <PartnerAdGroupStatusModal :group-seq="statusModalGroupSeq" :status="statusModalStatus" />
</template>

<script setup>

import { partnerStore } from '@/store/modules/admin/partnerStore.js'
import { computed, ref, defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'

import PartnerAdGroupStatusModal from '@/components/ParnterManagement/AdGroup/PartnerAdGroupStatusModal.vue'

defineOptions({
  name: 'AdGroupDataTable'
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

// const adGroups = ref(list)
// const total_count = ref(total)
const page_count = ref(page)
// const size_count = ref(size)

const store = partnerStore()
const router = useRouter()

const filePath = computed(() => import.meta.env.VITE_FILE_SERVER)

const statusModalStatus = ref('')
const statusModalGroupSeq = ref(0)

function pageChange(number) {
  emit('search-call', { page: number })
  page_count.value = page
}

function getStatusAt(row) {
  const { requestAt, approvalAt, holdAt, rejectAt, holdMessage, rejectMessage } = row

  let at = null

  switch (row.groupStatus) {
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

  switch (row.groupStatus) {
    case 'Hold':
      message = holdMessage
      break
    case 'Reject':
      message = rejectMessage
      break
  }

  return message
}

function goAdGroupDetail(row) {
  store.setAdGroupDetail(row)
  router.push({ name: 'AdGroupDetail', query: { referrer }})
}

async function goMappingAds(row) {
  await store.setAdGroupDetail(row)
  // console.log(row)
  await store.searchByMappingAds(row.groupSeq, row.partner.partnerSeq)
  await store.searchByCampaigns({ page: 1 })
  await router.push({ name: 'MappingAds', query: { referrer }})
}

function approval(row) {
  const { groupSeq, partner } = row
  const { partnerSeq } = partner
  store.adGroupApproval({ partnerSeq, groupSeq }, () => {
    store.reloadByAdGroups()
  })
}

function open(url) {
  window.open(url)
}

</script>

<style scoped lang="scss">

</style>
