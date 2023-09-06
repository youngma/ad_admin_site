<template>
  <el-dialog v-model="accounts.registerModal" title="계좌 등록" width="700">
    <div class="comm_comp">
      <div class="comm_comp_table">
        <el-row :gutter="10">
          <el-col :span="6" class="col_tit">
            <strong class="comm_tit_box">은행</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            <el-row :gutter="10">
              <el-select
                         v-model="accounts.register.bankCode"
                         class="m-2"
                         :class="{ 'is-error': !validation.bankCode.check }"
                         :disabled="accounts.register.alReadyCheck"
                         placeholder="Select" size="large">
                <el-option key="" label="전체" value=""/>
                <el-option
                  v-for="code of Bank"
                  :key="code.key"
                  :label="code.value"
                  :value="code.key"
                />
              </el-select>

            </el-row>
            <div v-show="!validation.bankCode.check" class="invalid-feedback">
              {{validation.bankCode.message}}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6" class="col_tit">
            <strong class="comm_tit_box">계좌 번호</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            <el-row :gutter="10">
              <el-col :span="16">
                <el-input
                  v-model="accounts.register.bankAccount"
                  :disabled="accounts.register.alReadyCheck"
                  :class="{ 'is-error': !validation.bankAccount.check }"
                  class="" placeholder="계좌 번호를 입력 해주세요." />
              </el-col>
              <el-button
                type="info"
                tag="span"
                class="comm_form_btn ml_15"
                :disabled="accounts.register.alReadyCheck"
                @click.prevent="check()"
              >중복 체크</el-button>
            </el-row>
            <div v-show="!validation.bankAccount.check" class="invalid-feedback">
              {{validation.bankAccount.message}}
            </div>
            <div v-show="!validation.alReadyCheck.check" class="invalid-feedback">
              {{validation.alReadyCheck.message}}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6" class="col_tit">
            <strong class="comm_tit_box">예금주</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            <el-row :gutter="10">
              <el-col :span="16">
                <el-input
                  v-model="accounts.register.accountHolder"
                  :class="{ 'is-error': !validation.accountHolder.check }"
                  class="" placeholder="예금주 이름를 입력 해주세요." />
              </el-col>
            </el-row>
            <div v-show="!validation.accountHolder.check" class="invalid-feedback">
              {{validation.accountHolder.message}}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6" class="col_tit">
            <strong class="comm_tit_box">통장 사본</strong>
          </el-col>
          <el-col :span="16" class="col_desc">
            <el-row :gutter="10">
              <el-col
                :span="10"
                :class="{ 'is-error': !validation.accountFile.check }"
              >
                <el-upload
                  v-model:file-list="accounts.uploadFiles"
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
                  <el-button type="success">통장 사본</el-button>
                  <template #tip>
                    <div class="el-upload__tip">
                      2MB 이하의 PDF / PNG / JPEG 파일만 등록 가능 합니다.
                    </div>
                  </template>
                </el-upload>
              </el-col>
            </el-row>
            <div v-show="!validation.accountFile.check" class="invalid-feedback">
              {{validation.accountFile.message}}
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
import { advertiserStore } from '@/store/modules/admin/advertiserStore.js'
import { commonStore } from '@/store/modules/admin/commonStore.js'
import { storeToRefs } from 'pinia'
import { ref, getCurrentInstance } from 'vue'
import { ElMessageBox } from 'element-plus'
import { getToken } from '@/utils/auth.js'

defineOptions({
  name: 'AdvertiserUserRegisterForm'
})

const { appContext } = getCurrentInstance()

const validation = ref({
  valid: true,
  bankCode: {
    check: true,
    message: ''
  },
  bankAccount: {
    check: true,
    message: ''
  },
  accountHolder: {
    check: true,
    message: ''
  },
  alReadyCheck: {
    check: true,
    message: ''
  },
  accountFile: {
    check: true,
    message: ''
  }
})

const store = advertiserStore()
const common = commonStore()

const { accounts } = storeToRefs(store)
const { Bank } = storeToRefs(common)

const dialogImageUrl = ref(import.meta.env.VITE_ADMIN_API + '/admin/v1/upload/account/files')
const headers = ref({ Authorization: getToken() })

function validate(...types) {
  const { bankCode, bankAccount, accountHolder, alReadyCheck, file } = this.accounts.register
  validation.value.valid = true

  for (const type of types) {
    switch (type) {
      case 'alReadyCheck':

        validation.value.alReadyCheck.check = true
        validation.value.alReadyCheck.message = ''

        if (!alReadyCheck) {
          validation.value.alReadyCheck.check = false
          validation.value.alReadyCheck.message = '계좌 번호 중복 체크를 해주세요.'
          validation.value.valid = false

          break
        }
        break

      case 'bankCode' :
        validation.value.bankCode.check = true
        validation.value.bankCode.message = ''

        if (validation.value.alReadyCheck.check) {
          if (bankCode === '') {
            validation.value.bankCode.check = false
            validation.value.bankCode.message = '은행을 선택 하세요.'
            validation.value.valid = false
            break
          }
        }

        break

      case 'bankAccount' :

        validation.value.bankAccount.check = true
        validation.value.bankAccount.message = ''

        if (validation.value.alReadyCheck.check) {
          if (bankAccount === null || bankAccount === '') {
            validation.value.bankAccount.check = false
            validation.value.bankAccount.message = '계좌 번호를 입력 하세요.'

            validation.value.valid = false

            break
          }
        }

        break

      case 'accountHolder' :

        validation.value.accountHolder.check = true
        validation.value.accountHolder.message = ''

        if (accountHolder === null || accountHolder === '') {
          validation.value.accountHolder.check = false
          validation.value.accountHolder.message = '예금주 명을 입력 하세요.'

          validation.value.valid = false

          break
        }
        break

      case 'accountFile' :

        validation.value.accountFile.check = true
        validation.value.accountFile.message = ''

        if (!file) {
          validation.value.accountFile.check = false
          validation.value.accountFile.message = '사업자등록증을 추가 해주세요.'

          validation.value.valid = false

          break
        }

        break
    }

    console.log(validation)
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
    accounts.value.register.file = {
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
  accounts.value.file = null
}
async function check() {
  const { alReadyCheck } = this.accounts.register

  if (alReadyCheck) {
    return false
  }

  this.validate('bankCode', 'bankAccount')

  if (validation.value.valid) {
    const check = await this.store.accountCheck()

    const retMsg = check ? '사용 가능한 계좌 입니다.' : '이미 등록된 계좌 입니다.'

    if (check) {
      validation.value.alReadyCheck.check = true
      validation.value.alReadyCheck.message = ''
    }
    await ElMessageBox.alert(retMsg, '확인', {}, appContext)
  }
}

function save() {
  this.validate('alReadyCheck', 'bankCode', 'bankAccount', 'accountHolder')
  if (validation.value.valid) {
    this.store.accountRegister()
  }
}

</script>

<style scoped lang="scss">

</style>
