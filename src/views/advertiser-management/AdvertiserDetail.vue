<template>
  <div class="components-container" type="">
    <AdvertiserSearchForm2 />
    <el-tabs type="border-card">
      <el-tab-pane label="사용자">
        <AdvertiserUsers v-if="advertiser"/>
        <el-alert v-else title="광고주를 선택해 주세요." type="info" />
      </el-tab-pane>
      <el-tab-pane label="계좌">
        <AdvertiserAccounts v-if="advertiser"/>
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

import { advertiserStore } from '@/store/modules/admin/advertiserStore.js'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'AdvertiserDetail'
})

const store = advertiserStore()
const { selected, advertiser } = storeToRefs(store)

onMounted(async() => {
})

watch(selected, async(newValue, oldVale) => {
  if (newValue.length === 0) {
    // store.init()
  } else {
    store.tabInitUser()
    store.tabInitAccount()
  }
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
