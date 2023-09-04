<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <Icon :icon=onlyOneChild.meta.icon></Icon>
          <template #title>{{ onlyOneChild.meta.title  }}</template>
        </el-menu-item>
      </app-link>
    </template>
    <template v-else>
      <el-sub-menu ref="subMenu" v-if="!item.hidden" :index="resolvePath(item.path)" >
        <template #title>
          <Icon :icon=item.meta.icon></Icon>
          <span>{{ item.meta.title  }}</span>
        </template>
        <!--      <el-menu-item-group  :index="resolvePath(item.path)" :class="{'submenu-title-noDropdown':!isNest}">-->
        <app-link v-for="child in item.children" :key="child.path" :to="resolvePath(child.path)"  >
          <el-menu-item v-if="!child.hidden"  :index="resolvePath(child.path)" :class="{'submenu-title-noDropdown':!isNest}">
            <Item :icon="child.meta.icon" :title = "child.meta.title"/>
          </el-menu-item>
        </app-link>
        <!--      </el-menu-item-group>-->
      </el-sub-menu>
    </template>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import AppLink from './Link.vue'
import Item from './Item.vue'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { AppLink, Item },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
