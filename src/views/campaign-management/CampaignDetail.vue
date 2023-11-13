
<template>
  <div class="components-container">
    <div class="comm_comp">
      <el-row>
        <el-col class="comm_form_box comm_text_tit">캠페인 상세</el-col>
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
                  v-model="campaigns.selectedCampaign.campaignType"
                  disabled
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
                  v-model="campaigns.selectedCampaign.campaignName"
                  :readonly="!modifyMode"
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
                  v-model="campaigns.selectedCampaign.campaignDesc"
                  type="textarea"
                  :readonly="!modifyMode"
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
            <strong class="comm_tit_box">총 참여 가능 수량</strong>
          </el-col>
          <el-col :span="8" class="col_desc">
            <el-row :gutter="10">
              <el-col :span="20">
                <el-input
                  v-model="campaigns.selectedCampaign.totalParticipationLimit"
                  :readonly="!modifyMode"

                  :formatter="(value) => moneyFormatter(value)"
                  :class="{ 'is-error': !validation.totalParticipationLimit.check }"
                  class="text-end" placeholder="일 참여 제한 수 입력 해주세요."  >
                  <template #append>건</template>
                </el-input>
              </el-col>
            </el-row>
            <div v-show="!validation.totalParticipationLimit.check" class="invalid-feedback">
              {{validation.totalParticipationLimit.message}}
            </div>
          </el-col>
          <el-col :span="4" class="col_tit">
            <strong class="comm_tit_box">일 참여 제한 수량</strong>
          </el-col>
          <el-col :span="8" class="col_desc">
            <el-row :gutter="10">
              <el-col :span="20">
                <el-input
                  v-model="campaigns.selectedCampaign.dayParticipationLimit"
                  :readonly="!modifyMode"

                  :formatter="(value) => moneyFormatter(value)"
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
                  v-model="campaigns.selectedCampaign.adPrice"
                  :formatter="(value) => moneyFormatter(value)"
                  :class="{ 'is-error': !validation.adPrice.check }"
                  class="text-end" placeholder="광고 단가를 입력 해주세요."
                  @keyup="(value) => caclTotalBudget(value)"
                >
                  <template #append>원</template>
                </el-input>
              </el-col>
            </el-row>
            <div v-show="!validation.adPrice.check" class="invalid-feedback">
              {{validation.adPrice.message}}
            </div>
          </el-col>
          <el-col :span="4" class="col_tit">
            <strong class="comm_tit_box">총 예산</strong>
          </el-col>
          <el-col :span="8" class="col_desc text-end">
            <el-row :gutter="10">
              <el-col :span="20">
                <el-input
                  v-model="campaigns.selectedCampaign.totalBudget"
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
        </el-row>

        <el-row v-if="campaigns.selectedCampaign.campaignType === 'QUIZ02'" :gutter="10">

          <el-col :span="4" class="col_tit">
            <strong class="comm_tit_box">매체사 지급 수수료(원)</strong>
          </el-col>
          <el-col :span="8" class="col_desc">
            <el-row :gutter="10">
              <el-col :span="20">
                <el-input-number
                  v-model="campaigns.selectedCampaign.commissionRate"
                  :min="0"
                  :max="adPrice"
                  :class="{ 'is-error': !validation.commissionRate.check }"
                  controls-position="right"
                  size="large"
                />
              </el-col>
            </el-row>
            <div v-show="!validation.commissionRate.check" class="invalid-feedback">
              {{validation.commissionRate.message}}
            </div>
          </el-col>
          <el-col :span="4" class="col_tit">
            <strong class="comm_tit_box">사용자 지급 수수료(원)</strong>
          </el-col>
          <el-col :span="8" class="col_desc text-end">
            <el-row :gutter="10">
              <el-col :span="20">
                <el-input-number
                  v-model="campaigns.selectedCampaign.userCommissionRate"
                  :min="0"
                  :max="commissionRate"
                  :class="{ 'is-error': !validation.userCommissionRate.check }"
                  controls-position="right"
                  size="large"
                />
              </el-col>
            </el-row>
            <div v-show="!validation.userCommissionRate.check" class="invalid-feedback">
              {{validation.userCommissionRate.message}}
            </div>
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
                  v-model="campaigns.selectedCampaign.adDate"
                  :readonly="!modifyMode"
                  type="datetimerange"
                  size="large"
                  start-placeholder="광고 시작 일자"
                  end-placeholder="광고 종료 일자"
                  :disabled-date="disabledDate"
                  :default-time="defaultAdDate"
                  date-format="YYYY/MM/DD"
                  time-format="HH:mm"
                  format="YYYY-MM-DD HH:mm"
                  value-format="YYYY-MM-DD HH:mm"
                />
              </el-col>
            </el-row>
            <div v-show="!validation.adDate.check" class="invalid-feedback">
              {{validation.adDate.message}}
            </div>
          </el-col>
          <el-col :span="4" class="col_desc">
<!--            <strong class="comm_tit_box"></strong>-->
          </el-col>
          <el-col :span="8" class="col_desc">
          </el-col>
        </el-row>

        <div v-if="campaigns.selectedCampaign.smartStore" class="comm_comp mt_15">
          <el-row>
            <el-col class="comm_form_box comm_text_tit2">스마트 스토어 광고 추가 입력</el-col>
          </el-row>

          <div class="comm_comp_table">

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
                      v-model="campaigns.selectedCampaign.smartStore.useHow"
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
                <strong class="comm_tit_box">PC 랜딩 URL</strong>
              </el-col>
              <el-col :span="16" class="col_desc">
                <el-row :gutter="10">
                  <el-col
                    :span="20"
                    :class="{ 'is-error': !validation.targetUrlPc.check }"
                  >
                    <el-input
                      v-model="campaigns.selectedCampaign.smartStore.targetUrlPc"
                      class=""
                      placeholder="모바일 랜딩 URL을 입력 해주세요."
                    />
                  </el-col>

                </el-row>
                <div v-show="!validation.targetUrlPc.check" class="invalid-feedback">
                  {{validation.targetUrlPc.message}}
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="4" class="col_tit">
                <strong class="comm_tit_box">모바일 랜딩 URL</strong>
              </el-col>
              <el-col :span="16" class="col_desc">
                <el-row :gutter="10">
                  <el-col
                    :span="20"
                    :class="{ 'is-error': !validation.targetUrlMobile.check }"
                  >
                    <el-input
                      v-model="campaigns.selectedCampaign.smartStore.targetUrlMobile"
                      class=""
                      placeholder="모바일 랜딩 URL을 입력 해주세요."
                    />
                  </el-col>

                </el-row>
                <div v-show="!validation.targetUrlMobile.check" class="invalid-feedback">
                  {{validation.targetUrlMobile.message}}
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
                  :class="{ 'is-error': !validation.image.check }"
                >
                  <CampaignImageUpload
                    ref="smart_store_file_modify_upload"
                    :files="campaigns.selectedCampaign.uploads.smartStore"
                    @upload-after="(resp) => onUploadAfter('smartStore.image', resp)"
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
                      v-model="campaigns.selectedCampaign.smartStore.totalBudget"
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
                <strong class="comm_tit_box">광고 단가</strong>
              </el-col>
              <el-col :span="8" class="col_desc">
                <el-row :gutter="10">
                  <el-col :span="20">
                    <el-input
                      v-model="campaigns.selectedCampaign.smartStore.adPrice"
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
                      v-model="campaigns.selectedCampaign.smartStore.goodsCode"
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
                      v-model="campaigns.selectedCampaign.smartStore.paymentTerms"
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
                  <el-col v-if="campaigns.selectedCampaign.smartStore.paymentTerms === 'TIME'" :span="10">
                    <el-input
                      v-model="campaigns.selectedCampaign.smartStore.holdingTime"
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
        </div>

        <div v-if="campaigns.selectedCampaign.quiz" class="comm_comp mt_15">

          <el-row>
            <el-col class="comm_form_box comm_text_tit2">퀴즈 광고 추가 입력</el-col>
          </el-row>

          <div class="comm_comp_table">

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
                      v-model="campaigns.selectedCampaign.quiz.useHow"
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
                <strong class="comm_tit_box">퀴즈 제목</strong>
              </el-col>
              <el-col :span="16" class="col_desc">
                <el-row :gutter="10">
                  <el-col
                    :span="20"
                    :class="{ 'is-error': !validation.quizTitle.check }"
                  >
                    <el-input
                      v-model="campaigns.selectedCampaign.quiz.quizTitle"
                      class=""
                      placeholder="퀴즈 제목을 입력 해주세요."
                    />
                  </el-col>

                </el-row>
                <div v-show="!validation.quizTitle.check" class="invalid-feedback">
                  {{validation.quizTitle.message}}
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="4" class="col_tit">
                <strong class="comm_tit_box">퀴즈 정답</strong>
              </el-col>
              <el-col :span="16" class="col_desc">
                <el-row :gutter="10">
                  <el-col
                    :span="20"
                    :class="{ 'is-error': !validation.quizAnswer.check }"
                  >
                    <el-input
                      v-model="campaigns.selectedCampaign.quiz.quizAnswer"
                      class=""
                      placeholder="퀴즈 제목을 입력 해주세요."
                    />
                  </el-col>

                </el-row>
                <div v-show="!validation.quizAnswer.check" class="invalid-feedback">
                  {{validation.quizAnswer.message}}
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="4" class="col_tit">
                <strong class="comm_tit_box">PC 랜딩 URL</strong>
              </el-col>
              <el-col :span="16" class="col_desc">
                <el-row :gutter="10">
                  <el-col
                    :span="20"
                    :class="{ 'is-error': !validation.targetUrlPc.check }"
                  >
                    <el-input
                      v-model="campaigns.selectedCampaign.quiz.targetUrlPc"
                      class=""
                      placeholder="모바일 랜딩 URL을 입력 해주세요."
                    />
                  </el-col>

                </el-row>
                <div v-show="!validation.targetUrlPc.check" class="invalid-feedback">
                  {{validation.targetUrlPc.message}}
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="4" class="col_tit">
                <strong class="comm_tit_box">모바일 랜딩 URL</strong>
              </el-col>
              <el-col :span="16" class="col_desc">
                <el-row :gutter="10">
                  <el-col
                    :span="20"
                    :class="{ 'is-error': !validation.targetUrlMobile.check }"
                  >
                    <el-input
                      v-model="campaigns.selectedCampaign.quiz.targetUrlMobile"
                      class=""
                      placeholder="모바일 랜딩 URL을 입력 해주세요."
                    />
                  </el-col>

                </el-row>
                <div v-show="!validation.targetUrlMobile.check" class="invalid-feedback">
                  {{validation.targetUrlMobile.message}}
                </div>
              </el-col>
            </el-row>

<!--            <el-row :gutter="10">-->
<!--              <el-col :span="4" class="col_tit">-->
<!--                <strong class="comm_tit_box">상품 코드</strong>-->
<!--              </el-col>-->
<!--              <el-col :span="16" class="col_desc">-->
<!--                <el-row :gutter="10">-->
<!--                  <el-col-->
<!--                    :span="20"-->
<!--                    :class="{ 'is-error': !validation.goodsCode.check }"-->
<!--                  >-->
<!--                    <el-input-->
<!--                      v-model="campaigns.selectedCampaign.quiz.goodsCode"-->
<!--                      :class="{ 'is-error': !validation.goodsCode.check }"-->
<!--                      class="" placeholder="상품 코드를 입력 해주세요." />-->

<!--                  </el-col>-->
<!--                </el-row>-->
<!--                <div v-show="!validation.goodsCode.check" class="invalid-feedback">-->
<!--                  {{validation.goodsCode.message}}-->
<!--                </div>-->
<!--              </el-col>-->
<!--            </el-row>-->

            <el-row :gutter="10">
              <el-col :span="4" class="col_tit">
                <strong class="comm_tit_box">퀴즈 목록 노출 이미지</strong>
              </el-col>
              <el-col :span="16" class="col_desc">
                <el-row
                  :gutter="10"
                  :class="{ 'is-error': !validation.mainImage.check }"
                >
                  <CampaignImageUpload
                    ref="quiz_mainImage_modify_upload"
                    :files="campaigns.selectedCampaign.uploads.quiz.mainImage"
                    @upload-after="(resp) => onUploadAfter('quiz.mainImage', resp)"
                  />

                </el-row>
                <div v-show="!validation.image.check" class="invalid-feedback">
                  {{validation.mainImage.message}}
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="4" class="col_tit">
                <strong class="comm_tit_box">상세 이미지 1</strong>
              </el-col>
              <el-col :span="16" class="col_desc">
                <el-row
                  :gutter="10"
                  :class="{ 'is-error': !validation.detailImage1.check }"
                >
                  <CampaignImageUpload
                    ref="quiz_detailImage1_modify_upload"
                    :files="campaigns.selectedCampaign.uploads.quiz.detailImage1"
                    @upload-after="(resp) => onUploadAfter('quiz.detailImage1', resp)"
                  />

                </el-row>
                <div v-show="!validation.image.check" class="invalid-feedback">
                  {{validation.detailImage1.message}}
                </div>
              </el-col>
            </el-row>

<!--            <el-row :gutter="10">-->
<!--              <el-col :span="4" class="col_tit">-->
<!--                <strong class="comm_tit_box">상세 이미지 2</strong>-->
<!--              </el-col>-->
<!--              <el-col :span="16" class="col_desc">-->
<!--                <el-row-->
<!--                  :gutter="10"-->
<!--                  :class="{ 'is-error': !validation.detailImage2.check }"-->
<!--                >-->
<!--                  <CampaignImageUpload-->
<!--                    ref="quiz_detailImage2_modify_upload"-->
<!--                    :files="campaigns.selectedCampaign.uploads.quiz.detailImage2"-->
<!--                    @upload-after="(resp) => onUploadAfter('quiz.detailImage2', resp)"-->
<!--                  />-->

<!--                </el-row>-->
<!--                <div v-show="!validation.image.check" class="invalid-feedback">-->
<!--                  {{validation.detailImage2.message}}-->
<!--                </div>-->
<!--              </el-col>-->
<!--            </el-row>-->

          </div>
        </div>

      </div>
      <el-row justify="end">
        <el-col class="t_r comm_form_box" tag="span">
          <el-button v-if="!modifyMode" type="success" class="comm_form_btn" @click="modeChange()">수정</el-button>
          <el-button v-if="modifyMode" type="success" class="comm_form_btn" @click="save()">저장</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import CampaignImageUpload from '@/components/AdCampaignManagement/CampaignImageUpload.vue'

import { advertiserStore } from '@/store/modules/admin/advertiserStore.js'
import { commonStore } from '@/store/modules/admin/commonStore.js'

import { storeToRefs } from 'pinia'
import { ref, getCurrentInstance, computed, onActivated, onMounted } from 'vue'
import { numberFormatter, moneyFormatter } from '@/utils/customElTableFormatter.js'
import { validURL } from '@/utils/validate.js'
import { ElMessageBox } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

defineOptions({
  name: 'CampaignModifyForm'
})

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
  dayParticipationLimit: {
    check: true,
    message: ''
  },
  totalParticipationLimit: {
    check: true,
    message: ''
  },

  commissionRate: {
    check: true,
    message: ''
  },

  userCommissionRate: {
    check: true,
    message: ''
  },

  adDate: {
    check: true,
    message: ''
  },

  useHow: {
    check: true,
    message: ''
  },
  targetUrlPc: {
    check: true,
    message: ''
  },
  targetUrlMobile: {
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
  },
  quizTitle: {
    check: true,
    message: ''
  },
  quizAnswer: {
    check: true,
    message: ''
  },
  mainImage: {
    check: true,
    message: ''
  },
  detailImage1: {
    check: true,
    message: ''
  },
  detailImage2: {
    check: true,
    message: ''
  }
})

const store = advertiserStore()
const common = commonStore()

const route = useRoute()
const router = useRouter()

const { appContext } = getCurrentInstance()

const { campaigns, defaultAdDate } = storeToRefs(store)
const { CampaignType, PaymentTerms } = storeToRefs(common)

const smart_store_file_modify_upload = ref(null)
const quiz_mainImage_modify_upload = ref(null)
const quiz_detailImage1_modify_upload = ref(null)
// const quiz_detailImage2_modify_upload = ref(null)

const modifyMode = computed(() => !campaigns.modifyMode)
const disabledDate = (time) => {
  return time.getTime() < Date.now()
}

function validate(...types) {
  const { campaignName, campaignType, campaignDesc, dayParticipationLimit, adDate, totalBudget, adPrice, smartStore, quiz } = campaigns.value.selectedCampaign

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

      case 'totalParticipationLimit' :

        validation.value.totalParticipationLimit.check = true
        validation.value.totalParticipationLimit.message = ''

        if (dayParticipationLimit <= 0) {
          validation.value.totalParticipationLimit.check = false
          validation.value.totalParticipationLimit.message = '총 참여 가능 수량 을 1건 이상 만 가능 합니다.'

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

        if (adDate.size === 0) {
          validation.value.adDate.check = false
          validation.value.adDate.message = '광고 기간을 설정 해주세요.'

          validation.value.valid = false

          break
        }

        break
    }

    if (campaignType === 'TYPE1') {
      smartSotreValidate('useHow', 'image', 'targetUrlPc', 'targetUrlMobile', 'totalBudget', 'adPrice', 'goodsCode', 'paymentTerms', 'holdingTime')
    }

    if (campaignType === 'QUIZ01') {
      quizValidate('useHow', 'mainImage', 'detailImage1', 'targetUrlPc', 'targetUrlMobile', 'quizTitle', 'quizAnswer')
    }

    if (campaignType === 'QUIZ02') {
      quizValidate('useHow', 'mainImage', 'detailImage1', 'targetUrlPc', 'targetUrlMobile', 'quizTitle', 'quizAnswer')
      quizValidate('commissionRate', 'userCommissionRate')
    }
  }
}

function smartSotreValidate(...types) {
  const { useHow, image, targetUrlPc, targetUrlMobile, totalBudget, adPrice, goodsCode, paymentTerms, holdingTime } = campaigns.value.selectedCampaign.smartStore
  for (const type of types) {
    switch (type) {
      case 'targetUrlPc' :

        validation.value.targetUrlPc.check = true
        validation.value.targetUrlPc.message = ''

        if (targetUrlPc === null || targetUrlPc === '') {
          validation.value.targetUrlPc.check = false
          validation.value.targetUrlPc.message = '타켓 URL 을 입력 하세요.'

          validation.value.valid = false

          break
        }

        // var regex = new RegExp('^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?')
        // var without_regex = new RegExp('^([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?')

        if (!validURL(targetUrlPc)) {
          validation.value.targetUrlPc.check = false
          validation.value.targetUrlPc.message = 'URL 형색을 확인 해주세요..'

          validation.value.valid = false
          break
        }

        break

      case 'targetUrlMobile' :

        validation.value.targetUrlMobile.check = true
        validation.value.targetUrlMobile.message = ''

        if (targetUrlMobile === null || targetUrlMobile === '') {
          validation.value.targetUrlMobile.check = false
          validation.value.targetUrlMobile.message = '타켓 URL 을 입력 하세요.'

          validation.value.valid = false

          break
        }

        // var regex = new RegExp('^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?')
        // var without_regex = new RegExp('^([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?')

        if (!validURL(targetUrlMobile)) {
          validation.value.targetUrlMobile.check = false
          validation.value.targetUrlMobile.message = 'URL 형색을 확인 해주세요..'

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
            validation.value.paymentTerms.message = '로딩 타임을 1초 이상 설정 해주세요.'

            validation.value.valid = false

            break
          }
        }

        break
    }
  }
}

function quizValidate(...types) {
  const { useHow, quizTitle, quizAnswer, mainImage, detailImage1, detailImage2, targetUrlPc, targetUrlMobile, goodsCode } = campaigns.value.selectedCampaign.quiz
  for (const type of types) {
    switch (type) {
      case 'targetUrlPc' :

        validation.value.targetUrlPc.check = true
        validation.value.targetUrlPc.message = ''

        if (targetUrlPc === null || targetUrlPc === '') {
          validation.value.targetUrlPc.check = false
          validation.value.targetUrlPc.message = '타켓 URL 을 입력 하세요.'

          validation.value.valid = false

          break
        }

        // var regex = new RegExp('^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?')
        // var without_regex = new RegExp('^([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?')

        if (!validURL(targetUrlPc)) {
          validation.value.targetUrlPc.check = false
          validation.value.targetUrlPc.message = 'URL 형색을 확인 해주세요..'

          validation.value.valid = false
          break
        }

        break

      case 'targetUrlMobile' :

        validation.value.targetUrlMobile.check = true
        validation.value.targetUrlMobile.message = ''

        if (targetUrlMobile === null || targetUrlMobile === '') {
          validation.value.targetUrlMobile.check = false
          validation.value.targetUrlMobile.message = '타켓 URL 을 입력 하세요.'

          validation.value.valid = false

          break
        }

        // var regex = new RegExp('^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?')
        // var without_regex = new RegExp('^([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?')

        if (!validURL(targetUrlMobile)) {
          validation.value.targetUrlMobile.check = false
          validation.value.targetUrlMobile.message = 'URL 형색을 확인 해주세요..'

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

      case 'quizTitle' :

        validation.value.quizTitle.check = true
        validation.value.quizTitle.message = ''

        if (quizTitle === null || quizTitle === '') {
          validation.value.quizTitle.check = false
          validation.value.quizTitle.message = '퀴즈 제목 을 입력 하세요.'

          validation.value.valid = false

          break
        }

        break

      case 'quizAnswer' :

        validation.value.quizAnswer.check = true
        validation.value.quizAnswer.message = ''

        if (quizAnswer === null || quizAnswer === '') {
          validation.value.quizAnswer.check = false
          validation.value.quizAnswer.message = '퀴즈 답변 을 입력 하세요.'

          validation.value.valid = false

          break
        }

        break

      case 'mainImage' :

        validation.value.mainImage.check = true
        validation.value.mainImage.message = ''

        if (mainImage === null || mainImage === '') {
          validation.value.mainImage.check = false
          validation.value.mainImage.message = '메인 이미지 를 등록 하세요.'

          validation.value.valid = false

          break
        }

        break

      case 'detailImage1' :

        validation.value.detailImage1.check = true
        validation.value.detailImage1.message = ''

        if (detailImage1 === null || detailImage1 === '') {
          validation.value.detailImage1.check = false
          validation.value.detailImage1.message = '상세 이미지1 를 등록 하세요.'

          validation.value.valid = false

          break
        }

        break
      case 'detailImage2' :

        validation.value.detailImage2.check = true
        validation.value.detailImage2.message = ''

        if (detailImage2 === null || detailImage2 === '') {
          validation.value.detailImage2.check = false
          validation.value.detailImage2.message = '상세 이미지2 를 등록 하세요.'

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
    }
  }
}

const onUploadAfter = (imageType, resp) => {
  const { result, uploadFiles } = resp

  if (imageType === 'smartStore.image') {
    if (result && result.length > 0) {
      const { originFileName, newFileName, target } = result[0]

      campaigns.value.selectedCampaign.uploads.smartStore = uploadFiles.map(file => {
        const { name, raw } = file
        const { type } = raw

        campaigns.value.selectedCampaign.smartStore.image = {
          newFile: true,
          fileType: type,
          originName: originFileName,
          fileName: [target, newFileName].join('/')
        }

        return {
          name: name,
          type,
          url: [import.meta.env.VITE_FILE_SERVER, 'temp', target, newFileName].join('/')
        }
      })
    } else {
      campaigns.value.selectedCampaign.uploads.smartStore = []
    }
  } else if (imageType === 'quiz.mainImage') {
    if (result && result.length > 0) {
      const { originFileName, newFileName, target } = result[0]

      campaigns.value.selectedCampaign.uploads.quiz.mainImage = uploadFiles.map(file => {
        const { name, raw } = file
        const { type } = raw

        campaigns.value.selectedCampaign.quiz.mainImage = {
          newFile: true,
          fileType: type,
          originName: originFileName,
          fileName: [target, newFileName].join('/')
        }

        return {
          name: name,
          type,
          url: [import.meta.env.VITE_FILE_SERVER, 'temp', target, newFileName].join('/')
        }
      })
    } else {
      campaigns.value.selectedCampaign.uploads.quiz.mainImage = []
    }
  } else if (imageType === 'quiz.detailImage1') {
    if (result && result.length > 0) {
      const { originFileName, newFileName, target } = result[0]

      campaigns.value.selectedCampaign.uploads.quiz.detailImage1 = uploadFiles.map(file => {
        const { name, raw } = file
        const { type } = raw

        campaigns.value.selectedCampaign.quiz.detailImage1 = {
          newFile: true,
          fileType: type,
          originName: originFileName,
          fileName: [target, newFileName].join('/')
        }

        return {
          name: name,
          type,
          url: [import.meta.env.VITE_FILE_SERVER, 'temp', target, newFileName].join('/')
        }
      })
    } else {
      campaigns.value.selectedCampaign.uploads.quiz.detailImage1 = []
    }
  } else if (imageType === 'quiz.detailImage2') {
    if (result && result.length > 0) {
      const { originFileName, newFileName, target } = result[0]

      campaigns.value.selectedCampaign.uploads.quiz.detailImage2 = uploadFiles.map(file => {
        const { name, raw } = file
        const { type } = raw

        campaigns.value.selectedCampaign.quiz.detailImage2 = {
          newFile: true,
          fileType: type,
          originName: originFileName,
          fileName: [target, newFileName].join('/')
        }

        return {
          name: name,
          type,
          url: [import.meta.env.VITE_FILE_SERVER, 'temp', target, newFileName].join('/')
        }
      })
    } else {
      campaigns.value.selectedCampaign.uploads.quiz.detailImage2 = []
    }
  }
}

function modeChange() {
  modifyMode.value = !modifyMode.value
}

function save() {
  validate(
    'campaignType', 'campaignName', 'campaignDesc', 'totalParticipationLimit', 'dayParticipationLimit', 'adDate'
  )

  if (validation.value.valid) {
    store.modifyAfCampaign().then(() => {
      ElMessageBox.alert('수정 되었습니다.', '확인', {
        callback: () => {
          if (smart_store_file_modify_upload.value) {
            smart_store_file_modify_upload.value.initUploader()
          }
          if (quiz_mainImage_modify_upload.value) {
            quiz_mainImage_modify_upload.value.initUploader()
          }
          if (quiz_detailImage1_modify_upload.value) {
            quiz_detailImage1_modify_upload.value.initUploader()
          }
          // if (quiz_detailImage2_modify_upload.value) {
          //   quiz_detailImage2_modify_upload.value.initUploader()
          // }
          store.setCampaignDetail(null)
          const { referrer } = route.query
          console.log(route)
          router.push({ path: referrer || route.params.referrer || '/campaign-management/search'})
        }
      })
    }).catch((e) => {
      console.error(e)
      ElMessageBox.alert('처리 중 오류가 발생 했습니다.', '확인', {})
    })
  }
}

function paymentTermsChange() {
  campaigns.value.selectedCampaign.holdingTime = 0
}

onMounted(() => {
  if (!campaigns.value.selectedCampaign.seq) {
    const { referrer } = route.query
    router.push({ path: referrer || route.params.referrer || '/campaign-management/search'})
  }
})


const adPrice = computed(() => {
  return Number(numberFormatter(campaigns.value.selectedCampaign.adPrice))
})

const commissionRate = computed(() => {
  return Number(numberFormatter(campaigns.value.selectedCampaign.commissionRate))
})


function caclTotalBudget(value) {
  const { adPrice, totalParticipationLimit } = campaigns.value.selectedCampaign
  const totalBudget = numberFormatter(totalParticipationLimit) * numberFormatter(adPrice)
  campaigns.value.selectedCampaign.totalBudget = moneyFormatter(totalBudget)
}

</script>

<style scoped lang="scss">

</style>
