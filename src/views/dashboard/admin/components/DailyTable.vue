<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px; margin-bottom: 15px">
    <el-table-column label="일자" min-width="100" title="일자" header-align="center" align="center" >
      <template #default="scope">
        {{dateFormatter(scope.row.rptDate) }}
      </template>
    </el-table-column>
    <el-table-column label="요청" width="195" align="center" title="요청" header-align="center" >
      <template #default="scope">
        {{ moneyFormatter(scope.row.reqCnt) }} 건
      </template>
    </el-table-column>
<!--    <el-table-column label="노출" width="195" align="center" title="노출" header-align="center" >-->
<!--      <template #default="scope">-->
<!--        {{ moneyFormatter(scope.row.impressionCnt) }} 건-->

<!--      </template>-->
<!--    </el-table-column>-->
    <el-table-column label="노출" width="120" align="center" title="상세" header-align="center" >
      <template #default="scope">
        {{ moneyFormatter(scope.row.detailCnt) }} 건

      </template>
    </el-table-column>
    <el-table-column label="클릭" width="120" align="center" title="클릭" header-align="center" >
      <template #default="scope">
        {{ moneyFormatter(scope.row.clickCnt) }} 건

      </template>
    </el-table-column>
    <el-table-column label="CTR" width="120" align="center" title="CTR" header-align="center" >
      <template #default="scope">
        {{ scope.row.detailCnt > 0 ?(scope.row.clickCnt / scope.row.detailCnt * 100).toFixed(2) : Number(0).toFixed(2) }} %
      </template>
    </el-table-column>
    <el-table-column label="참여자 수" width="120" align="center" title="참여자 수" header-align="center" >
      <template #default="scope">
        {{ moneyFormatter(scope.row.answerCnt) }} 건
      </template>
    </el-table-column>
    <el-table-column  prop="adCost"  label="광고 금액(합계)" width="150" header-align="center" align="right" >
      <template #default="scope">
        {{ moneyFormatter(scope.row.adCost) }} 원
      </template>
    </el-table-column>
    <el-table-column  prop="partnerCommission"  width="150" label="매체사 리워드"  header-align="center" align="right" >
      <template #default="scope">
        {{moneyFormatter(scope.row.partnerCommission) }} 원
      </template>
    </el-table-column>
    <el-table-column  prop="userCommission"  width="150" label="사용자 리워드"  header-align="center" align="right" >
      <template #default="scope">
        {{moneyFormatter(scope.row.userCommission) }} 원
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue'
import { dateFormatter, moneyFormatter } from '@/utils/customElTableFormatter.js'

const { list } = defineProps({
  list: {
    type: Array,
    default: [],
    required: true
  }
})
</script>
