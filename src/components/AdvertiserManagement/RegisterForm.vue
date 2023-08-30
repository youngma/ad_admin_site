<template>
  <div class="comm_comp">
    <el-row>
      <el-col class="comm_form_box comm_text_tit">광고주 등록</el-col>
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
          <strong class="comm_tit_box">사업자번호</strong>
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
          <strong class="comm_tit_box">대표자 명</strong>
        </el-col>
        <el-col :span="16" class="col_desc">
          <el-row :gutter="10">
            <el-col :span="10">
              <el-input
                        v-model="register.advertiserName"
                        :class="{ 'is-error': !validation.advertiserName.check }"
                        class="" placeholder="대표자명 를 입력 해주세요." />
            </el-col>
          </el-row>
          <div v-show="!validation.advertiserName.check" class="invalid-feedback">
            {{validation.advertiserName.message}}
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
    </div>
    <el-row justify="end">
      <el-col class="t_r comm_form_box" tag="span">
        <el-button type="primary" class="comm_form_btn" @click="save()">등록</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { advertiserManagementStore } from '@/store/modules/admin/advertiserManagementStore.js'
import { storeToRefs } from 'pinia'
import { ref, getCurrentInstance } from 'vue'
import { ElMessageBox } from 'element-plus'
import { validEmail, validPhone, validBusinessNumber } from '@/utils/validate.js'

defineOptions({
  name: 'AdvertiserRegisterForm'
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
  }
})

const store = advertiserManagementStore()
const { register } = storeToRefs(store)

function validate(...types) {
  const { businessName, businessNumber, advertiserName, phoneNumber, email, alReadyCheck } = this.register

  console.log(businessName, businessNumber, advertiserName, phoneNumber, email, alReadyCheck)
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
          validation.value.businessName = false

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
          this.register.businessNumber = null
          validation.value.valid = false

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
    }
  }
}

function check(t) {
  const { alReadyCheck } = this.register
  if (alReadyCheck) {
    return false
  }

  this.validate('businessNumber')
  if (validation.value.valid) {
    const retMsg = this.store.businessNumberCheck() ? '사용 가능한 사업자번호 입니다.' : '이미 등록된 사업자번호 입니다.'
    ElMessageBox.alert(retMsg, '확인', {}, appContext)
  }
}

function save() {
  this.validate('alReadyCheck', 'businessName', 'businessNumber', 'advertiserName', 'phoneNumber', 'email')
  if (validation.value.valid) {
    this.store.advertiserRegister()
  }
}

</script>

<style scoped lang="scss">

</style>
