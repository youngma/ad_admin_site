// import { Router } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { partnerStore } from '@/store/modules/admin/partnerStore.js'

/* Layout */
import Layout from '@/layout/index.vue'

/* Router Modules */
import componentsRouter from './components'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'ri:dashboard-fill', affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/page',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Permission',
  //   meta: {
  //     title: 'Permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page.vue'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'Page Permission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive.vue'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'Directive Permission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     },
  //     {
  //       path: 'role',
  //       component: () => import('@/views/permission/role.vue'),
  //       name: 'RolePermission',
  //       meta: {
  //         title: 'Role Permission',
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/icons/index.vue'),
  //       name: 'Icons',
  //       meta: { title: 'Icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },
  //
  // /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  {
    path: '/admin-management',
    component: Layout,
    // component: () => import('@/views/admin-management/AdvertiserManagement.vue'),
    meta: {
      title: '어드민 관리',
      icon: 'ri:admin-fill'
    },
    name: 'AdminManagement',
    redirect: '/admin-management/search',
    children: [
      {
        path: 'search',
        component: () => import('@/views/admin-management/AdminManagement.vue'),
        name: 'AdminSearch',
        meta: { title: '어드민 조회', icon: 'ri:menu-search-fill' }
      },
      {
        path: 'register',
        component: () => import('@/views/admin-management/AdminRegister.vue'),
        name: 'AdminRegister',
        meta: { title: '어드민 등록', icon: 'ri:add-box-fill' }
      }
    ]
  },
  {
    path: '/partner-management',
    component: Layout,
    // component: () => import('@/views/admin-management/AdvertiserManagement.vue'),
    meta: {
      title: '매체사 관리',
      icon: 'fluent:building-desktop-20-filled'
    },
    name: 'PartnerManagement',
    redirect: '/partner-management/search',
    children: [
      {
        path: 'search',
        component: () => import('@/views/partner-management/PartnerManagement.vue'),
        name: 'PartnerSearch',
        meta: { title: '매체사 조회', icon: 'ri:menu-search-fill' }
      },
      {
        path: 'register',
        component: () => import('@/views/partner-management/PartnerRegister.vue'),
        name: 'PartnerRegister',
        meta: { title: '매체사 등록', icon: 'ri:add-box-fill', params: { referrer: '/partner-management/search' }}
      },
      {
        path: 'detail',
        component: () => import('@/views/partner-management/PartnerDetail.vue'),
        name: 'PartnerDetail',
        meta: { title: '매체사 상세', icon: 'ri:database-fill' }
      }
    ]
  },
  {
    path: '/ad-group-management',
    component: Layout,
    // component: () => import('@/views/admin-management/AdvertiserManagement.vue'),
    meta: {
      title: '광고 지면 관리',
      icon: 'material-symbols:ad-group'
    },
    name: 'AdGroupManagement',
    redirect: '/ad-group-management/search',
    children: [
      {
        path: 'search',
        component: () => import('@/views/ad-group-management/AdGroupManagement.vue'),
        name: '' +
          'yar',
        meta: { title: '광고 지면 조회', icon: 'ri:menu-search-fill' }
      },
      {
        path: 'register',
        component: () => import('@/views/ad-group-management/AdGroupRegister.vue'),
        name: 'AdGroupRegister',
        meta: { title: '광고 지면 등록', icon: 'ri:add-box-fill', params: { init: true, referrer: '/ad-group-management/search' }},
        beforeEnter: (to, from, next) => {
          const { query } = to
          if (query.init !== 'false') {
            partnerStore().init()
          }
          next()
        }
      },
      {
        path: 'detail',
        component: () => import('@/views/ad-group-management/AdGroupDetail.vue'),
        name: 'AdGroupDetail',
        meta: { title: '광고 지면 상세', icon: 'cib:campaign-monitor', hidden: true },
        hidden: true
      },
      {
        path: 'mappingAds',
        component: () => import('@/views/ad-group-management/MappingAds.vue'),
        name: 'MappingAds',
        meta: { title: '지면 별 광고 맵핑', icon: 'cib:campaign-monitor', hidden: true },
        hidden: true
      }
    ]
  },
  {
    path: '/advertiser-management',
    component: Layout,
    // component: () => import('@/views/admin-management/AdvertiserManagement.vue'),
    meta: {
      title: '광고주 관리',
      icon: 'fa6-solid:building-circle-arrow-right'
    },
    name: 'AdvertiserManagement',
    redirect: '/advertiser-management/search',
    children: [
      {
        path: 'search',
        component: () => import('@/views/advertiser-management/AdvertiserManagement.vue'),
        name: 'AdvertiserSearch',
        meta: { title: '광고주 조회', icon: 'ri:menu-search-fill' }
      },
      {
        path: 'register',
        component: () => import('@/views/advertiser-management/AdvertiserRegister.vue'),
        name: 'AdvertiserRegister',
        meta: { title: '광고주 등록', icon: 'ri:add-box-fill' }
      },
      {
        path: 'detail',
        component: () => import('@/views/advertiser-management/AdvertiserDetail.vue'),
        name: 'AdvertiserDetail',
        meta: { title: '광고주 상세', icon: 'ri:database-fill', init: true }
      }
    ]
  },
  {
    path: '/campaign-management',
    component: Layout,
    // component: () => import('@/views/admin-management/AdvertiserManagement.vue'),
    meta: {
      title: '캠페인 관리',
      icon: 'bi:badge-ad-fill'
    },
    name: 'AdCampaignManagement',
    redirect: '/campaign-management/search',
    children: [
      {
        path: 'search',
        component: () => import('@/views/campaign-management/CampaignManagement.vue'),
        name: 'AdCampaignSearch',
        meta: { title: '캠페인 조회', icon: 'ri:menu-search-fill' }
      },
      {
        path: 'register',
        component: () => import('@/views/campaign-management/CampaignRegister.vue'),
        name: 'AdCampaignRegister',
        meta: { title: '캠페인 등록', icon: 'ri:add-box-fill', params: { init: true, referrer: '/campaign-management/search' }}
      },
      {
        path: 'detail',
        component: () => import('@/views/campaign-management/CampaignDetail.vue'),
        name: 'AdCampaignDetail',
        meta: { title: '캠페인 상세', icon: 'cib:campaign-monitor', hidden: true },
        hidden: true
      }
    ]
  },
  {
    path: '/report-quiz-management',
    component: Layout,
    // component: () => import('@/views/admin-management/AdvertiserManagement.vue'),
    meta: {
      title: '퀴즈 광고 리포트',
      icon: 'mdi:report-bar'
    },
    name: 'QuizReport',
    redirect: '/report-quiz-management/advertiser',
    children: [
      {
        path: 'admin',
        component: () => import('@/views/ad-report/quiz/AdminReport.vue'),
        name: 'QuizAdminReport',
        meta: { title: '자몽랩 리포트(요약)', icon: 'mdi:report-line-shimmer' }
      },
      {
        path: 'admin-detail',
        component: () => import('@/views/ad-report/quiz/AdminDetailReport.vue'),
        name: 'QuizXCodeReport',
        meta: { title: '자몽랩 리포트(상세)', icon: 'mdi:report-line-shimmer' }
      },
      {
        path: 'advertiser',
        component: () => import('@/views/ad-report/quiz/AdvertiserReport.vue'),
        name: 'QuizAdvertiserReport',
        meta: { title: '광고주 리포트', icon: 'mdi:report-line-shimmer' }
      },
      {
        path: 'partner',
        component: () => import('@/views/ad-report/quiz/PartnerReport.vue'),
        name: 'QuizPartnerReport',
        meta: { title: '매체사 리포트', icon: 'mdi:report-bell-curve-cumulative' }
      },
      {
        path: 'user',
        component: () => import('@/views/ad-report/quiz/UserReport.vue'),
        name: 'QuizUserReport',
        meta: { title: '광고 참여 이력 조회', icon: 'mdi:report-bell-curve-cumulative' }
      }
    ]
  },
  {
    path: '/inquiry-management',
    component: Layout,
    // component: () => import('@/views/admin-management/AdvertiserManagement.vue'),
    meta: {
      title: '문의 하기',
      icon: 'mdi:report-bar'
    },
    name: 'InquiryManagement',
    redirect: '/inquiry-management/search',
    children: [
      {
        path: 'search',
        component: () => import('@/views/inquiry-management/AdInquiryManagement.vue'),
        name: 'AdInquiryManagement',
        meta: { title: '문의 하기', icon: 'simple-icons:askubuntu' }
      }
    ]
  },
  //
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'Example',
  //     icon: 'el-icon-s-help'
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/example/create.vue'),
  //       name: 'CreateArticle',
  //       meta: { title: 'Create Article', icon: 'edit' }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit.vue'),
  //       name: 'EditArticle',
  //       meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list.vue'),
  //       name: 'ArticleList',
  //       meta: { title: 'Article List', icon: 'list' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index.vue'),
  //       name: 'Tab',
  //       meta: { title: 'Tab', icon: 'tab' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'Error Pages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/error-page/401.vue'),
  //       name: 'Page401',
  //       meta: { title: '401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/error-page/404.vue'),
  //       name: 'Page404',
  //       meta: { title: '404', noCache: true }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/error-log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/error-log/index.vue'),
  //       name: 'ErrorLog',
  //       meta: { title: 'Error Log', icon: 'bug' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'Excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/export-excel.vue'),
  //       name: 'ExportExcel',
  //       meta: { title: 'Export Excel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/select-excel.vue'),
  //       name: 'SelectExcel',
  //       meta: { title: 'Export Selected' }
  //     },
  //     {
  //       path: 'export-merge-header',
  //       component: () => import('@/views/excel/merge-header.vue'),
  //       name: 'MergeHeader',
  //       meta: { title: 'Merge Header' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/upload-excel.vue'),
  //       name: 'UploadExcel',
  //       meta: { title: 'Upload Excel' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   name: 'Zip',
  //   meta: { title: 'Zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/zip/index.vue'),
  //       name: 'ExportZip',
  //       meta: { title: 'Export Zip' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/pdf',
  //   component: Layout,
  //   redirect: '/pdf/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/pdf/index.vue'),
  //       name: 'PDF',
  //       meta: { title: 'PDF', icon: 'pdf' }
  //     }
  //   ]
  // },
  // {
  //   path: '/pdf/download',
  //   component: () => import('@/views/pdf/download.vue'),
  //   hidden: true
  // },
  //
  // {
  //   path: '/theme',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index.vue'),
  //       name: 'Theme',
  //       meta: { title: 'Theme', icon: 'theme' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index.vue'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'Clipboard', icon: 'clipboard' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true }
]

const currentRouter = () => createRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  history: createWebHistory(),
  routes: constantRoutes
})

const router = currentRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = currentRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
