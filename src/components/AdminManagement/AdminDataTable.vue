<template>
  <el-table
    :data="adminUsers"
    class="custom-table"
    style="width: 100%"
  >
    <el-table-column fixed prop="userId" label="사용자 아이디" width="150" header-align="center" align="center" />
    <el-table-column prop="userName" label="사용자 이름" width="220" header-align="center" >
      <template #default="scope">
        <el-button @click="open(scope.row)">{{ scope.row.userName }}</el-button>
      </template>
    </el-table-column>
<!--    <el-table-column prop="phoneNumber" label="전화 번호" :formatter="phoneFormatter" header-align="center" align="center">-->
    <el-table-column prop="phoneNumber" label="전화 번호" header-align="center" align="center">
      <template #default="scope">
        {{ phoneFormatter(scope.row.phoneNumber) }}
      </template>
    </el-table-column>
    <el-table-column prop="userStatusNm" label="사용자 상태" header-align="center" align="center" />
    <el-table-column prop="insertedAt" label="등록일" width="210" align="center" header-align="center" />
    <el-table-column prop="updatedAt" label="등록일" width="210" align="center" header-align="center" />
    <el-table-column prop="userStatus" label="" width="150" header-align="center" align="center">
      <template #default="scope">
          <el-button v-if="scope.row.userStatus !== 'Enable'" type="primary" tag="span" class="comm_form_btn" @click="enabled(scope.row)">활성화</el-button>
          <el-button v-else type="warning" tag="span" class="comm_form_btn" @click="disabled(scope.row)">비 활성화</el-button>
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

  <ModifyModal v-if="selectedUser"/>

</template>

<script setup>

import { adminManagementStore } from '@/store/modules/admin/adminManagementStore.js'
import { phoneFormatter } from '@/utils/customElTableFormatter'
import { storeToRefs } from 'pinia'

import ModifyModal from '@/components/AdminManagement/AdminModifyModal.vue'

defineOptions({
  name: 'AdminDataTable'
})

const store = adminManagementStore()

const { adminUsers, selectedUser, searchParams, total } = storeToRefs(store)

function pageChange(number) {
  this.store.search({ page: number })
}

function enabled(row) {
  const { userSeq } = row
  this.store.enabled(userSeq)
}

function disabled(row) {
  const { userSeq } = row
  this.store.disabled(userSeq)
}

function open(row) {
  this.store.selected(row)
}

</script>

<style scoped lang="scss">

</style>
