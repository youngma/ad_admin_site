<template>
  <div class="" type="">
    <AdvertiserAccountSearchForm/>
    <AdvertiserAccountDataTable/>
    <el-row class="mt_15" justify="end">
      <el-col class="t_r comm_form_box" tag="span">
        <el-button type="success" class="comm_form_btn" @click="modalOpen()">등록</el-button>
      </el-col>
    </el-row>
    <AdvertiserAccountRegisterModal v-if="accountRegisterModal" />
  </div>
</template>

<script lang="js">
import AdvertiserAccountSearchForm from '@/components/AdvertiserManagement/Account/AccountSearchForm.vue'
import AdvertiserAccountDataTable from '@/components/AdvertiserManagement/Account/AccountDataTable.vue'
import AdvertiserAccountRegisterModal from '@/components/AdvertiserManagement/Account/AccountRegisterModal.vue'
import { advertiserStore } from '@/store/modules/admin/advertiserStore.js'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

export default {
  components: {
    AdvertiserAccountSearchForm, AdvertiserAccountDataTable, AdvertiserAccountRegisterModal
  },
  props: {
  },
  setup(props) {
    const store = advertiserStore()
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

