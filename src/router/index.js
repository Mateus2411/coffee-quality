import { createRouter, createWebHistory } from 'vue-router'

import AvaliacoesApp from '@/views/AvaliacoesApp.vue'
import HomeApp from '@/views/HomeApp.vue'
import NotFound from '@/views/NotFound.vue'
import RankingPageApp from '@/views/RankingPageApp.vue'
import DetalhesBase from '@/views/DetalhesBase.vue'
import CatalogoCoffees from '@/views/CatalogoCoffees.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeApp,
    meta: { showNavBar: true },
  },
  {
    path: '/avaliacoes',
    name: 'avaliacoes',
    component: AvaliacoesApp,
    meta: { showNavBar: true },
  },
  {
    path: '/ranking',
    name: 'rankingPage',
    component: RankingPageApp,
    meta: { showNavBar: true },
  },
  {
    path: '/ranking/:id',
    name: 'detalhes',
    component: DetalhesBase,
    meta: { showNavBar: true },
  },
  {
  path: '/catalogo',
  name: 'catalogo',
  component: CatalogoCoffees,
  meta: {
    showNavBar: true,
  },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { showNavBar: false },
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
