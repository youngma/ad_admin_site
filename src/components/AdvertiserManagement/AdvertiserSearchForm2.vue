<template>
  <div class="comm_comp">
    <el-row>
      <el-col class="comm_form_box comm_text_tit">{{ title || '광고주 상세' }}</el-col>
    </el-row>
    <div class="frame_comp">
      <el-row :gutter="10">
        <el-col :span="4">
          <strong class="comm_tit_box">광고주 사업자 명</strong>
        </el-col>
        <el-col :span="20">
          <el-select-v2
            v-model=current
            style="width: 240px"
            :multiple=multiple
            :multiple-limit=multipleLimit
            :fit-input-width="true"
            filterable
            remote
            :remote-method="(query) => searchByName(query)"
            clearable
            :options="options"
            :loading="loading"
            placeholder="광고주 명을 입력 해주세요."
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
      <el-row :gutter="10">
        <el-col :span="4" class="col_tit">
          <strong class="comm_tit_box">연동 코드</strong>
        </el-col>
        <el-col :span="8" class="col_desc">
          <p> {{ advertiser.ifCode }} </p>
        </el-col>
        <el-col :span="4" class="col_tit">
        </el-col>
        <el-col :span="8" class="col_desc">
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

import { ref, computed, defineProps, defineEmits, defineExpose } from 'vue'
import { businessNumberFormatter, phoneFormatter } from '@/utils/customElTableFormatter.js'
import * as ADVERTISER_API from '@/api/ADVERTISER_API'

const { multiple, selected, advertisers, multipleLimit } = defineProps({
  title: {
    type: String,
    default: '광고주 상세',
    required: false
  },
  multipleLimit: {
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
  name: 'AdvertiserSearchFrom2'
})

const loading = ref(false)

const current = multiple ? ref(selected) : ref(selected[0])
const currentAdvertisers = ref(advertisers)

const options = computed(() => currentAdvertisers.value.map((item) => {
  return {
    label: item.businessName,
    value: item.advertiserSeq
  }
}))

const advertiser = computed(() => {
  if (multiple) {
    return currentAdvertisers.value.filter((t) => {
      return current.value.includes(t.advertiserSeq)
    })[0]
  } else {
    return currentAdvertisers.value.filter((t) => {
      let cmp = current.value

      if (Array.isArray(current.value)) {
        cmp = current.value[0]
      }

      return cmp === (t.advertiserSeq)
    })[0]
  }
})

// const { selected, loading, options, advertiser } = storeToRefs(store)

async function searchByName(query) {
  loading.value = true

  const result = await ADVERTISER_API.search({
    businessName: query,
    page: 1,
    size: 50
  })
  const { content } = result
  currentAdvertisers.value = content
  let _current = current.value

  if (!multiple) {
    _current = !_current ? [] : [_current]
  }

  emit('search-update', { content, current: _current })
  loading.value = false
}

function onRemoveTag(value) {
  if (multiple) {
    current.value = current.value.filter(t => t !== value)
  } else {
    current.value = null
  }
}

function onChange(value) {
  if (value) {
    emit('on-change', multiple ? value : [value])
  } else {
    emit('on-change', multiple ? [] : [])
  }
}

function initSet(selected, advertisers) {
  current.value = multiple ? selected : selected[0]
  currentAdvertisers.value = advertisers
}

defineExpose({
  initSet
})

</script>

<style scoped lang="scss">

</style>
