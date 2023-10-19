<template>
  <div class="components-container" type="">
    <AdvertiserSearchForm2
      ref="advertiserDetailSearchForm"
      :selected="selected"
      :advertisers="advertisers"
      :multiple=false
      :multiple-limit=1
      @search-update="({ content, current }) => searchUpdate({ content, current })"
      @on-change="(value) => onSearchChange(value)"
    />

    <el-tabs v-model="tabIndex"  type="border-card" @tab-change="(name) => onTabsChange(name)">
      <el-tab-pane label="사용자">
        <AdvertiserUsers v-if="advertiser" name="user"/>
        <el-alert v-else title="광고주를 선택해 주세요." type="info" />
      </el-tab-pane>
      <el-tab-pane label="계좌">
        <AdvertiserAccounts v-if="advertiser" name="account"/>
        <el-alert v-else title="광고주를 선택해 주세요." type="info" />
      </el-tab-pane>
      <el-tab-pane label="캠페인">
        <AdvertiserCampaign v-if="advertiser" name="ad-campaign"/>
        <el-alert v-else title="광고주를 선택해 주세요." type="info" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>

import { onMounted, onActivated, ref } from 'vue'

import AdvertiserSearchForm2 from '@/components/AdvertiserManagement/AdvertiserSearchForm2.vue'

import AdvertiserUsers from '@/views/advertiser-management/tabs/AdvertiserUsers.vue'
import AdvertiserAccounts from '@/views/advertiser-management/tabs/AdvertiserAccounts.vue'
import AdvertiserCampaign from '@/views/advertiser-management/tabs/AdvertiserCampaign.vue'

import { advertiserStore } from '@/store/modules/admin/advertiserStore.js'
import { storeToRefs } from 'pinia'
import PartnerSearchForm2 from '@/components/ParnterManagement/PartnerSearchForm2.vue'

defineOptions({
  name: 'AdvertiserDetail'
})

const advertiserDetailSearchForm = ref(null)
const store = advertiserStore()
const { selected, advertisers, advertiser, tabIndex } = storeToRefs(store)

onMounted(async() => {
})

onActivated(async() => {
  console.log('onActivated', tabIndex.value)
  if (advertiser.value) {
    switch (tabIndex.value) {
      case '0': advertiserStore().reloadByUsers()
        break
      case '1': advertiserStore().reloadByAccounts()
        break
      case '2': advertiserStore().reloadByCampaigns()
        break
    }
  }
})

function searchUpdate({ content, current }) {
  store.setAdvertisers({
    advertisers: content,
    selected: current
  })
}

function onSearchChange(value) {
  store.setAdvertiserSeq({ selected: value })
  if (advertiser.value) {
    store.reloadByUsers('ALL')
    store.reloadByAccounts('ALL')
    store.reloadByCampaigns('ALL')
  } else {
    store.tabInitUser()
    store.tabInitAccount()
    store.tabInitCampaign()
  }
}

function onTabsChange(name) {
  if (advertiser.value) {
    reload(name)
  }
}

function reload(name) {
  switch (name) {
    case 'user': store.reloadByUsers()
      break
    case 'account': store.reloadByAccounts()
      break
    case 'ad-campaign': store.reloadByCampaigns()
      break
  }
}

function searchFormInit() {
  advertiserDetailSearchForm.value.initSet(selected.value, advertisers.value)
}

onActivated(() => {
  searchFormInit()
})

// watch: {
//   // whenever question changes, this function will run
//   selected(newValue, oldVale) {
//     console.log(111, this.selected)
//     console.log(newValue, oldVale)
//   }
// },
</script>

<style scoped lang="scss">

</style>
