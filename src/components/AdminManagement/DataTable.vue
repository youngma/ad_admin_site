<template>
  <el-table
    :data="adminUsers"
    class="custom-table"
    style="width: 100%"
  >
    <el-table-column fixed prop="userId" label="사용자 아이디" width="150" header-align="center" align="center" />
    <el-table-column prop="userName" label="사용자 이름" header-align="center" />
    <el-table-column prop="phoneNumber" label="전화 번호" :formatter="phoneFormatter" header-align="center" align="center">
    </el-table-column>
    <el-table-column prop="userStatusNm" label="사용자 상태" header-align="center" align="center" />
    <el-table-column prop="insertedAt" label="등록일" width="210" header-align="center" />
    <el-table-column prop="updatedAt" label="등록일" width="210" header-align="center" />
    <el-table-column prop="userStatus" label="" width="100" header-align="center">
      <template #default="scope">
          <el-button v-if="scope.row.userStatus !== 'ENABLED'" type="primary" class="comm_form_btn" @click="store.enabled(scope.row.userSeq)">활성화</el-button>
          <el-button v-else type="warning" class="comm_form_btn" @click="store.disabled(scope.row.userSeq)">비활성화</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="page-box">
    <el-pagination
      :page-size="store.searchParams.size"
      :current-page="store.searchParams.page"
      background
      :default-current-page=1
      :default-page-size=20
      :total="store.total"
      layout="prev, pager, next"
      class="mt-4"
      @size-change="pageChange"
      @current-change="pageChange"
    />
<!--    <b-pagination hide-ellipsis v-model="listCondition.offset" :total-rows="listCondition.total" :per-page="listCondition.limit" @input="pageChange" />-->
  </div>

</template>

<script setup>
import { adminManagementStore } from '@/store/modules/admin/adminManagementStore.js'
import { phoneFormatter } from '@/utils/customElTableFormatter'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'DataTable'
})

const store = adminManagementStore()

const { adminUsers } = storeToRefs(store)
function pageChange(number) {
  store.search({ page: number })
}

</script>

<style scoped lang="scss">

</style>
