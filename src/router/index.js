import { createRouter, createWebHistory } from 'vue-router'
import HomeApp from '@/views/HomeApp.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
    path: '/',
    name: 'home',
    component: () => HomeApp,
    meta: {
    // hideHeader: true,
    // hideFooter: true,
    // requiresAuth: true,
    },
    },
  ],
})

export default router
