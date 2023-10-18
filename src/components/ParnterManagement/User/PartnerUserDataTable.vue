<template>
  {{ userList }}
  {{ users.list }}
  <el-table
    :data="userList"
    class="custom-table"
    style="width: 100%"
  >
    <el-table-column fixed prop="userId" label="사용자 아이디" width="150" header-align="center" align="center" />
    <el-table-column prop="userName" label="사용자 이름"  header-align="center" />
    <el-table-column prop="phoneNumber" label="전화 번호"  header-align="center" align="center">
      <template #default="scope">
        {{ phoneFormatter(scope.row.phoneNumber) }}
      </template>
    </el-table-column>
    <el-table-column prop="userStatusName" label="사용자 상태" width="120" header-align="center" align="center" />
    <el-table-column prop="insertedAt" label="등록일" width="170" header-align="center" />
    <el-table-column prop="updatedAt" label="수정일" width="170" header-align="center" />
    <el-table-column prop="userStatus" label="" width="250" header-align="center" align="center">
      <template #default="scope">
          <el-button v-if="scope.row.userStatus !== 'ENABLED'" type="success" tag="span" class="comm_form_btn" @click="enabled(scope.row)">활성화</el-button>
          <el-button v-else type="warning" tag="span" class="comm_form_btn" @click="disabled(scope.row)">비활성화</el-button>
          <el-button type="primary" tag="span" class="comm_form_btn" @click="modify(scope.row)">수정</el-button>

      </template>
    </el-table-column>
  </el-table>

  <div class="page-box">
    <el-pagination
      :page-size="userSearchParams.size"
      :current-page="userSearchParams.page"
      background
      :default-current-page=1
      :default-page-size=20
      :total="userTotal"
      layout="prev, pager, next"
      class="mt-4"
      @size-change="pageChange"
      @current-change="pageChange"
    />
  </div>

  <PartnerUserModifyModal v-if="selectedUser"/>

</template>

<script setup>

import { partnerStore } from '@/store/modules/admin/partnerStore.js'
import { phoneFormatter } from '@/utils/customElTableFormatter'
import { storeToRefs } from 'pinia'

import PartnerUserModifyModal from '@/components/ParnterManagement/User/PartnerUserModifyModal.vue'

defineOptions({
  name: 'PartnerUserSearchForm'
})

const store = partnerStore()
const { users, userList, userSearchParams, userTotal, selectedUser, userModifyModal } = storeToRefs(store)

function pageChange(number) {
  store.searchByUsers({ page: number })
}

function enabled(row) {
  const { userSeq } = row
  store.userEnable(userSeq)
}

function disabled(row) {
  const { userSeq } = row
  store.userDisable(userSeq)
}

function modify(row) {
  store.userSelected(row)
  store.userModalOpen('modify')
}

</script>

<style scoped lang="scss">

</style>
