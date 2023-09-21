<template>
  <div class="" type="">
    <PartnerAdGroupSearchForm/>
    <AdGroupDataTable
      :list="adGroups.list"
      :total="adGroups.total"
      :page="adGroups.searchParams.page"
      :size="adGroups.searchParams.size"
      referrer="/partner-management/detail"
      @search-call="({ page, size }) => search({ page, size })"
    />
    <el-row class="mt_15" justify="end">
      <el-col class="t_r comm_form_box" tag="span">
        <el-button type="success" class="comm_form_btn" @click="goRegisterForm()">등록</el-button>
      </el-col>
    </el-row>
<!--    <PartnerAdGroupRegisterModal v-if="adGroupRegisterModal" />-->
  </div>
</template>

<script lang="js">
import PartnerAdGroupSearchForm from '@/components/ParnterManagement/AdGroup/PartnerAdGroupSearchForm.vue'
import AdGroupDataTable from '@/components/AdGroupManagement/AdGroupDataTable.vue'
import { partnerStore } from '@/store/modules/admin/partnerStore.js'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

export default {
  components: {
    PartnerAdGroupSearchForm, AdGroupDataTable
  },
  props: {
  },
  setup(props) {
    const store = partnerStore()
    const router = useRouter()

    const { selected, adGroups } = storeToRefs(store)

    onMounted(async() => {
    })

    return {
      store, selected, adGroups, router
    }
  },
  methods: {
    goRegisterForm() {
      this.store.initRegisterForm('adGroup')
      this.router.push({
        name: 'AdGroupRegister',
        query: {
          referrer: '/partner-management/detail',
          init: false
        }
      })
    },
    async search({ page, size }) {
      await this.store.searchByAdGroups({ selected: this.selected, page, size })
    }
  }
}

</script>

<style lang="scss" scoped>
</style>

