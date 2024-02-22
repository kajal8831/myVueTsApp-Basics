import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/first',
      name: 'first',
      component: () => import('../components/Login/FirstScreen.vue')
    },
    {
      path: '/last',
      name: 'last',
      component: () => import('../components/Login/LastScreen.vue')
    },
    {
      path: '/',
      name: 'login',
      component: () => import('../components/Login/LoginScreen.vue')
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('../components/Login/DemoScreen.vue')
    },
  ]
})

export default router
