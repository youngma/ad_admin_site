<template>
  <div class="comm_comp">
    <el-row>
      <el-col class="comm_form_box comm_text_tit">광고주 상세</el-col>
    </el-row>
    <div class="frame_comp">
      <el-row :gutter="10">
        <el-col :span="4">
          <strong class="comm_tit_box">광고주 사업자 명</strong>
        </el-col>
        <el-col :span="8">
          <el-select-v2
            v-model="selected"
            style="width: 240px"
            multiple
            :multiple-limit=1
            filterable
            remote
            :remote-method="(query) => searchByName(query)"
            clearable
            :options="options"
            :loading="loading"
            placeholder="Please enter a keyword"
          />
        </el-col>
      </el-row>
    </div>
    <div v-if="advertiser" class="comm_comp_table mt_15">
      <el-row :gutter="10">
        <el-col :span="4" class="col_tit">
          <strong class="comm_tit_box">사업자 번호</strong>
        </el-col>
        <el-col :span="8" class="col_desc" >
          <p> {{ businessNumberFormatter( advertiser.businessNumber )}} </p>
        </el-col>
        <el-col :span="4" class="col_tit">
          <strong class="comm_tit_box">대표자 명</strong>
        </el-col>
        <el-col :span="8" class="col_desc">
          <p> {{advertiser.advertiserName}} </p>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="4" class="col_tit">
          <strong class="comm_tit_box">전화 번호</strong>
        </el-col>
        <el-col :span="8" class="col_desc">
          <p> {{ phoneFormatter( advertiser.phoneNumber )}} </p>
        </el-col>
        <el-col :span="4" class="col_tit">
          <strong class="comm_tit_box">이메일</strong>
        </el-col>
        <el-col :span="8" class="col_desc">
          <p>{{advertiser.email}} </p>
        </el-col>
      </el-row>
    </div>
    <el-row justify="end" >
      <el-col class="t_r comm_form_box">
      </el-col>
    </el-row>
  </div>
</template>

<script setup>

import { advertiserStore } from '@/store/modules/admin/advertiserStore.js'
import { storeToRefs } from 'pinia'
import { businessNumberFormatter, phoneFormatter } from '@/utils/customElTableFormatter.js'

defineOptions({
  name: 'AdvertiserSearchFrom2'
})

const store = advertiserStore()


console.log(store)

const { selected, loading, options, advertiser } = storeToRefs(store)

function searchByName(query) {
  console.log(this.store)
  this.store.search(query)
}

</script>

<style scoped lang="scss">

</style>
