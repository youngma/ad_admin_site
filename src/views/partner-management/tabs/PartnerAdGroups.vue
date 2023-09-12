<template>
  <div class="" type="">
    <PartnerAdGroupSearchForm/>
    <PartnerAdGroupDataTable/>
    <el-row class="mt_15" justify="end">
      <el-col class="t_r comm_form_box" tag="span">
        <el-button type="success" class="comm_form_btn" @click="registerModalOpen()">등록</el-button>
      </el-col>
    </el-row>
    <PartnerAdGroupRegisterModal v-if="adGroupRegisterModal" />
  </div>
</template>

<script lang="js">
import PartnerAdGroupSearchForm from '@/components/ParnterManagement/AdGroup/PartnerAdGroupSearchForm.vue'
import PartnerAdGroupDataTable from '@/components/ParnterManagement/AdGroup/PartnerAdGroupDataTable.vue'
import PartnerAdGroupRegisterModal from '@/components/ParnterManagement/AdGroup/PartnerAdGroupRegisterModal.vue'
import { partnerStore } from '@/store/modules/admin/partnerStore.js'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

export default {
  components: {
    PartnerAdGroupSearchForm, PartnerAdGroupDataTable, PartnerAdGroupRegisterModal
  },
  props: {
  },
  setup(props) {
    const store = partnerStore()
    const { selected, adGroupRegisterModal, adGroupModifyModal } = storeToRefs(store)
    onMounted(async() => {
    })
    return {
      store, selected, adGroupRegisterModal, adGroupModifyModal
    }
  },
  methods: {
    registerModalOpen() {
      this.store.adGroupModalOpen('register')
    }
  }

}

</script>

<style lang="scss" scoped>
</style>

