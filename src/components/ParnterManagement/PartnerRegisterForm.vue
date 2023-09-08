<template>
  <div class="comm_comp">
    <el-row>
      <el-col class="comm_form_box comm_text_tit">매체사 등록</el-col>
    </el-row>
    <div class="comm_comp_table">

      <el-row :gutter="10">
        <el-col :span="4" class="col_tit">
          <strong class="comm_tit_box">사업자 명</strong>
        </el-col>
        <el-col :span="16" class="col_desc">
          <el-row :gutter="10">
            <el-col :span="10">
              <el-input
                v-model="register.businessName"
                :class="{ 'is-error': !validation.businessName.check }"
                class="" placeholder="사업자명를 입력 해주세요." />
            </el-col>
          </el-row>
          <div v-show="!validation.businessName.check" class="invalid-feedback">
            {{validation.businessName.message}}
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="4" class="col_tit">
          <strong class="comm_tit_box">사업자 번호</strong>
        </el-col>
        <el-col :span="16" class="col_desc">
          <el-row :gutter="10">
            <el-col
              :span="10"
              :class="{ 'is-error': !validation.businessNumber.check }"
            >
              <el-input
                v-model="register.businessNumber"
                class=""
                :disabled="register.alReadyCheck"
                placeholder="사업자 번호를 입력해주세요."
              />
            </el-col>
            <el-button
              type="info"
              tag="span"
              class="comm_form_btn ml_15"
              :disabled="register.alReadyCheck"
              @click.prevent="check()"
            >중복 체크</el-button>
          </el-row>
          <div v-show="!validation.businessNumber.check" class="invalid-feedback">
            {{validation.businessNumber.message}}
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="4" class="col_tit">
          <strong class="comm_tit_box">전화 번호</strong>
        </el-col>
        <el-col :span="16" class="col_desc">
          <el-row :gutter="10">
            <el-col :span="10">
              <el-input
                v-model="register.phoneNumber"
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
        <el-col :span="4" class="col_tit">
          <strong class="comm_tit_box">이메일</strong>
        </el-col>
        <el-col :span="16" class="col_desc">
          <el-row :gutter="10">
            <el-col :span="10">
              <el-input
                v-model="register.email"
                :class="{ 'is-error': !validation.email.check }"
                class="" placeholder="이메일를 입력 해주세요." />
            </el-col>
          </el-row>
          <div v-show="!validation.email.check" class="invalid-feedback">
            {{validation.email.message}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="4" class="col_tit">
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
                :multiple=false
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
      <el-row :gutter="10">
        <el-col :span="4" class="col_tit">
          <strong class="comm_tit_box">세금 계산서 발행 이메일</strong>
        </el-col>
        <el-col :span="16" class="col_desc">
          <el-row :gutter="10">
            <el-col :span="10">
              <el-input
                v-model="register.taxBillEmail"
                :class="{ 'is-error': !validation.taxBillEmail.check }"
                class="" placeholder="이메일를 입력 해주세요." />
            </el-col>
          </el-row>
          <div v-show="!validation.taxBillEmail.check" class="invalid-feedback">
            {{validation.taxBillEmail.message}}
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row justify="end">
      <el-col class="t_r comm_form_box" tag="span">
        <el-button type="primary" class="comm_form_btn" @click="save()">등록</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { partnerManagementStore } from '@/store/modules/admin/partnerManagementStore.js'
import { storeToRefs } from 'pinia'
import { getCurrentInstance, ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import { validBusinessNumber, validEmail, validPhone } from '@/utils/validate.js'
import { getToken } from '@/utils/auth.js'

defineOptions({
  name: 'PartnerRegisterForm'
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

const store = partnerManagementStore()
const { uploadFiles, register } = storeToRefs(store)

const dialogImageUrl = ref(import.meta.env.VITE_ADMIN_API + '/admin/v1/upload/business/files')
const headers = ref({ Authorization: getToken() })

function validate(...types) {
  const { businessName, businessNumber, phoneNumber, email, taxBillEmail, alReadyCheck, file } = this.register

  console.log(businessName, businessNumber, phoneNumber, email, taxBillEmail, alReadyCheck, file)
  validation.value.valid = true

  for (const type of types) {
    switch (type) {
      case 'alReadyCheck':
        if (!alReadyCheck) {
          validation.value.businessNumber.check = false
          validation.value.businessNumber.message = '사업자번호 중복 체크를 해주세요.'
          validation.value.valid = false

          break
        }
        break

      case 'businessName' :
        validation.value.businessName.check = true
        validation.value.businessName.message = ''

        if (businessName === null || businessName === '') {
          validation.value.businessName.check = false
          validation.value.businessName.message = '사업자명을 입력 하세요.'
          validation.value.valid = false
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
          this.register.phoneNumber = null
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
          this.register.email = null
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
          this.register.taxBillEmail = null
          validation.value.valid = false

          break
        }

        break

      case 'businessRegistrationFile' :

        validation.value.businessRegistrationFile.check = true
        validation.value.businessRegistrationFile.message = ''

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
  this.store.handleExceed()
}
function handleBeforeUpload(rawFile) {
  return this.store.handleBeforeUpload(rawFile)
}

function handleSuccess(data, uploadFile) {
  const { result, type } = this.store.uploadSuccess(data, uploadFile)

  if (result.length > 0) {
    const { originFileName, newFileName, target } = result[0]
    register.value.file = {
      newFile: true,
      fileType: type,
      originName: originFileName,
      fileName: [target, newFileName].join('/')
    }
  }
}

function handlePreview(uploadFile) {
  console.log(111, uploadFile)
  this.store.handlePreview(uploadFile)
}
function handleRemove() {
  register.value.file = null
}

async function check(t) {
  const { alReadyCheck } = this.register
  if (alReadyCheck) {
    return false
  }

  this.validate('businessNumber')
  if (validation.value.valid) {
    const retMsg = await this.store.businessNumberCheck() ? '사용 가능한 사업자 번호 입니다.' : '이미 등록된 사업자번호 입니다.'
    await ElMessageBox.alert(retMsg, '확인', {}, appContext)
  }
}

function save() {
  this.validate('alReadyCheck', 'businessName', 'businessNumber', 'phoneNumber', 'email', 'taxBillEmail', 'businessRegistrationFile')
  if (validation.value.valid) {
    this.store.registerPartner()
  }
}

</script>

<style scoped lang="scss">

</style>
