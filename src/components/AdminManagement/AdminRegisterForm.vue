<template>
  <div class="comm_comp">
    <el-row>
      <el-col class="comm_form_box comm_text_tit">관리자 등록</el-col>
    </el-row>
    <div class="comm_comp_table">
      <el-row :gutter="10">
        <el-col :span="4" class="col_tit">
          <strong class="comm_tit_box">관리자 아이디</strong>
        </el-col>
        <el-col :span="16" class="col_desc">
          <el-row :gutter="10">
            <el-col
              :span="10"
              :class="{ 'is-error': !validation.userId.check }"
            >
              <el-input
                v-model="register.userId"
                class=""
                :disabled="register.alReadyCheck"
                placeholder="관리자 아이디를 입력 해주세요."
              />
            </el-col>
            <el-button
              type="info"
              tag="span"
              class="comm_form_btn ml_15"
              :disabled="register.alReadyCheck"
              @click.prevent="check()"
            >중복체크</el-button>
          </el-row>
          <div v-show="!validation.userId.check" class="invalid-feedback">
            {{validation.userId.message}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="4" class="col_tit">
          <strong class="comm_tit_box">비밀번호</strong>
        </el-col>
        <el-col :span="16" class="col_desc">
          <el-row :gutter="10">
            <el-col :span="10">
              <form>
              <el-input
v-model="register.userPassword" type="password"
                        :class="{ 'is-error': !validation.userPassword.check }"
                        class="" placeholder="관리자 비밀번호를 입력 해주세요." />
              </form>
            </el-col>
          </el-row>
          <div v-show="!validation.userPassword.check" class="invalid-feedback">
            {{validation.userPassword.message}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="4" class="col_tit">
          <strong class="comm_tit_box">관리자 이름</strong>
        </el-col>
        <el-col :span="16" class="col_desc">
          <el-row :gutter="10">
            <el-col :span="10">
              <el-input
                        v-model="register.userName"
                        :class="{ 'is-error': !validation.userName.check }"
                        class="" placeholder="관리자 이름를 입력 해주세요." />
            </el-col>
          </el-row>
          <div v-show="!validation.userName.check" class="invalid-feedback">
            {{validation.userName.message}}
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
                :formatter="(value) => phoneFormatter(value)"
                :class="{ 'is-error': !validation.phoneNumber.check }"
                class="" placeholder="전화번호를 입력 해주세요." />
            </el-col>
          </el-row>
          <div v-show="!validation.phoneNumber.check" class="invalid-feedback">
            {{validation.phoneNumber.message}}
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
import { adminManagementStore } from '@/store/modules/admin/adminManagementStore.js'
import { storeToRefs } from 'pinia'
import { ref, getCurrentInstance } from 'vue'
import { ElMessageBox } from 'element-plus'
import { validPhone, validAlphabetsNumber, validSpace, replaceWhiteSpace } from '@/utils/validate.js'
import { phoneFormatter } from '@/utils/customElTableFormatter.js'

defineOptions({
  name: 'AdminRegisterForm'
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
  }
})

const store = adminManagementStore()
const { register } = storeToRefs(store)

function validate(...types) {
  const { userId, userPassword, userName, phoneNumber, alReadyCheck } = register.value

  console.log(userId, userPassword, userName, phoneNumber, alReadyCheck)
  validation.value.valid = true

  for (const type of types) {
    switch (type) {
      case 'userId' :
        validation.value.userId.check = true
        validation.value.userId.message = ''

        if (userId === null || userId === '') {
          validation.value.userId.check = false
          validation.value.userId.message = '관리자 아이디를 입력 하세요.'
          validation.value.valid = false

          break
        }

        if (!validAlphabetsNumber(userId)) {
          validation.value.userId.check = false
          validation.value.userId.message = '관리자 아이디는 영문/숫자만 가능합니다.'
          validation.value.valid = false

          break
        }

        if (validSpace(userId)) {
          validation.value.userId.check = false
          validation.value.userId.message = '공백을 제거 해주세요.'
          validation.value.valid = false
          register.value.userId = replaceWhiteSpace(userId)
          break
        }

        break

      case 'alReadyCheck':
        if (!alReadyCheck) {
          validation.value.userId.check = false
          validation.value.userId.message = '아이디 중복 체크를 해주세요.'
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

        if (validSpace(userPassword)) {
          validation.value.userPassword.check = false
          validation.value.userPassword.message = '공백을 제거 해주세요.'
          validation.value.valid = false
          register.value.userPassword = replaceWhiteSpace(userPassword)
          break
        }

        if (userPassword.length < 8) {
          validation.value.userPassword.check = false
          validation.value.userPassword.message = '비밀번호는 8자리 이상 입력하세요.'

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

        if (validSpace(userName)) {
          validation.value.userName.check = false
          validation.value.userName.message = '공백을 제거 해주세요.'
          validation.value.valid = false
          register.value.userName = replaceWhiteSpace(userName)
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
          validation.value.valid = false

          break
        }

        break
    }
  }
}

async function check(t) {
  const { alReadyCheck } = register.value
  if (alReadyCheck) {
    return false
  } else {
    validate('userId')
    if (validation.value.valid) {
      const retMsg = await store.userIdCheck() ? '사용 가능한 아이디 입니다.' : '이미 등록된 아이디 입니다.'
      await ElMessageBox.alert(retMsg, '확인', {}, appContext)
    }
  }
}

function save() {
  validate('userName', 'alReadyCheck', 'userPassword', 'phoneNumber')
  if (validation.value.valid) {
    store.adminRegister()
  }
}

</script>

<style scoped lang="scss">

</style>
