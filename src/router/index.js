import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/FrontLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/HomeView.vue'),
          meta: { footerShow: true }
        },
        {
          path: 'about',
          component: () => import('@/views/AboutView.vue'),
          meta: { footerShow: true, logoShow: true }
        },
        {
          path: 'belief',
          component: () => import('@/views/BeliefView.vue'),
          meta: { footerShow: true, logoShow: true }
        },
        {
          path: 'video',
          name: 'video',
          component: () => import('@/views/VideoView.vue'),
          meta: { footerShow: true, logoShow: true }
        },
        {
          path: 'service',
          name: 'service',
          component: () => import('@/views/ServiceView.vue'),
          meta: { footerShow: true, logoShow: true }
        },
        {
          path: 'blog/:slug?',
          name: 'blog',
          component: () => import('@/views/BlogView.vue'),
          meta: { footerShow: true, logoShow: true }
        }
      ]
    }
  ],
  // 用 scrollBehavior 比較乾淨：同頁切 slug 不強制捲到頂
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    // 在 blog 裡面切到某篇，不強制滾動（交給元件自己做）
    if (to.name === 'blog' && to.params.slug) return false
    return { top: 0 }
  }
})

export default router
