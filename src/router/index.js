import { createRouter, createWebHistory } from 'vue-router'

import AvaliacoesApp from '@/views/AvaliacoesApp.vue'
import HomeApp from '@/views/HomeApp.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeApp,
  },
  {
    path: '/avaliacoes',
    name: 'avaliacoes',
    component: AvaliacoesApp,
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
