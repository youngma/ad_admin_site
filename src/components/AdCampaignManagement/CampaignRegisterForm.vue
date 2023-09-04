<template>
  <div class="comm_comp">
    <el-row>
      <el-col class="comm_form_box comm_text_tit">캠페인 등록</el-col>
    </el-row>
    <div class="comm_comp_table">
      <el-row :gutter="10">
        <el-col :span="4" class="col_tit">
          <strong class="comm_tit_box">캠페인 타입</strong>
        </el-col>
        <el-col :span="16" class="col_desc">
          <el-row :gutter="10">
            <el-col :span="10">
              <el-select
                v-model="register.campaignType"
                class="m-2"
                :class="{ 'is-error': !validation.campaignType.check }"
                placeholder="Select" size="large">
                <el-option key="" label="선택" value=""/>
                <el-option
                  v-for="code of CampaignType"
                  :key="code.key"
                  :label="code.value"
                  :value="code.key"
                />
              </el-select>
            </el-col>
          </el-row>
          <div v-show="!validation.campaignType.check" class="invalid-feedback">
            {{validation.campaignType.message}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="4" class="col_tit">
          <strong class="comm_tit_box">캠페인 명</strong>
        </el-col>
        <el-col :span="16" class="col_desc">
          <el-row :gutter="10">
            <el-col
              :span="20"
              :class="{ 'is-error': !validation.campaignName.check }"
            >
              <el-input
                v-model="register.campaignName"
                class=""
                placeholder="캠페인 명을 입력 해주세요."
              />
            </el-col>
          </el-row>
          <div v-show="!validation.campaignName.check" class="invalid-feedback">
            {{validation.campaignName.message}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="4" class="col_tit">
          <strong class="comm_tit_box">캠페인 설명</strong>
        </el-col>
        <el-col :span="16" class="col_desc">
          <el-row :gutter="10">
            <el-col
              :span="20"
              :class="{ 'is-error': !validation.campaignDesc.check }"
            >
              <el-input
                v-model="register.campaignDesc"
                type="textarea"
                :rows="4"
                :autosize="{ minRows: 4, maxRows: 5 }"
                class=""
                placeholder="캠페인 설명을 입력 해주세요."
              />
            </el-col>
          </el-row>
          <div v-show="!validation.campaignDesc.check" class="invalid-feedback">
            {{validation.campaignDesc.message}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="4" class="col_tit">
          <strong class="comm_tit_box">참여 방법</strong>
        </el-col>
        <el-col :span="16" class="col_desc">
          <el-row :gutter="10">
            <el-col
              :span="20"
              :class="{ 'is-error': !validation.useHow.check }"
            >
              <el-input
                v-model="register.useHow"
                type="textarea"
                :rows="4"
                :autosize="{ minRows: 4, maxRows: 5 }"
                class=""
                placeholder="참여 방법을 입력 해주세요."
              />
            </el-col>

          </el-row>
          <div v-show="!validation.useHow.check" class="invalid-feedback">
            {{validation.useHow.message}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="4" class="col_tit">
          <strong class="comm_tit_box">랜딩 URL</strong>
        </el-col>
        <el-col :span="16" class="col_desc">
          <el-row :gutter="10">
            <el-col
              :span="20"
              :class="{ 'is-error': !validation.targetUrl.check }"
            >
              <el-input
                v-model="register.targetUrl"
                class=""
                placeholder="랜딩 URL을 입력 해주세요."
              />
            </el-col>

          </el-row>
          <div v-show="!validation.targetUrl.check" class="invalid-feedback">
            {{validation.targetUrl.message}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="4" class="col_tit">
          <strong class="comm_tit_box">캠페인 이미지</strong>
        </el-col>
        <el-col :span="16" class="col_desc">
          <el-row
              :gutter="10"
              :class="{ 'is-error': !validation.targetUrl.check }"
          >
            <CampaignImageUpload
              @upload-after="onUploadAfter"
            />

          </el-row>
          <div v-show="!validation.image.check" class="invalid-feedback">
            {{validation.image.message}}
          </div>
        </el-col>
      </el-row>

      <!--      캠페인 정보 - 타입, 단가(자동입력), 총 예산, 일 참여 제한 수량, 광고 시작일, 광고 종료일-->

      <el-row :gutter="10">
        <el-col :span="4" class="col_tit">
          <strong class="comm_tit_box">총 예산</strong>
        </el-col>
        <el-col :span="8" class="col_desc text-end">
          <el-row :gutter="10">
            <el-col :span="20">
              <el-input
                v-model="register.totalBudget"
                :formatter="(value) => moneyFormatter(value)"
                :class="{ 'is-error': !validation.totalBudget.check }"
                class="text-end" placeholder="총 예산 금액 입력 해주세요." >
                <template #append>원</template>
              </el-input>
            </el-col>
          </el-row>
          <div v-show="!validation.totalBudget.check" class="invalid-feedback">
            {{validation.totalBudget.message}}
          </div>
        </el-col>
        <el-col :span="4" class="col_tit">
          <strong class="comm_tit_box">일 참여 제한 수량</strong>
        </el-col>
        <el-col :span="8" class="col_desc">
          <el-row :gutter="10">
            <el-col :span="20">
              <el-input
                        v-model="register.dayParticipationLimit"
                        :formatter="(value) => numberFormatter(value)"
                        :class="{ 'is-error': !validation.dayParticipationLimit.check }"
                        class="text-end" placeholder="일 참여 제한 수 입력 해주세요."  >
                        <template #append>건</template>
              </el-input>
            </el-col>
          </el-row>
          <div v-show="!validation.dayParticipationLimit.check" class="invalid-feedback">
            {{validation.dayParticipationLimit.message}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="4" class="col_tit">
          <strong class="comm_tit_box">광고 단가</strong>
        </el-col>
        <el-col :span="8" class="col_desc">
          <el-row :gutter="10">
            <el-col :span="20">
              <el-input
                v-model="register.adPrice"
                :formatter="(value) => moneyFormatter(value)"
                :class="{ 'is-error': !validation.adPrice.check }"
                class="text-end" placeholder="광고 단가를 입력 해주세요." >
                <template #append>원</template>
              </el-input>
            </el-col>
          </el-row>
          <div v-show="!validation.adPrice.check" class="invalid-feedback">
            {{validation.adPrice.message}}
          </div>
        </el-col>
        <el-col :span="4" class="col_tit">
        </el-col>
        <el-col :span="8" class="col_desc">
          <el-row :gutter="10">
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="4" class="col_tit">
          <strong class="comm_tit_box">광고 기간</strong>
        </el-col>
        <el-col :span="8" class="col_desc">
          <el-row :gutter="10">
            <el-col
:span="20"
                    :class="{ 'is-error': !validation.adPrice.check }"
            >
              <el-date-picker
                v-model="register.adDate"
                type="daterange"
                size="large"
                start-placeholder="광고 시작 일자"
                end-placeholder="광고 종료 일자"
                :disabled-date="disabledDate"
                :default-time="defaultAdDate"
              />
            </el-col>
          </el-row>
          <div v-show="!validation.adDate.check" class="invalid-feedback">
            {{validation.adDate.message}}
          </div>
        </el-col>
        <el-col :span="4" class="col_tit">
          <strong class="comm_tit_box"></strong>
        </el-col>
        <el-col :span="8" class="col_desc">
        </el-col>
      </el-row>

      <!--      캠페인 상세 2 - 상품코드 (상단 검색에 노출되는 코드), 지급 조건 설정 (시간 / 스크롤 이동), 시간 선택-->

      <el-row :gutter="10">
        <el-col :span="4" class="col_tit">
          <strong class="comm_tit_box">상품 코드</strong>
        </el-col>
        <el-col :span="8" class="col_desc">
          <el-row :gutter="10">
            <el-col :span="20">
              <el-input
                v-model="register.goodsCode"
                :class="{ 'is-error': !validation.goodsCode.check }"
                class="" placeholder="상품 코드를 입력 해주세요." />
            </el-col>
          </el-row>
          <div v-show="!validation.goodsCode.check" class="invalid-feedback">
            {{validation.goodsCode.message}}
          </div>
        </el-col>

        <el-col :span="4" class="col_tit">
          <strong class="comm_tit_box">지급 조건</strong>
        </el-col>
        <el-col :span="8" class="col_desc">
          <el-row :gutter="10">
            <el-col :span="10">
              <el-select
                v-model="register.paymentTerms"
                class="m-2"
                :class="{ 'is-error': !validation.paymentTerms.check }"
                placeholder="Select"
                size="large" @change="paymentTermsChange">
                  <el-option
                    v-for="code of PaymentTerms"
                    :key="code.key"
                    :label="code.value"
                    :value="code.key"
                  />
              </el-select>
            </el-col>
            <el-col v-if="register.paymentTerms === 'TIME'" :span="10">
              <el-input
                v-model="register.holdingTime"
                :formatter="(value) => numberFormatter(value)"
                :class="{ 'is-error': !validation.paymentTerms.check }"
                class="text-end" placeholder="시간을 설정 해주세요." >
                <template #append>초</template>
              </el-input>
            </el-col>
          </el-row>
          <div v-show="!validation.paymentTerms.check" class="invalid-feedback">
            {{validation.paymentTerms.message}}
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
</template>

<script setup>
import CampaignImageUpload from '@/components/AdCampaignManagement/CampaignImageUpload.vue'

import { campaignStore } from '@/store/modules/admin/campaignStore.js'
import { commonStore } from '@/store/modules/admin/commonStore.js'

import { storeToRefs } from 'pinia'
import { ref, getCurrentInstance, watch } from 'vue'
import { numberFormatter, moneyFormatter } from '@/utils/customElTableFormatter.js'
import { validURL } from '@/utils/validate.js'

defineOptions({
  name: 'CampaignRegisterForm'
})

const { appContext } = getCurrentInstance()

const validation = ref({
  valid: true,
  campaignName: {
    check: true,
    message: ''
  },
  campaignDesc: {
    check: true,
    message: ''
  },
  useHow: {
    check: true,
    message: ''
  },
  targetUrl: {
    check: true,
    message: ''
  },
  campaignType: {
    check: true,
    message: ''
  },
  totalBudget: {
    check: true,
    message: ''
  },
  adPrice: {
    check: true,
    message: ''
  },
  image: {
    check: true,
    message: ''
  },
  dayParticipationLimit: {
    check: true,
    message: ''
  },
  adDate: {
    check: true,
    message: ''
  },
  goodsCode: {
    check: true,
    message: ''
  },
  paymentTerms: {
    check: true,
    message: ''
  },
  holdingTime: {
    check: true,
    message: ''
  }
})

const store = campaignStore()
const common = commonStore()
const { register, defaultAdDate } = storeToRefs(store)
const { CampaignType, PaymentTerms } = storeToRefs(common)

const disabledDate = (time) => {
  return time.getTime() < Date.now()
}

function validate(...types) {
  const { campaignName, campaignType, campaignDesc, useHow, image, targetUrl, totalBudget, dayParticipationLimit, adPrice, adDate, goodsCode, paymentTerms, holdingTime } = this.register

  validation.value.valid = true

  for (const type of types) {
    switch (type) {
      case 'campaignType' :

        validation.value.campaignType.check = true
        validation.value.campaignType.message = ''

        if (campaignType === null || campaignType === '') {
          validation.value.campaignType.check = false
          validation.value.campaignType.message = '캠페인 타입 을 선택 하세요.'

          validation.value.valid = false

          break
        }

        break

      case 'campaignName' :

        validation.value.campaignName.check = true
        validation.value.campaignName.message = ''

        if (campaignName === null || campaignName === '') {
          validation.value.campaignName.check = false
          validation.value.campaignName.message = '캠페인 명 을 입력 하세요.'

          validation.value.valid = false

          break
        }

        break

      case 'campaignDesc' :

        validation.value.campaignDesc.check = true
        validation.value.campaignDesc.message = ''

        if (campaignDesc === null || campaignDesc === '') {
          validation.value.campaignDesc.check = false
          validation.value.campaignDesc.message = '캠페인 설명 을 입력 하세요.'

          validation.value.valid = false

          break
        }

        break

      case 'useHow' :

        validation.value.useHow.check = true
        validation.value.useHow.message = ''

        if (useHow === null || useHow === '') {
          validation.value.useHow.check = false
          validation.value.useHow.message = '참여 방법 을 입력 하세요.'

          validation.value.valid = false

          break
        }

        break
      case 'image' :

        validation.value.image.check = true
        validation.value.image.message = ''

        if (image === null || image === '') {
          validation.value.image.check = false
          validation.value.image.message = '이미지 를 등록 하세요.'

          validation.value.valid = false

          break
        }

        break

      case 'targetUrl' :

        validation.value.targetUrl.check = true
        validation.value.targetUrl.message = ''

        if (targetUrl === null || targetUrl === '') {
          validation.value.targetUrl.check = false
          validation.value.targetUrl.message = '타켓 URL 을 입력 하세요.'

          validation.value.valid = false

          break
        }

        // var regex = new RegExp('^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?')
        // var without_regex = new RegExp('^([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?')

        if (!validURL(targetUrl)) {
          validation.value.targetUrl.check = false
          validation.value.targetUrl.message = 'URL 형색을 확인 해주세요..'

          validation.value.valid = false
          break
        }

        break

      case 'totalBudget' :

        validation.value.totalBudget.check = true
        validation.value.totalBudget.message = ''

        if (totalBudget <= 0) {
          validation.value.totalBudget.check = false
          validation.value.totalBudget.message = '총 예산 금액은 0원 이상 만 가능 입니다.'

          validation.value.valid = false

          break
        }

        break

      case 'dayParticipationLimit' :

        validation.value.dayParticipationLimit.check = true
        validation.value.dayParticipationLimit.message = ''

        if (dayParticipationLimit <= 0) {
          validation.value.dayParticipationLimit.check = false
          validation.value.dayParticipationLimit.message = '일 참여 제한 수량 을 1건 이상 만 가능 합니다.'

          validation.value.valid = false

          break
        }

        break

      case 'adPrice' :

        validation.value.adPrice.check = true
        validation.value.adPrice.message = ''

        if (adPrice <= 0) {
          validation.value.adPrice.check = false
          validation.value.adPrice.message = '광고 단가는 0원 이상 만 가능 합니다.'

          validation.value.valid = false

          break
        }

        break

      case 'adDate' :

        validation.value.adDate.check = true
        validation.value.adDate.message = ''

        console.log(adDate)
        if (adDate.size === 0) {
          validation.value.adDate.check = false
          validation.value.adDate.message = '광고 기간을 설정 해주세요.'

          validation.value.valid = false

          break
        }

        break

      case 'goodsCode' :

        validation.value.goodsCode.check = true
        validation.value.goodsCode.message = ''

        if (goodsCode === '' || goodsCode === null) {
          validation.value.goodsCode.check = false
          validation.value.goodsCode.message = '상품 코드를 입력 해주세요.'

          validation.value.valid = false

          break
        }

        break

      case 'paymentTerms' :

        validation.value.paymentTerms.check = true
        validation.value.paymentTerms.message = ''

        if (paymentTerms === '' || paymentTerms === null) {
          validation.value.paymentTerms.check = false
          validation.value.paymentTerms.message = '지급 조건을 설정 해주세요.'
          validation.value.valid = false
          break
        }

        if (validation.value.paymentTerms.check) {
          if (holdingTime <= 0) {
            validation.value.paymentTerms.check = false
            validation.value.paymentTerms.message = '호딩 타임을 1초 이상 설정 해주세요.'

            validation.value.valid = false

            break
          }
        }

        break
    }
  }
}
const onUploadAfter = (files) => {
  console.log(files)
}

function save() {
  this.validate(
    'campaignType', 'campaignName', 'campaignDesc', 'useHow', 'image',
    'targetUrl', 'totalBudget', 'adPrice', 'dayParticipationLimit', 'adDate',
    'goodsCode', 'paymentTerms', 'holdingTime'
  )

  if (validation.value.valid) {
    // this.store.adminRegister()
  }
}

function paymentTermsChange() {
  register.value.holdingTime = 0
}

</script>

<style scoped lang="scss">

</style>
