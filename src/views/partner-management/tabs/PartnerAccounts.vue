<template>
  <div class="" type="">
    <PartnerAccountSearchForm/>
    <PartnerAccountDataTable/>
    <el-row class="mt_15" justify="end">
      <el-col class="t_r comm_form_box" tag="span">
        <el-button type="success" class="comm_form_btn" @click="modalOpen()">등록</el-button>
      </el-col>
    </el-row>
    <PartnerAccountRegisterModal v-if="accountRegisterModal" />
  </div>
</template>

<script lang="js">
import PartnerAccountSearchForm from '@/components/ParnterManagement/Account/PartnerAccountSearchForm.vue'
import PartnerAccountDataTable from '@/components/ParnterManagement/Account/PartnerAccountDataTable.vue'
import PartnerAccountRegisterModal from '@/components/ParnterManagement/Account/PartnerAccountRegisterModal.vue'
import { partnerStore } from '@/store/modules/admin/partnerStore.js'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

export default {
  components: {
    PartnerAccountSearchForm, PartnerAccountDataTable, PartnerAccountRegisterModal
  },
  props: {
  },
  setup(props) {
    const store = partnerStore()
    const { accountRegisterModal } = storeToRefs(store)
    onMounted(async() => {
    })
    return {
      store, accountRegisterModal
    }
  },
  methods: {
    modalOpen() {
      this.store.accountModalOpen('register')
    }
  }

}

</script>

<style lang="scss" scoped>
</style>

