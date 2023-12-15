import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const router = createRouter({
  // history: createWebHashHistory(),
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/frontend/FrontLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/frontend/HomeView.vue'),
          meta: {
            footerShow: true,
            // logoShow: true
          }
        }
      ]
    },
    {
      path: '/',
      component: () => import('@/views/frontend/FrontLayout.vue'),
      children: [
        {
          path: 'about',
          component: () => import('@/views/frontend/AboutView.vue'),
          meta: {
            footerShow: true,
            logoShow: true
          }
        },
        {
          path: 'video',
          name: 'video',
          component: () => import('@/views/frontend/VideoView.vue'),
          meta: {
            footerShow: true,
            logoShow: true
          }
        },
        {
          path: 'resource',
          name: 'resource',
          component: () => import('@/views/frontend/ResourceView.vue'),
          meta: {
            footerShow: true,
            logoShow: true
          }
        },
        {
          path: 'donate',
          name: 'donate',
          component: () => import('@/views/frontend/DonateView.vue'),
          meta: {
            footerShow: true,
            logoShow: true
          }
        },
        {
          path: 'question',
          name: 'question',
          component: () => import('@/views/frontend/QAview.vue'),
          meta: {
            footerShow: true,
            logoShow: true
          }
        }
      ]
    },
    {
      path: '/admin',
      component: () => import('@/views/admin/AdminLayout.vue'),
      children: [
        {
          path: 'video',
          component: () => import('@/views/admin/VideoManage.vue')
        },
        {
          path: 'videotype',
          component: () => import('@/views/admin/VideoType.vue')
        },
        {
          path: 'receipt',
          component: () => import('@/views/admin/DonateReceipt.vue')
        },
        {
          path: 'question',
          component: () => import('@/views/admin/QAlist.vue')
        },
        {
          path: 'file',
          component: () => import('@/views/admin/FileManage.vue')
        },
        {
          path: 'filetype',
          component: () => import('@/views/admin/FileType.vue')
        }
      ]
    },{
      path: '/login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: "404",
      component: () => import('@/views/404.vue'),
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.documentElement.scrollTop = 0
  next()
})

export default router
