<template>
  <el-table
    :data="advertisers"
    class="custom-table"
    style="width: 100%"
  >
    <el-table-column fixed prop="businessName" label="광고주 사업자 명" width="150" header-align="center" align="center" >
      <template #default="scope">
        <el-button @click="open(scope.row)">{{ scope.row.businessName }}</el-button>
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
    <el-table-column prop="advertiserName" label="광고주 대표 명" header-align="center" align="center" />
    <el-table-column prop="insertedAt" label="등록일" header-align="center" />
    <el-table-column prop="updatedAt" label="등록일" header-align="center" />
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

  <ModifyModal />

</template>

<script setup>

import { advertiserManagementStore } from '@/store/modules/admin/advertiserManagementStore.js'
import { phoneFormatter, businessNumberFormatter } from '@/utils/customElTableFormatter'
import { storeToRefs } from 'pinia'

import ModifyModal from '@/components/AdvertiserManagement/ModifyModal.vue'

defineOptions({
  name: 'AdvertiserDataTable'
})

const store = advertiserManagementStore()

const { advertisers, searchParams, total } = storeToRefs(store)

function pageChange(number) {
  this.store.search({ page: number })
}

function open(row) {
  console.log(this.store)
  this.store.selectedAdvertiser(row)
}

</script>

<style scoped lang="scss">

</style>
