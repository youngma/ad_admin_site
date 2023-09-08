<template>
  <div class="" type="">
    <PartnerUserSearchForm/>
    <PartnerUserDataTable/>
    <el-row class="mt_15" justify="end">
      <el-col class="t_r comm_form_box" tag="span">
        <el-button type="success" class="comm_form_btn" @click="modalOpen()">등록</el-button>
      </el-col>
    </el-row>
    <PartnerUserRegisterModal v-if="userRegisterModal" />
  </div>
</template>

<script lang="js">
import PartnerUserSearchForm from '@/components/ParnterManagement/User/PartnerUserSearchForm.vue'
import PartnerUserDataTable from '@/components/ParnterManagement/User/PartnerUserDataTable.vue'
import PartnerUserRegisterModal from '@/components/ParnterManagement/User/PartnerUserRegisterModal.vue'
import { partnerStore } from '@/store/modules/admin/partnerStore.js'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

export default {
  components: {
    PartnerUserSearchForm, PartnerUserDataTable, PartnerUserRegisterModal
  },
  props: {
  },
  setup(props) {
    const store = partnerStore()
    const { selected, userRegisterModal, userModifyModal } = storeToRefs(store)
    onMounted(async() => {
    })
    return {
      store, selected, userRegisterModal, userModifyModal
    }
  },
  methods: {
    modalOpen() {
      this.store.userModalOpen('register')
    }
  }

}

</script>

<style lang="scss" scoped>
</style>

