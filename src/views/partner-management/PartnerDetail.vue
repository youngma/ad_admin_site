<template>
  <div class="components-container" type="">
    <PartnerSearchForm2
      ref="partnerDetailSearchForm"
      :selected="selected"
      :partners="partners"
      :multiple=false
      :multiple-limit=1
      @search-update="({ content, current }) => searchUpdate({ content, current })"
      @on-change="(value) => onSearchChange(value)"
    />

    <el-tabs v-model="tabIndex" type="border-card" @tab-change="(name) => onTabsChange(name)">
      <el-tab-pane label="사용자" name="user">
        <PartnerUsers v-if="partner"/>
        <el-alert v-else title="매체사 를 선택해 주세요." type="info" />
      </el-tab-pane>
      <el-tab-pane label="계좌" name="account">
        <PartnerAccounts v-if="partner"/>
        <el-alert v-else title="매체사 를 선택해 주세요." type="info" />
      </el-tab-pane>
      <el-tab-pane label="광고 지면" name="ad-group">
        <PartnerAdGroups v-if="partner"/>
        <el-alert v-else title="매체사 를 선택해 주세요." type="info" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>

import { watch, onMounted, onActivated, ref } from 'vue'
import PartnerSearchForm2 from '@/components/ParnterManagement/PartnerSearchForm2.vue'

import PartnerUsers from '@/views/partner-management/tabs/PartnerUsers.vue'
import PartnerAccounts from '@/views/partner-management/tabs/PartnerAccounts.vue'
import PartnerAdGroups from '@/views/partner-management/tabs/PartnerAdGroups.vue'

import { partnerStore } from '@/store/modules/admin/partnerStore.js'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'PartnerDetail'
})

const partnerDetailSearchForm = ref(null)
const store = partnerStore()
const { selected, partners, partner, tabIndex } = storeToRefs(store)

onMounted(async() => {
})

onActivated(async() => {
  if (partner.value) {
    switch (tabIndex.value) {
      case 'user': partnerStore().reloadByUsers()
        break
      case 'account': partnerStore().reloadByAccounts()
        break
      case 'ad-group': partnerStore().reloadByAdGroups()
        break
    }
  } else {
    searchFormInit()
  }
})

function searchUpdate({ content, current }) {
  store.setPartners({
    partners: content,
    selected: current
  })
}

function onSearchChange(value) {
  store.setPartnerSeq({ selected: value })
  if (partner.value) {
    store.reloadByUsers()
    store.reloadByAccounts()
    store.reloadByAdGroups()
  } else {
    store.tabInitUser('ALL')
    store.tabInitAccount('ALL')
    store.tabInitAdGroup('ALL')
  }
}

function onTabsChange(name) {
  if (partner.value) {
    reload(name)
  }
}

function reload(name) {
  switch (name) {
    case 'user': store.reloadByUsers()
      break
    case 'account': store.reloadByAccounts()
      break
    case 'ad-group': store.reloadByAdGroups()
      break
  }
}

function searchFormInit() {
  partnerDetailSearchForm.value.initSet(selected.value, partners.value)
  tabIndex.value = 'user'
}

// onActivated(() => {
// })

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
