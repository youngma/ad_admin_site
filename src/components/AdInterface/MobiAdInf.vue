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
import * as UPLOAD_API from '@/api/UPLOAD_API.js'

import * as MOBON_API from '@/api/MOBION_API.js'

const { ifAdCode } = defineProps({
  ifAdCode: {
    type: String,
    default: ''
  }yanr yarn
})
const emit = defineEmits(['image-register-cb', 'ad-info-cb'])

const code = ref(ifAdCode)
const contents = ref({})
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
    s,
    cntad: 1,
    cntsr: 1,
    bntype: 99,
    sslRedirect: 'Y'
  }

  const result = await MOBON_API.load(params)

  if (result.data) {
    contents.value = result.data

    const {
      img, img_logo, schon_logo, mimg_720_120, mimg_250_250, mimg_120_600, mimg_728_90, mimg_300_180, mimg_800_1500,
      mimg_160_300, mimg_300_65, mimg_850_800, mimg_960_100, mimg_720_1230, mimg_160_600,
      mimg_640_350, mimg_300_250, mimg_320_100, mimg_300_300
    } = result.data.client[0].data[0]

    images.value = Object.entries({
      img, img_logo, schon_logo, mimg_720_120, mimg_250_250, mimg_120_600, mimg_728_90, mimg_300_180, mimg_800_1500,
      mimg_160_300, mimg_300_65, mimg_850_800, mimg_960_100, mimg_720_1230, mimg_160_600,
      mimg_640_350, mimg_300_250, mimg_320_100, mimg_300_300
    }).map(([prop, value]) => ({ prop, value }))

    await emit('ad-info-cb', { code, contents: result.data })

    await downloadAndRegister('main', mimg_250_250)
    await downloadAndRegister('detail1', mimg_850_800)
  }
}

</script>

<style scoped lang="scss">

</style>
