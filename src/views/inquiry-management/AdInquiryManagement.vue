<template>
  <div class="components-container" type="">
    <AdInquirySearchForm />
    <AdInquiryDataTable />
  </div>
</template>

<script setup>

import AdInquirySearchForm from '@/components/AdInquiryManagement/AdInquirySearchForm.vue'
import AdInquiryDataTable from '@/components/AdInquiryManagement/AdInquiryDataTable.vue'
import { onMounted, ref } from 'vue'

onMounted(() => {
})

</script>

