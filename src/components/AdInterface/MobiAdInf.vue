<template>
  <div class="comm_comp_table mb_15">
    <el-row :gutter="10">
      <el-col :span="4" class="col_tit">
        <strong class="comm_tit_box">광고 조회</strong>
      </el-col>
      <el-col :span="16" class="col_desc">
        <el-row :gutter="10">
          <el-col :span="10" >
            <el-input
              v-model="code"
              class="" placeholder="지면 코드를 입력 하세요." />
          </el-col>
          <el-button class="ml_15" @click="laodAds()"> 조회 </el-button>
        </el-row>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="24" class="col_desc">
        <CodeJarEditor ref="codeJarEditor" :json-object="contents" />
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="24" class="col_desc">
        <el-table
          :data="mobionAds"
          class="custom-table"
          style="width: 100%"
        >
          <el-table-column fixed prop="pnm" label="캠페인 명" width="150" header-align="center" align="center" />
          <el-table-column fixed prop="increaseViewKey" label="광고 식별키" width="150" header-align="center" align="center" />
<!--          <el-table-column fixed prop="alreadyCheck" label="등록 여부" width="150" header-align="center" align="center" />-->
          <el-table-column  prop="image" label="이미지" width="400" header-align="center" align="center" >
            <template #default="scope">
                <img
                  width="150"
                  height="150"
                  :src="scope.row.mimg_250_250"
                  alt="이미지 1"
                 @click="open(scope.row.mimg_250_250)"/>
                <img
                  width="150"
                  height="150"
                  class="ml_15"
                  :src="scope.row.mimg_850_800"
                  alt="이미지 2"
                 @click="open(scope.row.mimg_850_800)"/>
            </template>
          </el-table-column>
          <el-table-column  label="" width="350" header-align="center" align="center" >
            <template #default="scope">
              <el-button v-if="!scope.row.alreadyCheck" type="primary" tag="span" class="comm_form_btn" @click="selected(scope.row)">선택</el-button>
              <span v-else> 이미 등록 된 광고 입니다.</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <div v-for="image in images" :key="image.key" class="ml_15 mt_15">
        <el-popover
          ref="popover"
          title="이미지"
          trigger="hover"
          width="auto"
          content=""
        >
          <template #reference>
            <el-image style="width: 100px; height: 100px" :src="image.value"  />
            <div>{{image.prop}}</div>
          </template>
          <template #default>
            <el-image :src="image.value" />
            <div>{{image.prop}}</div>
            <el-row justify="center">
              <el-button @click="downloadAndRegister('main', image.value)">메인 썸네일로 등록</el-button>
              <el-button @click="downloadAndRegister('detail1', image.value)">상세 이미지로 등록</el-button>
            </el-row>
          </template>
        </el-popover>
      </div>

    </el-row>
  </div>
</template>

<script setup>

defineOptions({
  name: 'MobiAdInf'
})

import CodeJarEditor from '@/components/CodeJar/index.vue'
import { defineEmits, ref } from 'vue'
import * as CAMPAIGN_API from '@/api/CAMPAIGN_API.js'
import * as UPLOAD_API from '@/api/UPLOAD_API.js'
import * as MOBON_API from '@/api/MOBION_API.js'
import _ from 'lodash'

const { ifAdCode } = defineProps({
  ifAdCode: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['image-register-cb', 'ad-info-cb'])

const code = ref(ifAdCode)
const contents = ref({})
const mobionAds = ref([])
const images = ref([])

async function downloadAndRegister(imageType, url) {
  const type = await onImageEdit(url)
  const result = await UPLOAD_API.upload('campaign', url)

  emit('image-register-cb', { imageType, type, result: result[0] })
}

const onImageEdit = async(imgUrl) => {
  const response = await fetch(imgUrl)
  const blob = await response.blob()
  return blob.type
}

async function laodAds() {
  const s = code.value
  const params = {
    s
  }

  const result = await MOBON_API.load(params)

  if (result.data) {
    contents.value = result.data
    const keys = _.map(result.data.client[0].data, 'increaseViewKey')

    console.log(keys)
    const alreadyCheck = await alreadyRegisteredByMobi(s, keys.join(','))

    mobionAds.value = result.data.client[0].data

    mobionAds.value.forEach(ad => {
      const { increaseViewKey } = ad
      if (alreadyCheck.includes(increaseViewKey)) {
        ad['alreadyCheck'] = false
      } else {
        ad['alreadyCheck'] = true
      }
    })

    //
    // const {
    //   img, img_logo, schon_logo, mimg_720_120, mimg_250_250, mimg_120_600, mimg_728_90, mimg_300_180, mimg_800_1500,
    //   mimg_160_300, mimg_300_65, mimg_850_800, mimg_960_100, mimg_720_1230, mimg_160_600,
    //   mimg_640_350, mimg_300_250, mimg_320_100, mimg_300_300
    // } = result.data.client[0].data[0]
    //
    // images.value = Object.entries({
    //   img, img_logo, schon_logo, mimg_720_120, mimg_250_250, mimg_120_600, mimg_728_90, mimg_300_180, mimg_800_1500,
    //   mimg_160_300, mimg_300_65, mimg_850_800, mimg_960_100, mimg_720_1230, mimg_160_600,
    //   mimg_640_350, mimg_300_250, mimg_320_100, mimg_300_300
    // }).map(([prop, value]) => ({ prop, value }))
    //
    // await emit('ad-info-cb', { code, contents: result.data })
    //
    // await downloadAndRegister('main', mimg_250_250)
    // await downloadAndRegister('detail1', mimg_850_800)
  }
}

async function selected(row) {
  if (row) {
    const {
      img, img_logo, schon_logo, mimg_720_120, mimg_250_250, mimg_120_600, mimg_728_90, mimg_300_180, mimg_800_1500,
      mimg_160_300, mimg_300_65, mimg_850_800, mimg_960_100, mimg_720_1230, mimg_160_600,
      mimg_640_350, mimg_300_250, mimg_320_100, mimg_300_300
    } = row

    images.value = Object.entries({
      img, img_logo, schon_logo, mimg_720_120, mimg_250_250, mimg_120_600, mimg_728_90, mimg_300_180, mimg_800_1500,
      mimg_160_300, mimg_300_65, mimg_850_800, mimg_960_100, mimg_720_1230, mimg_160_600,
      mimg_640_350, mimg_300_250, mimg_320_100, mimg_300_300
    }).map(([prop, value]) => ({ prop, value }))

    await emit('ad-info-cb', { code, contents: row })

    await downloadAndRegister('main', mimg_250_250)
    await downloadAndRegister('detail1', mimg_850_800)
  }
}

async function alreadyRegisteredByMobi(ifAdCode, keys) {
  const params = {
    ifAdCode,
    keys
  }
  return await CAMPAIGN_API.already_registeredByMobi(params)
}

function open(url) {
  window.open(url)
}

</script>

<style scoped lang="scss">

</style>
