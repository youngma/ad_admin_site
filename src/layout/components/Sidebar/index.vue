<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper" always max-height="auto">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="true"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/variables.module.scss'

import { permissionStore } from '@/store/modules/core/permission.js'
import { settingStore } from '@/store/modules/core/settings.js'
import { appStore } from '@/store/modules/core/app.js'

export default {
  name: 'SidebarIndex',
  components: { SidebarItem, Logo },
  setup() {
    const permission = permissionStore()
    const setting = settingStore()
    const app = appStore()

    return {
      permission, setting, app
    }
  },
  computed: {
    permission_routes() {
      return this.permission.state.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.setting.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.app.sidebar.opened
    }
  }
}
</script>
