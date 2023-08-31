<template>
  <div class="" type="">
    <UserSearchForm/>
    <UserDataTable/>
    <el-row class="mt_15" justify="end">
      <el-col class="t_r comm_form_box" tag="span">
        <el-button type="success" class="comm_form_btn" @click="modalOpen()">등록</el-button>
      </el-col>
    </el-row>
    {{store.users.userRegisterModal}}
    <UserRegisterModal v-if="userRegisterModal" />
  </div>
</template>

<script lang="js">
import UserSearchForm from '@/components/AdvertiserManagement/User/UserSearchForm.vue'
import UserDataTable from '@/components/AdvertiserManagement/User/UserDataTable.vue'
import UserRegisterModal from '@/components/AdvertiserManagement/User/UserRegisterModal.vue'
import { advertiserStore } from '@/store/modules/admin/advertiserStore.js'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

export default {
  components: {
    UserSearchForm, UserDataTable, UserRegisterModal
  },
  props: {
  },
  setup(props) {
    const store = advertiserStore()
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

