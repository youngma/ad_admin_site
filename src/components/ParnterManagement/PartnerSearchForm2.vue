<template>
  <div class="comm_comp">
    <el-row>
      <el-col class="comm_form_box comm_text_tit">{{ title || '매체사 상세' }}</el-col>
    </el-row>
    <div class="frame_comp">
      <el-row :gutter="10">
        <el-col :span="4">
          <strong class="comm_tit_box">매체사 사업자 명</strong>
        </el-col>
        <el-col :span="20">
          <el-select-v2
            v-model="current"
            style="width: 240px"
            :multiple="multiple"
            :multiple-limit=multipleLimit
            :fit-input-width="true"
            filterable
            remote
            :remote-method="(query) => searchByName(query)"
            clearable
            :options="options"
            :loading="loading"
            placeholder="Please enter a keyword"
            @remove-tag="onRemoveTag"
            @change="onChange"
          />
        </el-col>
      </el-row>
    </div>
    <div v-if="advertiser && multipleLimit === 1" class="comm_comp_table mt_15">
      <el-row :gutter="10">
        <el-col :span="4" class="col_tit">
          <strong class="comm_tit_box">사업자 번호</strong>
        </el-col>
        <el-col :span="8" class="col_desc" >
          <p> {{ businessNumberFormatter( advertiser.businessNumber )}} </p>
        </el-col>
        <el-col :span="4" class="col_tit">
          <strong class="comm_tit_box"></strong>
        </el-col>
        <el-col :span="8" class="col_desc">
          <p>  </p>
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

import { ref, computed, defineProps, defineEmits } from 'vue'
import { businessNumberFormatter, phoneFormatter } from '@/utils/customElTableFormatter.js'
import * as PARTNER_API from '@/api/PARTNER_API.js'

const { multiple, selected, advertisers, multipleLimit } = defineProps({
  title: {
    type: String,
    default: '매체사 상세',
    required: false
  },
  'multipleLimit': {
    type: Number,
    default: 1,
    required: false
  },
  multiple: {
    type: Boolean,
    default: true,
    required: false
  },
  selected: {
    type: Array,
    required: true
  },
  advertisers: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['search-update', 'on-change'])

defineOptions({
  name: 'PartnerSearchFrom2'
})

const loading = ref(false)

const current = multiple ? ref(selected) : ref(selected[0])
const currentPartners = ref(advertisers)

const options = computed(() => currentPartners.value.map((item) => {
  return {
    label: item.businessName,
    value: item.partnerSeq
  }
}))

const advertiser = computed(() => {
  if (multiple) {
    return currentPartners.value.filter((t) => {
      return current.value.includes(t.partnerSeq)
    })[0]
  } else {
    return currentPartners.value.filter((t) => {
      let cmp = current.value
      if (Array.isArray(current.value)) {
        cmp = current.value[9]
      }

      return cmp === (t.partnerSeq)
    })[0]
  }
})

// const { selected, loading, options, advertiser } = storeToRefs(store)

async function searchByName(query) {
  this.loading = true

  const result = await PARTNER_API.search({
    businessName: query,
    page: 1,
    size: 50
  })
  const { content } = result
  currentPartners.value = content

  emit('search-update', { content, current: current.value })
  this.loading = false
}

function onRemoveTag(value) {
  console.log('onRemoveTag', value)
  current.value = current.value.filter(t => t !== value)
  emit('search-update', { content: [], current: current.value })
}

function onChange(value) {
  console.log('onChange', value)
  if (value) {
    emit('on-change', value)
  } else {
    emit('on-change', null)
  }
}

</script>

<style scoped lang="scss">

</style>
