<template>
  <div class="dashboard-editor-container">
    <div class=" clearfix">
      <pan-thumb :image="authStatus.avatar" style="float: left">
        Your roles:
        <span v-for="item in authStatus.roles" :key="item" class="pan-info-roles">{{ item }}</span>
      </pan-thumb>
      <github-corner style="position: absolute; top: 0px; border: 0; right: 0;" />
      <div class="info-container">
        <span class="display_name">{{ name }}</span>
        <span style="font-size:20px;padding-top:20px;display:inline-block;">Editor's Dashboard</span>
      </div>
    </div>
    <div>
      <img :src="emptyGif" class="emptyGif">
    </div>
  </div>
</template>

<script setup>
// import PanThumb from '@/components/PanThumb/index.vue'
// import GithubCorner from '@/components/GithubCorner/index.vue'

import { ref, computed } from 'vue'
import { authStore } from '@/store/modules/core/auth.js'

defineOptions({
  name: 'DashboardEditor'
})

const _authStore = authStore()

const emptyGif = ref('https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3')

const authStatus = computed(() => _authStore.status)

//
// export default {
//   name: 'DashboardEditor',
//   data() {
//     return {
//       emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'
//     }
//   },
//   computed: {
//     ...mapState('authStore', ['status']),
//     authStatus() {
//       return status
//     }
//   }
// }
</script>

<style lang="scss" scoped>
  .emptyGif {
    display: block;
    width: 45%;
    margin: 0 auto;
  }

  .dashboard-editor-container {
    background-color: #e3e3e3;
    min-height: 100vh;
    padding: 50px 60px 0px;
    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      display: block;
    }
    .info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
  }
</style>
