import { createRouter, createWebHistory } from 'vue-router'
import HomeApp from '@/views/HomeApp.vue'
import NotFound from '@/views/NotFound.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => HomeApp,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
