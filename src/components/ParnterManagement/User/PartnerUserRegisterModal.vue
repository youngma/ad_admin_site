<template>
  <el-dialog v-model="users.registerModal" title="사용자 등록" width="700">
    <div class="comm_comp">
      <div class="comm_comp_table">
        <el-row :gutter="10">
          <el-col :span="6" class="col_tit">
            <strong class="comm_tit_box">사용자 아이디</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            <el-row :gutter="10">
              <el-col
                :span="16"
                :class="{ 'is-error': !validation.userId.check }"
              >
                <el-input
                  v-model="users.register.userId"
                  class=""
                  :disabled="users.register.alReadyCheck"
                  placeholder="사용자 아이디를 입력 해주세요."
                />
              </el-col>
              <el-button
                type="info"
                tag="span"
                class="comm_form_btn ml_15"
                :disabled="users.register.alReadyCheck"
                @click.prevent="check()"
              >중복체크</el-button>
            </el-row>
            <div v-show="!validation.userId.check" class="invalid-feedback">
              {{validation.userId.message}}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6" class="col_tit">
            <strong class="comm_tit_box">비밀번호</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            <el-row :gutter="10">
              <el-col :span="16">
                <el-input
                  v-model="users.register.userPassword" type="password"
                  :class="{ 'is-error': !validation.userPassword.check }"
                  class="" placeholder="사용자 비밀번호를 입력 해주세요." />
              </el-col>
            </el-row>
            <div v-show="!validation.userPassword.check" class="invalid-feedback">
              {{validation.userPassword.message}}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6" class="col_tit">
            <strong class="comm_tit_box">관리자 이름</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            <el-row :gutter="10">
              <el-col :span="16">
                <el-input
                  v-model="users.register.userName"
                  :class="{ 'is-error': !validation.userName.check }"
                  class="" placeholder="사용자 이름를 입력 해주세요." />
              </el-col>
            </el-row>
            <div v-show="!validation.userName.check" class="invalid-feedback">
              {{validation.userName.message}}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6" class="col_tit">
            <strong class="comm_tit_box">전화 번호</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            <el-row :gutter="10">
              <el-col :span="16">
                <el-input
                  v-model="users.register.phoneNumber"
                  :class="{ 'is-error': !validation.phoneNumber.check }"
                  class="" placeholder="전화번호를 입력 해주세요." />
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
              <el-col :span="16">
                <el-input
                  v-model="users.register.email"
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
          <el-button type="success" class="comm_form_btn" @click="save()">등록</el-button>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script setup>
import { partnerStore } from '@/store/modules/admin/partnerStore.js'
import { storeToRefs } from 'pinia'
import { ref, getCurrentInstance } from 'vue'
import { ElMessageBox } from 'element-plus'
import { validEmail, validPhone } from '@/utils/validate.js'

defineOptions({
  name: 'PartnerUserRegisterModal'
})

const { appContext } = getCurrentInstance()

const validation = ref({
  valid: true,
  userId: {
    check: true,
    message: ''
  },
  userName: {
    check: true,
    message: ''
  },
  userPassword: {
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

const store = partnerStore()

const { users } = storeToRefs(store)

function validate(...types) {
  const { userId, userPassword, userName, phoneNumber, alReadyCheck, email } = users.value.register

  // console.log(userId, userPassword, userName, phoneNumber, alReadyCheck)
  validation.value.valid = true

  for (const type of types) {
    switch (type) {
      case 'alReadyCheck':
        if (!alReadyCheck) {
          validation.value.userId.check = false
          validation.value.userId.message = '아이디 중복 체크를 해주세요.'
          validation.value.valid = false

          break
        }
        break

      case 'userId' :
        validation.value.userId.check = true
        validation.value.userId.message = ''

        if (userId === null || userId === '') {
          validation.value.userId.check = false
          validation.value.userId.message = '관리자 아이디를 입력 하세요.'
          validation.value.valid = false

          break
        }

        break

      case 'userPassword' :

        validation.value.userPassword.check = true
        validation.value.userPassword.message = ''

        if (userPassword === null || userPassword === '') {
          validation.value.userPassword.check = false
          validation.value.userPassword.message = '관리자 비밀번호를 입력 하세요.'

          validation.value.valid = false

          break
        }

        break

      case 'userName' :

        validation.value.userName.check = true
        validation.value.userName.message = ''

        if (userName === null || userName === '') {
          validation.value.userName.check = false
          validation.value.userName.message = '관리자 이름를 입력 하세요.'

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
          users.value.register.phoneNumber = null
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
          validation.value.email.message = '이메일 형식을 확인 해주세요.'
          validation.value.valid = false

          break
        }

        break
    }
  }
}

async function check(t) {
  const { alReadyCheck } = users.value.register

  if (alReadyCheck) {
    return false
  }

  validate('userId')
  if (validation.value.valid) {
    const retMsg = await store.userIdCheck() ? '사용 가능한 아이디 입니다.' : '이미 등록된 아이디 입니다.'
    ElMessageBox.alert(retMsg, '확인', {}, appContext)
  }
}

function save() {
  validate('alReadyCheck', 'userName', 'userPassword', 'phoneNumber')
  if (validation.value.valid) {
    store.userRegister()
  }
}

</script>

<style scoped lang="scss">

</style>
