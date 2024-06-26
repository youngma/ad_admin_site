<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPaneRef" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link
        v-for="tag in visitedViews"
        ref="tagRef"
        :key="tag.path"
        v-slot="{ navigate }"
        custom
        :to="{
          path: tag.path,
          query: tag.query,
          meta: tag.meta,
          fullPath: tag.fullPath
        }"
      >
        <div
            class="tags-view-item"
            :class="isActive(tag)?'active':''"
            @click="navigate"
            @click.middle="!isAffix(tag)?closeSelectedTag(tag):''"
            @contextmenu.prevent="openMenu(tag,$event)"
        >
          {{ tag.title }}
          <Close v-if="!isAffix(tag)" style="width: 1em; height: 1em; margin: 1px 0px 0px 8px" @click.prevent.stop="closeSelectedTag(tag)"></Close>
        </div>
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">Refresh</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">Close</li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags(selectedTag)">Close All</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from './ScrollPane.vue'
import path from 'path'
import { permissionStore } from '@/store/modules/core/permission.js'
import { settingStore } from '@/store/modules/core/settings.js'
import { appStore } from '@/store/modules/core/app.js'
import { tagsViewStore } from '@/store/modules/core/tagsView.js'

import { ref, inject, watch, nextTick } from 'vue'

import { useRoute } from 'vue-router'

export default {
  name: 'TagsView',
  components: { ScrollPane },
  setup: () => {
    const tagsView = tagsViewStore()
    const permission = permissionStore()
    const setting = settingStore()
    const app = appStore()

    const router = inject('$router')
    const route = useRoute()

    const scrollPaneRef = ref(null)
    const tagRef = ref(null)

    // watch(
    //   () => route.fullPath,
    //   async fullPath => {
    //
    //   }
    // )

    return {
      permission, setting, app, tagsView, router, route,
      scrollPaneRef, tagRef
    }
  },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    }
  },
  computed: {
    visitedViews() {
      return this.tagsView.visitedViews
    },
    routes() {
      return this.permission.state.routes
    }
  },
  watch: {
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    },
    async 'route.fullPath'(value) {
      if (value) {
        this.addTags()
        this.moveToCurrentTag()
      }
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
  },
  methods: {
    addTags() {
      const { fullPath, name } = this.route
      const { title } = this.route.meta

      console.log('tagview', this.route)
      // const { name } = router.currentRoute.value
      if (name) {
        this.tagsView.addView(this.route)
      }
      return false
    },
    moveToCurrentTag() {
      const { path, fullPath, name } = this.route
      const { title } = this.route.meta

      const currentPath = path
      const currentFullPath = fullPath

      nextTick(() => {
        for (const tag of this.tagsView.visitedViews) {
          if (tag.path === currentPath) {
            this.scrollPaneRef.moveToTarget(tag)
            // when query is different then update
            if (tag.fullPath !== currentFullPath) {
              this.tagsView.updateVisitedView(this.router)
            }
            break
          }
        }
      })
    },
    isActive(route) {
      return route.path === this.route.path
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix
    },
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags() {
      const affixTags = this.affixTags = this.filterAffixTags(this.routes)
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.tagsView.addVisitedView(tag)
        }
      }
    },

    refreshSelectedTag(view) {
      this.tagsView.delCachedView(view).then(() => {
        const { fullPath } = view
        this.$nextTick(() => {
          this.router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    },
    closeSelectedTag(view) {
      this.tagsView.delView(view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    },
    closeOthersTags() {
      this.router.push(this.selectedTag)

      this.tagsView.delOthersViews(this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags(view) {
      this.tagsView.delAllViews().then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return
        }
        this.toLastView(visitedViews, view)
      })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.router.push(latestView.fullPath)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'Dashboard') {
          // to reload home page
          this.router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.router.push('/')
        }
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    },
    handleScroll() {
      this.closeMenu()
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 6px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
