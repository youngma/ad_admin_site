<template>
  <el-table
    :data="accountList"
    class="custom-table"
    style="width: 100%"
  >
    <el-table-column  prop="bankCodeName" label="은행" width="150" header-align="center" align="center" />
    <el-table-column  prop="bankAccount" label="계좌 번호"  header-align="center" align="center" >
      <template #default="scope">
        <el-button type="primary" @click="open(scope.row)"> {{scope.row.bankAccount}} </el-button>
      </template>
    </el-table-column>
    <el-table-column  prop="accountHolder" label="예금주"  header-align="center" align="center" />
    <el-table-column  prop="accountUse" label="사용 여부" width="150" header-align="center" align="center" >
      <template #default="scope">
        <span v-if="scope.row.accountUse"> 사용 </span>
        <span v-else>미사용</span>
      </template>
    </el-table-column>
    <el-table-column prop="insertedAt" label="등록일" width="170" header-align="center" />
    <el-table-column prop="updatedAt" label="수정일" width="170" header-align="center" />
    <el-table-column prop="userStatus" label="" width="250" header-align="center" align="center">
      <template #default="scope">
        <el-button v-if="!scope.row.accountUse"  type="success" tag="span" class="comm_form_btn" @click="used(scope.row)">사용</el-button>
        <el-button v-else type="warning" tag="span" class="comm_form_btn" @click="unused(scope.row)">미사용</el-button>
        <el-button type="danger" tag="span" class="comm_form_btn" @click="remove(scope.row)">삭제</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="page-box">
    <el-pagination
      :page-size="accountSearchParams.size"
      :current-page="accountSearchParams.page"
      background
      :default-current-page=1
      :default-page-size=20
      :total="accountTotal"
      layout="prev, pager, next"
      class="mt-4"
      @size-change="pageChange"
      @current-change="pageChange"
    />
  </div>

  <UserModifyModal v-if="accountModifyModal"/>

<!--  <ModifyModal v-if="selectedUser"/>-->

</template>

<script setup>

import { advertiserStore } from '@/store/modules/admin/advertiserStore.js'
import { phoneFormatter } from '@/utils/customElTableFormatter'
import { storeToRefs } from 'pinia'

// import ModifyModal from '@/components/AdminManagement/AdvertiserModifyModal.vue'

defineOptions({
  name: 'AdvertiserAccountDataTable'
})

const store = advertiserStore()
const { accountList, accountSearchParams, accountTotal, accountModifyModal } = storeToRefs(store)

function pageChange(number) {
  this.store.searchByAccounts({ page: number })
}

function used(row) {
  const { seq } = row
  this.store.accountUsed(seq)
}

function unused(row) {
  const { seq } = row
  this.store.accountUnused(seq)
}

function remove(row) {
  this.store.accountDelete(row)
}

function open(row) {
  window.open([import.meta.env.VITE_FIEL_SERVER, 'files', row.file.fileName].join('/'))
}

</script>

<style scoped lang="scss">

</style>
