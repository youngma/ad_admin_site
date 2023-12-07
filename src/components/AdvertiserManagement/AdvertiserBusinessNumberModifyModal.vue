<template>
  <el-dialog v-if="selected" v-model="modifyPopupByBusinessNumber" title="광고주 수정" width="900" >
    <div class="comm_comp">
      <div class="comm_comp_table">
        <el-row :gutter="10">
          <el-col :span="6" class="col_tit">
            <strong class="comm_tit_box">광고주 사업자 명</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            <el-row :gutter="10">
              <el-col :span="20">
                <div
                  hidden="hidden"
                >
                  <el-input
                    v-model="selected.businessName"
                  />
                  <el-input
                    v-model="selected.advertiserSeq"
                    disabled
                  />
                </div>
                <el-input
                          v-model="selected.businessName"
                          :class="{ 'is-error': !validation.businessName.check }"
                          class="" placeholder="광고주 사업자 명을 입력 해주세요." />
              </el-col>
            </el-row>
            <div v-show="!validation.businessName.check" class="invalid-feedback">
              {{validation.businessName.message}}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6" class="col_tit">
            <strong class="comm_tit_box">광고주 사업자 명</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            <el-row :gutter="10">
              <el-col
                :span="10"
                :class="{ 'is-error': !validation.businessNumber.check }"
              >
              <el-input
                  v-model="selected.businessNumber"
                  :disabled="selected.alReadyCheck"
                  class="" placeholder="광고주 사업자 번호을 입력 해주세요." />
              </el-col>
              <el-button
                v-if="selected.businessNumber !== selected.originBusinessNumber && !selected.alReadyCheck"
                type="info"
                tag="span"
                class="comm_form_btn ml_15"
                @click.prevent="check()"
              >중복 체크</el-button>
            </el-row>
            <div v-show="!validation.businessNumber.check" class="invalid-feedback">
              {{validation.businessNumber.message}}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6" class="col_tit">
            <strong class="comm_tit_box">사업자 등록증</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            <el-row :gutter="10">
              <el-col
                :span="10"
                :class="{ 'is-error': !validation.businessRegistrationFile.check }"
              >
                <el-upload
                  v-model:file-list="uploadFiles"
                  class="upload-demo"
                  :action="dialogImageUrl"
                  :headers="headers"
                  :on-exceed="handleExceed"
                  :before-upload="(raw) => handleBeforeUpload(raw)"
                  :on-success="(data, uploadFile) => handleSuccess(data, uploadFile)"
                  :on-remove="() => handleRemove()"
                  :on-preview="(file) => handlePreview(file)"
                  :multiple="false"
                  :limit=1
                >
                  <el-button type="success">사업자 등록증 추가</el-button>
                  <template #tip>
                    <div class="el-upload__tip">
                      2MB 이하의 PDF 파일만 등록 가능 합니다.
                    </div>
                  </template>
                </el-upload>
              </el-col>
            </el-row>
            <div v-show="!validation.businessRegistrationFile.check" class="invalid-feedback">
              {{validation.businessRegistrationFile.message}}
            </div>
          </el-col>
        </el-row>
      </div>
      <el-row justify="end">
        <el-col class="t_r comm_form_box" tag="span">
          <el-button type="primary" class="comm_form_btn" @click="modify()">수정</el-button>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script setup>
import { advertiserManagementStore } from '@/store/modules/admin/advertiserManagementStore.js'
import { storeToRefs } from 'pinia'
import { ref, getCurrentInstance } from 'vue'
import { ElMessageBox } from 'element-plus'
import { validBusinessNumber } from '@/utils/validate.js'
import { getToken } from '@/utils/auth.js'

defineOptions({
  name: 'AdvertiserModifyModal'
})

const { appContext } = getCurrentInstance()

const validation = ref({
  valid: true,
  businessName: {
    check: true,
    message: ''
  },
  businessNumber: {
    check: true,
    message: ''
  },
  businessRegistrationFile: {
    check: true,
    message: ''
  }
})

const store = advertiserManagementStore()
const { uploadFiles, selected, modifyPopupByBusinessNumber } = storeToRefs(store)

const dialogImageUrl = ref(import.meta.env.VITE_ADMIN_API + '/admin/v1/upload/business/files')
const headers = ref({ Authorization: getToken() })

function validate(...types) {
  const { advertiserSeq, businessName, businessNumber, file } = selected.value

  validation.value.valid = true

  for (const type of types) {
    switch (type) {
      case 'businessName' :
        validation.value.businessName.check = true
        validation.value.businessName.message = ''

        if (businessName === null || businessName === '') {
          validation.value.businessName.check = false
          validation.value.businessName.message = '사업자명을 입력 하세요.'

          break
        }

        break

      case 'businessNumber' :

        validation.value.businessNumber.check = true
        validation.value.businessNumber.message = ''

        if (businessNumber === null || businessNumber === '') {
          validation.value.businessNumber.check = false
          validation.value.businessNumber.message = '사업자 번호를 입력 하세요.'
          validation.value.valid = false

          break
        }

        if (!validBusinessNumber(businessNumber)) {
          validation.value.businessNumber.check = false
          validation.value.businessNumber.message = '사업자번호 형식을 확인 해주세요.'
          validation.value.valid = false

          break
        }

        break

      case 'businessRegistrationFile' :

        validation.value.businessRegistrationFile.check = true
        validation.value.businessRegistrationFile.message = ''

        // console.log(file)
        if (!file) {
          validation.value.businessRegistrationFile.check = false
          validation.value.businessRegistrationFile.message = '사업자등록증을 추가 해주세요.'

          validation.value.valid = false

          break
        }

        break
    }
  }
}
const handleExceed = () => {
  store.handleExceed()
}
function handleBeforeUpload(rawFile) {
  return store.handleBeforeUpload(rawFile)
}

function handleSuccess(data, uploadFile) {
  const { result, type } = store.uploadSuccess(data, uploadFile)
  if (result.length > 0) {
    const { originFileName, newFileName, target } = result[0]
    this.selected.file = {
      newFile: true,
      fileType: type,
      originName: originFileName,
      fileName: [target, newFileName].join('/')
    }
  }
}

function handlePreview(uploadFile) {
  store.handlePreview(uploadFile)
}
function handleRemove() {
  selected.value.file = null
}

function modify() {
  validate('businessName', 'businessNumber', 'businessRegistrationFile')

  if (validation.value.valid) {
    store.modifyBusinessNumber()
  }
}

async function check(t) {
  const { alReadyCheck } = selected.value
  if (alReadyCheck) {
    return false
  }

  validate('businessNumber')

  if (validation.value.valid) {
    const retMsg = await store.businessNumberCheck('modify') ? '사용 가능한 사업자 번호 입니다.' : '이미 등록된 사업자번호 입니다.'
    await ElMessageBox.alert(retMsg, '확인', {}, appContext)
  }
}

</script>

<style scoped lang="scss">

</style>
