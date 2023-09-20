<template>
  <div class="components-container" type="">

    {{ selected }}
    {{ advertisers }}
    <AdvertiserSearchForm2 :selected="selected" :advertisers="advertisers" @search-update="searchUpdate" @on-change="(value) => onSearchChange(value)"/>
    <el-tabs type="border-card" @tab-change="(name) => onTabsChange(name)">
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

import { watch, onMounted } from 'vue'
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
const { selected, advertisers, advertiser } = storeToRefs(store)

onMounted(async() => {
})

watch(selected, async(newValue, oldVale) => {
  if (newValue.length === 0) {
    // store.init()
  } else {
    store.tabInitUser()
    store.tabInitAccount()
    store.tabInitCampaign()
  }
})

function searchUpdate({ content, current }) {
  advertisers.value = content
  selected.value = content.length === 0 ? [] : current
}

function onSearchChange(value) {
  selected.value = value

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
    switch (name) {
      case 'user': this.store.reloadByUsers()
        break
      case 'account': this.store.reloadByAccounts()
        break
      case 'ad-campaign': this.store.reloadByCampaigns()
        break
    }
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
