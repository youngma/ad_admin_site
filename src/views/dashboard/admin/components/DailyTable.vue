<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">

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
    <el-table-column label="노출" width="195" align="center" title="노출" header-align="center" >
      <template #default="scope">
        {{ moneyFormatter(scope.row.impressionCnt) }} 건

      </template>
    </el-table-column>
    <el-table-column label="상세" width="195" align="center" title="상세" header-align="center" >
      <template #default="scope">
        {{ moneyFormatter(scope.row.detailCnt) }} 건

      </template>
    </el-table-column>
    <el-table-column label="클릭" width="195" align="center" title="클릭" header-align="center" >
      <template #default="scope">
        {{ moneyFormatter(scope.row.clickCnt) }} 건

      </template>
    </el-table-column>
    <el-table-column label="정답" width="195" align="center" title="정답" header-align="center" >
      <template #default="scope">
        {{ moneyFormatter(scope.row.answerCnt) }} 건
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
