<template>
  <el-dialog v-model="modal" title="문의 사항 처리"  width="700" @close="close()">

    <div class="comm_comp">
      <div class="comm_comp_table">

        <el-row :gutter="10">
          <el-col :span="6" class="col_tit">
            <strong class="comm_tit_box">퀴즈 제목</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            {{selected.quizTitle}}
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="6" class="col_tit">
            <strong class="comm_tit_box">문의 시간</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            {{selected.requestAt}}
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="6" class="col_tit">
            <strong class="comm_tit_box">전화 번호</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            {{selected.phone}}
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="6" class="col_tit">
            <strong class="comm_tit_box">문의 내용</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
              <el-text>
                <template v-for="row of lineFormatter(selected.title)" >
                  {{ row }} <br/>
                </template>
              </el-text>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="6" class="col_tit">
            <strong class="comm_tit_box">답변</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            <el-row :gutter="10">
              <el-col :span="24">
                <el-input
                  v-model="selected.answer"
                  type="textarea"
                 :readonly="selected.answerAt"
                  :rows="4"
                  :class="{ 'is-error': !validation.answer.check }"
                  class="" placeholder="답변 입력 해주세요.`" />
              </el-col>
            </el-row>
            <div v-show="!validation.answer.check" class="invalid-feedback">
              {{validation.answer.message}}
            </div>
          </el-col>
        </el-row>

        <el-row v-if="selected.answerAt" :gutter="10" >
          <el-col :span="6" class="col_tit">
            <strong class="comm_tit_box">답변 시간</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            {{selected.answerAt}}
          </el-col>
        </el-row>

      </div>
      <el-row justify="end">
        <el-col class="t_r comm_form_box" tag="span">
          <el-button v-if="selected.status === 'Request'" type="success" class="comm_form_btn" @click="answer()">등록</el-button>
          <el-button v-else type="success" class="comm_form_btn" @click="close()">닫기</el-button>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script setup>
import { inquiryStore } from '@/store/modules/admin/inquiryStore.js'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { lineFormatter } from '@/utils/customElTableFormatter.js'

defineOptions({
  name: 'AdInquiryModal'
})

const validation = ref({
  valid: true,
  answer: {
    check: true,
    message: ''
  }
})

const store = inquiryStore()

const { modal, selected } = storeToRefs(store)

function close() {
  this.modal = false
}

function validate(...types) {
  validation.value.valid = true
  for (const type of types) {
    switch (type) {
      case 'message':

        validation.value.answer.check = true
        validation.value.answer.message = ''

        if (!selected.value.answer === null || selected.value.answer === '') {
          validation.value.answer.check = false
          validation.value.answer.message = '답변를 입력 해주세요'
          validation.value.valid = false

          break
        }
        break
    }
  }
}

function answer() {
  validate('message')
  if (validation.value.valid) {
    store.registerAnswer()
  }
}

</script>

<style scoped lang="scss">

</style>
