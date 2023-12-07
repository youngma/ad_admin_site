<template>
  <el-dialog v-if="selected" v-model="modifyPopup" title="광고주 수정" width="900" >
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
            <strong class="comm_tit_box">대표자 명</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            <el-row :gutter="10">
              <el-col :span="20">
                <el-input
                  v-model="selected.advertiserName"
                  :class="{ 'is-error': !validation.advertiserName.check }"
                  class="" placeholder="대표자 명 를 입력 해주세요." />
              </el-col>
            </el-row>
            <div v-show="!validation.advertiserName.check" class="invalid-feedback">
              {{validation.advertiserName.message}}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6" class="col_tit">
            <strong class="comm_tit_box">전화 번호</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            <el-row :gutter="10">
              <el-col :span="20">
                <el-input
                  v-model="selected.phoneNumber"
                  :class="{ 'is-error': !validation.phoneNumber.check }"
                  class="" placeholder="전화 번호를 입력 해주세요." />
              </el-col>
            </el-row>
            <div v-show="!validation.phoneNumber.check" class="invalid-feedback">
              {{validation.phoneNumber.message}}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6" class="col_tit">
            <strong class="comm_tit_box">이메일</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            <el-row :gutter="10">
              <el-col :span="20">
                <el-input
                  v-model="selected.email"
                  :class="{ 'is-error': !validation.email.check }"
                  class="" placeholder="이메일을 입력 해주세요." />
              </el-col>
            </el-row>
            <div v-show="!validation.email.check" class="invalid-feedback">
              {{validation.email.message}}
            </div>
          </el-col>
        </el-row>
<!--        <el-row :gutter="10">-->
<!--          <el-col :span="6" class="col_tit">-->
<!--            <strong class="comm_tit_box">사업자 등록증</strong>-->
<!--          </el-col>-->
<!--          <el-col :span="16" class="col_desc">-->
<!--            <el-row :gutter="10">-->
<!--              <el-col-->
<!--                :span="10"-->
<!--                :class="{ 'is-error': !validation.businessRegistrationFile.check }"-->
<!--              >-->
<!--                <el-upload-->
<!--                  v-model:file-list="uploadFiles"-->
<!--                  class="upload-demo"-->
<!--                  :action="dialogImageUrl"-->
<!--                  :headers="headers"-->
<!--                  :on-exceed="handleExceed"-->
<!--                  :before-upload="(raw) => handleBeforeUpload(raw)"-->
<!--                  :on-success="(data, uploadFile) => handleSuccess(data, uploadFile)"-->
<!--                  :on-remove="() => handleRemove()"-->
<!--                  :on-preview="(file) => handlePreview(file)"-->
<!--                  :multiple="false"-->
<!--                  :limit=1-->
<!--                >-->
<!--                  <el-button type="success">사업자 등록증 추가</el-button>-->
<!--                  <template #tip>-->
<!--                    <div class="el-upload__tip">-->
<!--                      2MB 이하의 PDF 파일만 등록 가능 합니다.-->
<!--                    </div>-->
<!--                  </template>-->
<!--                </el-upload>-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--            <div v-show="!validation.businessRegistrationFile.check" class="invalid-feedback">-->
<!--              {{validation.businessRegistrationFile.message}}-->
<!--            </div>-->
<!--          </el-col>-->
<!--        </el-row>-->
        <el-row :gutter="10">
          <el-col :span="6" class="col_tit">
            <strong class="comm_tit_box">세금 계산서 이메일</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            <el-row :gutter="10">
              <el-col :span="20">
                <el-input
                  v-model="selected.taxBillEmail"
                  :class="{ 'is-error': !validation.taxBillEmail.check }"
                  class="" placeholder="이메일를 입력 해주세요." />
              </el-col>
            </el-row>
            <div v-show="!validation.taxBillEmail.check" class="invalid-feedback">
              {{validation.taxBillEmail.message}}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6" class="col_tit">
            <strong class="comm_tit_box">광고 연동 코드</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            <el-row :gutter="10">
              <el-col :span="10">
                <el-input
                  v-model="selected.ifCode"
                  class="" placeholder="광고 연동 코드를 입력 해주세요." />
              </el-col>
            </el-row>
            <div v-show="true" class="invalid-feedback">
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
import { validBusinessNumber, validEmail, validPhone } from '@/utils/validate.js'
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
  advertiserName: {
    check: true,
    message: ''
  },
  phoneNumber: {
    check: true,
    message: ''
  },
  email: {
    check: true,
    message: ''
  },
  taxBillEmail: {
    check: true,
    message: ''
  },
  businessRegistrationFile: {
    check: true,
    message: ''
  }
})

const store = advertiserManagementStore()
const { uploadFiles, selected, modifyPopup } = storeToRefs(store)

const dialogImageUrl = ref(import.meta.env.VITE_ADMIN_API + '/admin/v1/upload/business/files')
const headers = ref({ Authorization: getToken() })

function validate(...types) {
  const { advertiserSeq, businessName, advertiserName, phoneNumber, email, taxBillEmail, file } = selected.value

  // console.log(advertiserSeq, businessName, advertiserName, phoneNumber, email, taxBillEmail, file)
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

      case 'userName' :

        validation.value.advertiserName.check = true
        validation.value.advertiserName.message = ''

        if (advertiserName === null || advertiserName === '') {
          validation.value.advertiserName.check = false
          validation.value.advertiserName.message = '대표자 명을 입력 하세요.'

          validation.value.valid = false

          break
        }

        break

      case 'phoneNumber' :

        validation.value.phoneNumber.check = true
        validation.value.phoneNumber.message = ''

        if (phoneNumber === null || phoneNumber === '') {
          validation.value.phoneNumber.check = false
          validation.value.phoneNumber.message = '전화번호를 입력 하세요.'

          validation.value.valid = false

          break
        }

        if (!validPhone(phoneNumber)) {
          validation.value.phoneNumber.check = false
          validation.value.phoneNumber.message = '전화번호 형식을 확인 해주세요.'
          selected.value.phoneNumber = null
          validation.value.valid = false

          break
        }

        break

      case 'email' :

        validation.value.email.check = true
        validation.value.email.message = ''

        if (email === null || email === '') {
          validation.value.email.check = false
          validation.value.email.message = '이메일를 입력 하세요.'

          validation.value.valid = false

          break
        }

        if (!validEmail(email)) {
          validation.value.email.check = false
          validation.value.email.message = '이메일형식을 확인 해주세요.'
          selected.value.email = null
          validation.value.valid = false

          break
        }

        break

      case 'taxBillEmail' :

        validation.value.taxBillEmail.check = true
        validation.value.taxBillEmail.message = ''

        if (email === null || email === '') {
          validation.value.taxBillEmail.check = false
          validation.value.taxBillEmail.message = '세금계산서 발행 이메일 주소를 입력 하세요.'

          validation.value.valid = false

          break
        }

        if (!validEmail(taxBillEmail)) {
          validation.value.taxBillEmail.check = false
          validation.value.taxBillEmail.message = '세금계산서 발행 이메일 주소를 확인 해주세요.'
          selected.value.taxBillEmail = null
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
  validate('businessName', 'advertiserName', 'phoneNumber', 'email', 'taxBillEmail', 'businessRegistrationFile')

  if (validation.value.valid) {
    store.modifyAdvertiser()
  }
}

</script>

<style scoped lang="scss">

</style>
