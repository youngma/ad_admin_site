<template>
  <el-table
    :data="campaigns"
    class="custom-table"
    style="width: 100%"
  >
    <el-table-column fixed prop="campaignName" label="캠페인 명" width="150" header-align="center" align="center" />
    <el-table-column  prop="campaignTypeName" label="캠페인 타입" width="150" header-align="center" align="center" />
    <el-table-column  prop="campaignCode" label="캠페인 코드" width="150" header-align="center" align="center" />
    <el-table-column  prop="goodsCode" label="상품 코드" width="150" header-align="center" align="center" />
    <el-table-column  prop="totalBudget" label="총예산" width="150" header-align="center" align="right" >
      <template #default="scope">
        {{ moneyFormatter(scope.row.totalBudget) }} 원
      </template>
    </el-table-column>
    <el-table-column  prop="adEndDate" label="광고 일자" width="250" header-align="center" align="center" >
      <template #default="scope">
        {{ scope.row.adEndDate.split(' ')[0] }} ~ {{ scope.row.adEndDate.split(' ')[0] }}
      </template>
    </el-table-column>
    <el-table-column  prop="paymentTermsName" label="지급 방법" width="150" header-align="center" align="center" />
    <el-table-column  prop="campaignStatusNm" label="캠페인 상태" width="150" header-align="center" align="center" />

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

</template>

<script setup>

import { campaignStore } from '@/store/modules/admin/campaignStore.js'
import { moneyFormatter, phoneFormatter } from '@/utils/customElTableFormatter'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'CampaignDataTable'
})

const store = campaignStore()

const { campaigns, campaignSearchParams, total } = storeToRefs(store)

function pageChange(number) {
  this.store.search({ page: number })
}
</script>

<style scoped lang="scss">

</style>
