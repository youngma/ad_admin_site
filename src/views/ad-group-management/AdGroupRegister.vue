<template>
  <div class="components-container">
    {{ selected }}
    {{ partners }}
    <PartnerSearchForm2 title="광고 그룹 등록" :multiple="false"  :selected="selected"  :partners="partners" @search-update="({ content, current }) => searchUpdate({ content, current })" @on-change="(value) => onSearchChange(value)"/>
    <AdGroupRegisterForm v-if="selected.length > 0 && selected[0] !== null"/>
  </div>

</template>

<script setup>

import PartnerSearchForm2 from '@/components/ParnterManagement/PartnerSearchForm2.vue'
import AdGroupRegisterForm from '@/components/AdGroupManagement/AdGroupRegisterForm.vue'
import { partnerStore } from '@/store/modules/admin/partnerStore.js'
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'

defineOptions({
  name: 'AdGroupRegister'
})

const store = partnerStore()

const { selected, partners } = storeToRefs(store)

function searchUpdate({ content, current }) {
  this.partners = content
  // selected.value = content.length === 0 ? [] : current || null
}

function onSearchChange(value) {
  this.selected = [value]
}

onBeforeMount(() => {
  partnerStore().init()
})

</script>

<style scoped lang="scss">

</style>
