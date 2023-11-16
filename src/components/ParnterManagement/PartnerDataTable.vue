<template>
  <el-table
    :data="partners"
    class="custom-table"
    style="width: 100%"
  >
    <el-table-column fixed prop="businessName" label="광고주 사업자 명" width="150" header-align="center" align="center" >
      <template #default="scope">
        <el-button @click="goDetail(scope.row)">{{ scope.row.businessName }}</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="businessNumber" label="사업자 번호"  header-align="center" align="center">
      <template #default="scope">
        {{ businessNumberFormatter(scope.row.businessNumber) }}
      </template>
    </el-table-column>
    <el-table-column prop="phoneNumber" label="전화 번호" header-align="center" align="center">
      <template #default="scope">
        {{ phoneFormatter(scope.row.phoneNumber) }}
      </template>
    </el-table-column>
    <el-table-column prop="email" label="이메일" header-align="center" align="center" />
    <el-table-column prop="insertedAt" label="등록일" header-align="center" />
    <el-table-column prop="updatedAt" label="수정일" header-align="center" />

    <el-table-column prop="advertiserSeq" label="" align="center" width="250px">
      <template #default="scope">
        <el-button type="success" @click="open(scope.row)">수정</el-button>
        <el-button type="danger" @click="openByBusinessNumber(scope.row)">사업자명 변경</el-button>
      </template>
    </el-table-column>

  </el-table>

  <div class="page-box">
    <el-pagination
      :page-size="searchParams.size"
      :current-page="searchParams.page"
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
  <PartnerModifyModal @close="close()"/>
  <PartnerBusinessNumberModifyModal @close="close()"/>

</template>

<script setup>

import { partnerManagementStore } from '@/store/modules/admin/partnerManagementStore.js'
import { partnerStore } from '@/store/modules/admin/partnerStore.js'
import { phoneFormatter, businessNumberFormatter } from '@/utils/customElTableFormatter'
import { storeToRefs } from 'pinia'
import PartnerModifyModal from '@/components/ParnterManagement/PartnerModifyModal.vue'
import PartnerBusinessNumberModifyModal from '@/components/ParnterManagement/PartnerBusinessNumberModifyModal.vue'
import { useRoute, useRouter } from 'vue-router'

defineOptions({
  name: 'PartnerDataTable'
})

const store = partnerManagementStore()

const router = useRouter()
const route = useRoute()

const { partners, searchParams, total } = storeToRefs(store)

function pageChange(number) {
  store.search({ page: number })
}

function open(row) {
  store.selectedPartner('info', row)
}

function openByBusinessNumber(row) {
  store.selectedPartner('businessNumber', row)
}

function close() {
  store.selectedPartner(null)
}

function goDetail(row) {
  partnerStore().setPartners({
    partners: [row],
    selected: [row.partnerSeq]
  })
  router.push({ name: 'PartnerDetail', query: { referrer: '/partner-management/detail' }})
}

</script>

<style scoped lang="scss">

</style>
