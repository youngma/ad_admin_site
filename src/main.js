import Cookies from 'js-cookie'
import ElementPlus from 'element-plus'

import '@/styles/index.scss' // global css
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import '@/styles/element-variables.module.scss'
import koLang from 'element-plus/lib/locale/lang/ko'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import '@egjs/vue3-flicking/dist/flicking.css'
// Or, if you have to support IE9
import '@egjs/vue3-flicking/dist/flicking-inline.css'

import '@/styles/custom.scss'

// import * as filters from '@/filters' // global filters

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import router from './router'
import * as permission from '@/permission.js'

const pinia = createPinia()



pinia.use(piniaPersist)

const newApp = createApp(App)
  .use(pinia)
  .use(ElementPlus, {
    size: 'default', // set element-ui default size
    locale: koLang
  })
//
pinia.use(({ store }) => {
  store.$messageBox = newApp.config.globalProperties.$messageBox
  store.$alert = newApp.config.globalProperties.$alert
  store.$confirm = newApp.config.globalProperties.$confirm
})

console.log(newApp.config.globalProperties)
// if (useRouter.currentRoute.value.path ==);

await permission.generateRoutes(router)

newApp.use(router)
newApp.use(autoAnimatePlugin)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  newApp.component(key, component)
}

newApp.config.globalProperties.$router = router
newApp.provide('$router', newApp.config.globalProperties.$router)

// Object.keys(filters).forEach(key => {
//   newApp.filter(key, filters[key])
// })

// const req = require.context('./svg', false, /\.svg$/)
// const requireAll = requireContext => requireContext.keys().map(requireContext)
// requireAll(req)

newApp.mount('#app')

