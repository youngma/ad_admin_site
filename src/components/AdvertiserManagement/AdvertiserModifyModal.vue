<template>
  <el-dialog v-if="selected" v-model="modifyPopup" title="광고주 수정" width="800" >
    <div class="comm_comp">
      <div class="comm_comp_table">
        <el-row :gutter="10">
          <el-col :span="4" class="col_tit">
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
          <el-col :span="4" class="col_tit">
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
          <el-col :span="4" class="col_tit">
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
          <el-col :span="4" class="col_tit">
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
  }
})

const store = advertiserManagementStore()
const { selected, modifyPopup } = storeToRefs(store)

function validate(...types) {
  const { advertiserSeq, businessName, advertiserName, phoneNumber, email } = this.selected

  console.log(advertiserSeq, businessName, advertiserName, phoneNumber, email)
  validation.value.valid = true

  for (const type of types) {
    switch (type) {
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

function modify() {
  this.validate('businessName', 'advertiserName', 'phoneNumber', 'email')
  if (validation.value.valid) {
    this.store.modifyAdvertiser()
  }
}

</script>

<style scoped lang="scss">

</style>
