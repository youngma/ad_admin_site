<template>

  <div class="components-container">
    <PartnerSearchForm2
            ref="adGroupRegisterSearchForm"
            title="광고 그룹 등록"
            :multiple=false
            :multiple-limit=1
            :selected="selected"
            :partners="partners"
            @search-update="({ content, current }) => searchUpdate({ content, current })"
            @on-change="(value) => onSearchChange(value)"/>
    <AdGroupRegisterForm v-if="selected.length > 0 && selected[0]"/>
  </div>

</template>

<script setup>

import PartnerSearchForm2 from '@/components/ParnterManagement/PartnerSearchForm2.vue'
import AdGroupRegisterForm from '@/components/AdGroupManagement/AdGroupRegisterForm.vue'
import { partnerStore } from '@/store/modules/admin/partnerStore.js'
import { storeToRefs } from 'pinia'
import { onActivated, onUpdated, ref } from 'vue'

defineOptions({
  name: 'AdGroupRegister'
})

const adGroupRegisterSearchForm = ref(null)
const store = partnerStore()

const { selected, partners } = storeToRefs(store)

function searchUpdate({ content, current }) {
  console.log(current)
  store.setPartners({
    partners: content,
    selected: current
  })
}

function onSearchChange(value) {
  store.setPartnerSeq({ selected: value })
}

// function init() {
//   const { params } = route.meta
//   const { init } = route.query
//   if (params.init) {
//     if (init !== 'false') {
//       store.init()
//     }
//   }
// }

function searchFormInit() {
  adGroupRegisterSearchForm.value.initSet(selected.value, partners.value)
}

onActivated(() => {
  searchFormInit()
})

// onUpdated(() => {
//   init()
// })

</script>

<style scoped lang="scss">

</style>
