<template>
  <el-dialog v-model="modifyPopup" title="관리자 수정" width="700">
    <div class="comm_comp">
<!--      <el-row>-->
<!--        <el-col class="comm_form_box comm_text_tit">관리자 수정</el-col>-->
<!--      </el-row>-->
      <div class="comm_comp_table">
        <el-row :gutter="10">
          <el-col :span="4" class="col_tit">
            <strong class="comm_tit_box">관리자 이름</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            <el-row :gutter="10">
              <el-col :span="20">
                <div
                  hidden="hidden"
                >
                  <el-input
                    v-model="selectedUser.userId"
                  />
                  <el-input
                    v-model="selectedUser.userSeq"
                    disabled
                  />
                </div>
                <el-input
                          v-model="selectedUser.userName"
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
              <el-col :span="20">
                <el-input
                  v-model="selectedUser.phoneNumber"
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
          <el-button type="primary" class="comm_form_btn" @click="modify()">수정</el-button>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script setup>
import { adminManagementStore } from '@/store/modules/admin/adminManagementStore.js'
import { storeToRefs } from 'pinia'
import { ref, getCurrentInstance } from 'vue'
import { ElMessageBox } from 'element-plus'
import { replaceWhiteSpace, validPhone, validSpace } from '@/utils/validate.js'
import { phoneFormatter } from '@/utils/customElTableFormatter.js'

defineOptions({
  name: 'AdminModifyModal'
})

const { appContext } = getCurrentInstance()

const validation = ref({
  valid: true,
  userName: {
    check: true,
    message: ''
  },
  phoneNumber: {
    check: true,
    message: ''
  }
})

const store = adminManagementStore()
const { selectedUser, modifyPopup } = storeToRefs(store)

function validate(...types) {
  const { userSeq, userId, userName, phoneNumber } = this.selectedUser

  console.log(userName, phoneNumber)
  validation.value.valid = true

  for (const type of types) {
    switch (type) {
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
          this.selectedUser.userName = replaceWhiteSpace(userName)
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

  console.log(validation.value)
}

function modify() {
  this.validate('userName', 'phoneNumber')
  if (validation.value.valid) {
    this.store.adminModify()
  }
}

</script>

<style scoped lang="scss">

</style>
