<template>
  <div class="components-container" type="">
    <PartnerSearchForm2 :selected="selected" :partners="partners" @search-update="searchUpdate" @on-change="(value) => onSearchChange(value)"/>

    <el-tabs v-model="tabIndex" type="border-card" @tab-change="(name) => onTabsChange(name)">
      <el-tab-pane label="사용자" name="user">
        <PartnerUsers v-if="partner"/>
        <el-alert v-else title="매체사 를 선택해 주세요." type="info" />
      </el-tab-pane>
      <el-tab-pane label="계좌" name="account">
        <PartnerAccounts v-if="partner"/>
        <el-alert v-else title="매체사 를 선택해 주세요." type="info" />
      </el-tab-pane>
      <el-tab-pane label="광고 그룹" name="ad-group">
        <PartnerAdGroups v-if="partner"/>
        <el-alert v-else title="매체사 를 선택해 주세요." type="info" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>

import { watch, onMounted } from 'vue'
import PartnerSearchForm2 from '@/components/ParnterManagement/PartnerSearchForm2.vue'

import PartnerUsers from '@/views/partner-management/tabs/PartnerUsers.vue'
import PartnerAccounts from '@/views/partner-management/tabs/PartnerAccounts.vue'
import PartnerAdGroups from '@/views/partner-management/tabs/PartnerAdGroups.vue'

import { partnerStore } from '@/store/modules/admin/partnerStore.js'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'PartnerDetail'
})

const store = partnerStore()
const { selected, partners, partner, tabIndex } = storeToRefs(store)

onMounted(async() => {
})

watch(selected, async(newValue, oldVale) => {
  if (newValue.length === 0) {
    // store.init()
  } else {
    // store.tabInitUser()
    // store.tabInitAccount()
  }
})

function searchUpdate({ content, current }) {
  partners.value = content
  selected.value = current
}

function onSearchChange(value) {
  selected.value = value

  if (this.partner) {
    this.store.reloadByUsers()
    this.store.reloadByAccounts()
    this.store.reloadByAdGroups()
  } else {
    this.store.tabInitUser()
    this.store.tabInitAccount()
    this.store.tabInitAdGroup()
  }
}

function onTabsChange(name) {
  if (this.partner) {
    switch (name) {
      case 'user': this.store.reloadByUsers()
        break
      case 'account': this.store.reloadByAccounts()
        break
      case 'ad-group': this.store.reloadByAdGroups()
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
