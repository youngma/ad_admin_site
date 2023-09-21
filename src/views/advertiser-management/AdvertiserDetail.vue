<template>
  <div class="components-container" type="">

    {{ advertisers }}
    {{ selected }}
    {{ advertiser }}
    {{ tabIndex }}

    <AdvertiserSearchForm2
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

import { onMounted, onActivated } from 'vue'

import AdvertiserSearchForm2 from '@/components/AdvertiserManagement/AdvertiserSearchForm2.vue'

import AdvertiserUsers from '@/views/advertiser-management/tabs/AdvertiserUsers.vue'
import AdvertiserAccounts from '@/views/advertiser-management/tabs/AdvertiserAccounts.vue'
import AdvertiserCampaign from '@/views/advertiser-management/tabs/AdvertiserCampaign.vue'

import { advertiserStore } from '@/store/modules/admin/advertiserStore.js'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'AdvertiserDetail'
})

const store = advertiserStore()
const { selected, advertisers, advertiser, tabIndex } = storeToRefs(store)

onMounted(async() => {
})

onActivated(async() => {
  if (advertiser.value) {
    switch (tabIndex.value) {
      case 'user': advertiserStore().reloadByUsers()
        break
      case 'account': advertiserStore().reloadByAccounts()
        break
      case 'ad-campaign': advertiserStore().reloadByCampaigns()
        break
    }
  }
})

function searchUpdate({ content, current }) {
  this.store.setAdvertisers({
    advertisers: content,
    selected: current
  })
}

function onSearchChange(value) {
  this.store.setAdvertiserSeq({ selected: value })
  if (this.advertiser) {
    this.store.reloadByUsers()
    this.store.reloadByAccounts()
    this.store.reloadByCampaigns()
  } else {
    this.store.tabInitUser()
    this.store.tabInitAccount()
    this.store.tabInitCampaign()
  }
}

function onTabsChange(name) {
  if (this.partner) {
    reload(name)
  }
}

function reload(name) {
  switch (name) {
    case 'user': this.store.reloadByUsers()
      break
    case 'account': this.store.reloadByAccounts()
      break
    case 'ad-campaign': this.store.reloadByCampaigns()
      break
  }
}

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
