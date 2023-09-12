<template>
  <el-dialog v-model="adGroups.statusModal" :title="status === 'reject' ? '승인 거절' : '승인 보류'"  width="700" @close="close()">

    <div class="comm_comp">
      <div class="comm_comp_table">
        <el-row :gutter="10">
          <el-col :span="6" class="col_tit">
            <strong class="comm_tit_box">사유</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            <el-row :gutter="10">
              <el-col :span="24">
                <el-input
                  v-model="message"
                  type="textarea"
                  :rows="4"
                  :class="{ 'is-error': !validation.message.check }"
                  class="" placeholder="변경 사유를 입력 해주세요.`" />
              </el-col>
            </el-row>
            <div v-show="!validation.message.check" class="invalid-feedback">
              {{validation.message.message}}
            </div>
          </el-col>
        </el-row>
      </div>
      <el-row justify="end">
        <el-col class="t_r comm_form_box" tag="span">
          <el-button type="success" class="comm_form_btn" @click="modify()">변경</el-button>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script setup>
import { partnerStore } from '@/store/modules/admin/partnerStore.js'
import { storeToRefs } from 'pinia'
import { ref, getCurrentInstance, defineProps } from 'vue'

defineOptions({
  name: 'PartnerAdGroupStatusModal'
})

const { groupSeq, status } = defineProps({
  status: {
    type: String,
    default: '',
    required: true
  },
  groupSeq: {
    type: Number,
    required: true
  }
})

const { appContext } = getCurrentInstance()

const validation = ref({
  valid: true,
  message: {
    check: true,
    message: ''
  }
})

const store = partnerStore()

const { adGroups } = storeToRefs(store)

const message = ref('')
function validate(...types) {
  validation.value.valid = true

  for (const type of types) {
    switch (type) {
      case 'message':

        validation.value.message.check = true
        validation.value.message.message = ''

        if (!this.message === null || this.message === '') {
          validation.value.message.check = false
          validation.value.message.message = '변경 사유를 입력 해주세요'
          validation.value.valid = false

          break
        }
        break
    }

    console.log(validation)
  }
}

function modify() {
  this.validate('message')
  if (validation.value.valid) {
    if (status === 'reject') {
      this.store.adGroupReject(groupSeq, this.message)
    }

    if (status === 'hold') {
      this.store.adGroupHold(groupSeq, this.message)
    }
  }
}

function close() {
  this.message = ''
  this.validation.message.check = true
  this.validation.message.message = ''
}

</script>

<style scoped lang="scss">

</style>
