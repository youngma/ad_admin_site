<template>
  <div class="components-container">
    <div v-if="adGroups.selectedAdGroup" class="comm_comp">
      <el-row>
        <el-col class="comm_form_box comm_text_tit">지면 별 광고 맵핑</el-col>
      </el-row>
      <div class="comm_comp_table mb_15">
        <el-row :gutter="10">
          <el-col :span="4" class="col_tit">
            <strong class="comm_tit_box">매체사</strong>
          </el-col>
          <el-col :span="8" class="col_desc">
            <el-row :gutter="10">
              <el-col :span="16">
                {{ adGroups.selectedAdGroup.partner.businessName }} ({{ businessNumberFormatter(adGroups.selectedAdGroup.partner.businessNumber)}})
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4" class="col_tit">
            <strong class="comm_tit_box">광고 지면 명</strong>
          </el-col>
          <el-col :span="8" class="col_desc">
            <el-row :gutter="10">
              <el-col :span="16">
                {{ adGroups.selectedAdGroup.groupName}}
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div class="comm_comp_table">
        <el-table
          :data="campaigns.list"
          class="custom-table"
          style="width: 100%"
        >
          <el-table-column prop="selected" width="55" align="center" fixed >
            <template #header="scope">
              <el-checkbox
                v-model="checkAll"
                :indeterminate="isIndeterminate"
                @change="handleAllSelectionChange"
              ></el-checkbox>
            </template>
            <template #default="scope">
              <el-checkbox
                v-model="scope.row.selected"
                @change="() => handleSelectionChange(scope.row)"
              ></el-checkbox>
            </template>
          </el-table-column>

          <el-table-column fixed prop="campaignName" label="캠페인 명" width="150" header-align="center" align="center" />
          <el-table-column prop="image" label="이미지" width="300" header-align="center" align="center" >
            <template #default="scope">
              <div v-if="scope.row.smartStore">
                <img
                  width="150"
                  height="150"
                  :src="[filePath, 'files', scope.row.smartStore.image.fileName].join('/')"
                  :alt="scope.row.smartStore.image.originName"
                  @click="open([filePath, 'files', scope.row.smartStore.image.fileName].join('/'))"
                />
                <br/>
                <span> {{scope.row.smartStore.originName}} </span>
              </div>
              <div v-if="scope.row.quiz">
                <img
                  width="150"
                  height="150"
                  :src="[filePath, 'files', scope.row.quiz.mainImage.fileName].join('/')"
                  :alt="scope.row.quiz.mainImage.originName"
                  @click="open([filePath, 'files', scope.row.quiz.mainImage.fileName].join('/'))"
                />
                <br/>
                <span> {{scope.row.quiz.mainImage.originName}} </span>
              </div>
            </template>
          </el-table-column>

          <el-table-column  prop="totalBudget" label="광고 단가" width="150" header-align="center" align="right" >
            <template #default="scope">
              {{ moneyFormatter(scope.row.adPrice) }} 원

              <div v-if="scope.row.campaignType === 'QUIZ02'">
                매체사 : {{moneyFormatter(scope.row.commissionRate) }} 원
                <br/>
                사용자 :  {{moneyFormatter(scope.row.userCommissionRate)}} 원
              </div>

            </template>
          </el-table-column>
          <el-table-column  prop="totalBudget" label="총예산" width="150" header-align="center" align="right" >
            <template #default="scope">
              {{ moneyFormatter(scope.row.totalBudget) }} 원
            </template>
          </el-table-column>
          <el-table-column  prop="adEndDate" label="광고 일자"  header-align="center" align="center" >
            <template #default="scope">
              {{ scope.row.adStartDate.substring(0,16)}} ~ {{ scope.row.adEndDate.substring(0,16) }}
            </template>
          </el-table-column>

        </el-table>
        <div class="page-box">
          <el-pagination
            :page-size="campaigns.searchParams.size"
            :current-page="campaigns.searchParams.page"
            background
            :default-current-page=1
            :default-page-size=5
            :total="campaigns.total"
            layout="prev, pager, next"
            class="mt-4"
            @size-change="(v) => pageChange(v)"
            @current-change="(v) => pageChange(v)"
          />
        </div>
      </div>
      <el-row justify="end">
        <el-col class="t_r comm_form_box" tag="span">
          <el-button type="success" class="comm_form_btn" @click="save()">저장</el-button>
        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script setup>

import CampaignDataTable from '@/components/AdGroupManagement/AdMappingDataTable.vue'

import { partnerStore } from '@/store/modules/admin/partnerStore.js'
import { commonStore } from '@/store/modules/admin/commonStore.js'
import { storeToRefs } from 'pinia'
import { ref, getCurrentInstance, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { businessNumberFormatter, moneyFormatter } from '../../utils/customElTableFormatter.js'
import _ from 'lodash'

defineOptions({
  name: 'MappingAds'
})

const { appContext } = getCurrentInstance()

const filePath = computed(() => import.meta.env.VITE_FILE_SERVER)

const checkAll = ref(false)
const isIndeterminate = ref(false)

const store = partnerStore()
const common = commonStore()

const route = useRoute()
const router = useRouter()

const { adGroups, campaigns } = storeToRefs(store)

async function pageChange(number) {
  await store.searchByCampaigns({ page: number })
  handleSelectionInit()
}

const handleSelectionInit = () => {
  let count = 0
  campaigns.value.list.forEach(campaign => {
    if (campaign.selected) {
      adGroups.value.mappingAds.push(campaign.seq)
      count += 1
    }
  })

  // console.log(count === campaigns.value.list.length)
  isIndeterminate.value = count > 0 && count < campaigns.value.list.length
  checkAll.value = count === campaigns.value.list.length
}

const handleSelectionChange = (row) => {
  console.log('handleSelectionChange', row)
  const { seq } = row

  if (adGroups.value.mappingAds.includes(seq)) {
    _.remove(adGroups.value.mappingAds, function(item) {
      return item === seq
    })
  } else {
    adGroups.value.mappingAds.push(seq)
  }

  let count = 0
  campaigns.value.list.forEach(campaign => {
    if (adGroups.value.mappingAds.includes(campaign.seq)) {
      count += 1
    }
    if (campaign.seq === row.seq) {
      campaign.selected = row.selected
    }
  })

  if (count > 0 && count < campaigns.value.list.length) {
    isIndeterminate.value = true
  } else {
    isIndeterminate.value = false
  }
}

const handleAllSelectionChange = (val) => {
  // console.log('handleAllSelectionChange', val)
  campaigns.value.list.forEach(campaign => {
    campaign.selected = val
    if (val) {
      adGroups.value.mappingAds.push(campaign.seq)
    } else {
      _.remove(adGroups.value.mappingAds, function(item) {
        return item === campaign.seq
      })
    }
  })
  isIndeterminate.value = false
}

function save() {
  store.savaMappingAds(() => {
    // const { referrer } = route.query
    // store.setAdGroupDetail(null)
    // router.push({ path: referrer || route.params.referrer })
  })
}

</script>

<style scoped lang="scss">

</style>
