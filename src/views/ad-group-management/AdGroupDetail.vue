<template>
  <div class="components-container">
    <div v-if="adGroups.selectedAdGroup" class="comm_comp">
      <el-row>
        <el-col class="comm_form_box comm_text_tit">광고 그룹 상세</el-col>
      </el-row>
      <div class="comm_comp_table">
        <el-row :gutter="10">
          <el-col :span="6" class="col_tit">
            <strong class="comm_tit_box">광고 타입</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            <el-input
              v-model="adGroups.selectedAdGroup.adTypeName"
              disabled
              class="" placeholder="광고 그룹 를 입력 해주세요." />
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6" class="col_tit">
            <strong class="comm_tit_box">광고 그룹 명</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            <el-row :gutter="10">
              <el-col :span="16">
                <el-input
                  v-model="adGroups.selectedAdGroup.groupName"
                  :class="{ 'is-error': !validation.groupName.check }"
                  class="" placeholder="광고 그룹 를 입력 해주세요." />
              </el-col>
            </el-row>
            <div v-show="!validation.groupName.check" class="invalid-feedback">
              {{validation.groupName.message}}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6" class="col_tit">
            <strong class="comm_tit_box">서비스 로고</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            <el-row :gutter="10">
              <el-col
                :span="24"
                :class="{ 'is-error': !validation.check }"
              >
                <el-upload
                  v-model:file-list="adGroups.uploadLogoFile"
                  class="upload-demo"
                  :action="dialogImageUrl"
                  :headers="headers"
                  :on-exceed="() => handleExceed()"
                  :before-upload="(raw) => handleBeforeUpload(raw)"
                  :on-success="(data, uploadFile) => handleSuccess('logoFile',data, uploadFile)"
                  :on-remove="() => handleRemove('logoFile')"
                  :on-preview="(file) => handlePreview(file)"
                  :multiple=false
                  :limit=1
                >
                  <el-button type="success">등록</el-button>
                  <template #tip>
                    <div class="el-upload__tip">
                      1MB 이하의 PNG / JPEG 파일만 등록 가능 합니다.
                    </div>
                  </template>
                </el-upload>
              </el-col>
            </el-row>
            <div v-show="!validation.logoFile.check" class="invalid-feedback">
              {{validation.logoFile.message}}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6" class="col_tit">
            <strong class="comm_tit_box">통장 사본</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            <el-row :gutter="10">
              <el-col
                :span="24"
                :class="{ 'is-error': !validation.pointIconFile.check }"
              >
                <el-upload
                  v-model:file-list="adGroups.uploadPointIconFile"
                  class="upload-demo"
                  :action="dialogImageUrl"
                  :headers="headers"
                  :on-exceed="() => handleExceed"
                  :before-upload="(raw) => handleBeforeUpload(raw)"
                  :on-success="(data, uploadFile) => handleSuccess('pointIconFile', data, uploadFile)"
                  :on-remove="() => handleRemove('pointIconFile')"
                  :on-preview="(file) => handlePreview(file)"
                  :multiple=false
                  :limit=1
                >
                  <el-button type="success">등록</el-button>
                  <template #tip>
                    <div class="el-upload__tip">
                      1MB 이하의 / PNG / JPEG 파일만 등록 가능 합니다.
                    </div>
                  </template>
                </el-upload>
              </el-col>
            </el-row>
            <div v-show="!validation.pointIconFile.check" class="invalid-feedback">
              {{validation.pointIconFile.message}}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6" class="col_tit">
            <strong class="comm_tit_box">포인트 명</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            <el-row :gutter="10">
              <el-col :span="16">
                <el-input
                  v-model="adGroups.selectedAdGroup.pointName"
                  :class="{ 'is-error': !validation.pointName.check }"
                  class="" placeholder="포인트명 을 입력 해주세요." />
              </el-col>
            </el-row>
            <div v-show="!validation.pointName.check" class="invalid-feedback">
              {{validation.pointName.message}}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6" class="col_tit">
            <strong class="comm_tit_box">서비스 콜백 URL</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            <el-row :gutter="10">
              <el-col :span="16">
                <el-input
                  v-model="adGroups.selectedAdGroup.callBackUrl"
                  :class="{ 'is-error': !validation.callBackUrl.check }"
                  class="" placeholder="서비스 콜백 URL 를 입력 해주세요." />
              </el-col>
            </el-row>
            <div v-show="!validation.callBackUrl.check" class="invalid-feedback">
              {{validation.callBackUrl.message}}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6" class="col_tit">
            <strong class="comm_tit_box">수수료 비율</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            <el-row :gutter="10">
              <el-col :span="16">
                <el-input-number v-model="adGroups.selectedAdGroup.commissionRate" :min="1" :max="100" />
              </el-col>
            </el-row>
            <div v-show="!validation.commissionRate.check" class="invalid-feedback">
              {{validation.commissionRate.message}}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6" class="col_tit">
            <strong class="comm_tit_box">포인트 교환 비율</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            <el-row :gutter="10">
              <el-col :span="16">

                <el-input-number v-model="adGroups.selectedAdGroup.rewordRate" :min="1" :max="100" />
              </el-col>
            </el-row>
            <div v-show="!validation.rewordRate.check" class="invalid-feedback">
              {{validation.rewordRate.message}}
            </div>
          </el-col>
        </el-row>
      </div>
      <el-row justify="end">
        <el-col class="t_r comm_form_box" tag="span">
          <el-button type="success" class="comm_form_btn" @click="save()">수정</el-button>
        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script setup>
import { partnerStore } from '@/store/modules/admin/partnerStore.js'
import { commonStore } from '@/store/modules/admin/commonStore.js'
import { storeToRefs } from 'pinia'
import { ref, getCurrentInstance } from 'vue'
import { getToken } from '@/utils/auth.js'
import { validURL } from '@/utils/validate.js'
import { useRoute, useRouter } from 'vue-router'

defineOptions({
  name: 'AdGroupDetail'
})

const { appContext } = getCurrentInstance()

const validation = ref({
  valid: true,
  adType: {
    check: true,
    message: ''
  },
  groupName: {
    check: true,
    message: ''
  },
  logoFile: {
    check: true,
    message: ''
  },
  pointIconFile: {
    check: true,
    message: ''
  },
  pointName: {
    check: true,
    message: ''
  },
  callBackUrl: {
    check: true,
    message: ''
  },
  commissionRate: {
    check: true,
    message: ''
  },
  rewordRate: {
    check: true,
    message: ''
  }
})

const store = partnerStore()
const common = commonStore()

const route = useRoute()
const router = useRouter()

const { adGroups } = storeToRefs(store)
const { CampaignType } = storeToRefs(common)

const dialogImageUrl = ref(import.meta.env.VITE_ADMIN_API + '/admin/v1/upload/ad_group/files')
const headers = ref({ Authorization: getToken() })

function validate(...types) {
  const { adType, groupName, logoFile, pointIconFile, pointName, callBackUrl, commissionRate, rewordRate } = adGroups.value.selectedAdGroup
  validation.value.valid = true

  for (const type of types) {
    switch (type) {
      case 'adType':

        validation.value.adType.check = true
        validation.value.adType.message = ''

        if (!adType) {
          validation.value.adType.check = false
          validation.value.adType.message = '광고 타입을 선택 해주세요.'
          validation.value.valid = false

          break
        }
        break

      case 'groupName' :
        validation.value.groupName.check = true
        validation.value.groupName.message = ''

        if (groupName === '' || groupName === null) {
          validation.value.groupName.check = false
          validation.value.groupName.message = '광고 그룹 를 입력 해주세요.'
          validation.value.valid = false
          break
        }

        break

      case 'logoFile' :

        validation.value.logoFile.check = true
        validation.value.logoFile.message = ''

        if (!logoFile) {
          validation.value.logoFile.check = false
          validation.value.logoFile.message = '서비스 로고 파일을 등록 해주세요.'

          validation.value.valid = false

          break
        }
        break

      case 'pointIconFile' :

        validation.value.pointIconFile.check = true
        validation.value.pointIconFile.message = ''

        if (!pointIconFile) {
          validation.value.pointIconFile.check = false
          validation.value.pointIconFile.message = '포인트 로고 파일을 등록 해주세요.'

          validation.value.valid = false

          break
        }

        break

      case 'callBackUrl' :

        validation.value.callBackUrl.check = true
        validation.value.callBackUrl.message = ''

        if (!validURL(callBackUrl)) {
          validation.value.callBackUrl.check = false
          validation.value.callBackUrl.message = '콜백 URL 형식을 확인해주세요.'

          validation.value.valid = false
        }

        if (callBackUrl === null || callBackUrl === '') {
          validation.value.callBackUrl.check = false
          validation.value.callBackUrl.message = '콜백 URL 을 입력 하세요.'

          validation.value.valid = false

          break
        }
        break

      case 'pointName' :

        validation.value.pointName.check = true
        validation.value.pointName.message = ''

        if (pointName === null || pointName === '') {
          validation.value.pointName.check = false
          validation.value.pointName.message = '포인트 명을 입력 하세요.'

          validation.value.valid = false

          break
        }
        break
    }
  }
}

function handleExceed() {
  store.handleExceed('adGroup')
}
function handleBeforeUpload(rawFile) {
  return store.handleBeforeUpload('adGroup', rawFile)
}

function handleSuccess(regType, data, uploadFile) {
  const { result, type } = store.uploadSuccess(regType, data, uploadFile)

  if (result.length > 0) {
    const { originFileName, newFileName, target } = result[0]

    switch (regType) {
      case 'logoFile':
        adGroups.value.register.logoFile = {
          newFile: true,
          fileType: type,
          originName: originFileName,
          fileName: [target, newFileName].join('/')
        }
        break

      case 'pointIconFile':
        adGroups.value.register.pointIconFile = {
          newFile: true,
          fileType: type,
          originName: originFileName,
          fileName: [target, newFileName].join('/')
        }
        break
    }
  }
}

function handlePreview(uploadFile) {
  store.handlePreview(uploadFile)
}
function handleRemove(type) {
  switch (type) {
    case 'logoFile':
      adGroups.value.logoFile = null

      break

    case 'pointIconFile':
      adGroups.value.pointIconFile = null
      break
  }
}

function save() {
  validate('adType', 'groupName', 'logoFile', 'pointIconFile', 'callBackUrl', 'pointName')
  if (validation.value.valid) {
    store.adGroupModify(() => {
      const { referrer } = route.query
      store.setAdGroupDetail(null)
      router.push({ path: referrer || route.params.referrer })
    })
  }
}

</script>

<style scoped lang="scss">

</style>
