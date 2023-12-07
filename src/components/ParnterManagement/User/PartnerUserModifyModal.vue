<template>
  <el-dialog v-model="users.modifyModal" title="사용자 수정" width="700">
    <div class="comm_comp">
<!--      <el-row>-->
<!--        <el-col class="comm_form_box comm_text_tit">관리자 수정</el-col>-->
<!--      </el-row>-->
      <div class="comm_comp_table">
        <el-row :gutter="10">
          <el-col :span="4" class="col_tit">
            <strong class="comm_tit_box">사용자 이름</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            <el-row :gutter="10">
              <el-col :span="20">
                <div
                  hidden="hidden"
                >
                  <el-input
                    v-model="users.selectedUser.userId"
                  />
                  <el-input
                    v-model="users.selectedUser.userSeq"
                    disabled
                  />
                </div>
                <el-input
                          v-model="users.selectedUser.userName"
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
          <el-col :span="4" class="col_tit">
            <strong class="comm_tit_box">전화 번호</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            <el-row :gutter="10">
              <el-col :span="20">
                <el-input
                  v-model="users.selectedUser.phoneNumber"
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
          <el-button type="success" class="comm_form_btn" @click="save()">저장</el-button>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script setup>
import { partnerStore } from '@/store/modules/admin/partnerStore.js'
import { storeToRefs } from 'pinia'
import { ref, getCurrentInstance } from 'vue'

defineOptions({
  name: 'PartnerUserModifyModal'
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

const store = partnerStore()

const { users } = storeToRefs(store)

function validate(...types) {
  const { userSeq, userId, userName, phoneNumber } = users.value.selectedUser

  // console.log(userName, phoneNumber)
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

        break
    }
  }
}

function save() {
  validate('userName', 'phoneNumber')
  if (validation.value.valid) {
    store.userModify()
  }
}

</script>

<style scoped lang="scss">

</style>
