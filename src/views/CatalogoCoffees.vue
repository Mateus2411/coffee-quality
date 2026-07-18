<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { coffees } from '@/stores/coffees.js'
import CoffeeCard from '@/components/CoffeeCard.vue'

const router = useRouter()
const busca = ref('')
const filtroClassificacao = ref('')

const classificacoes = ['Todos', 'Excelente', 'Muito Bom', 'Bom', 'Regular']

function classificar(pontuacao) {
  if (pontuacao >= 85) return 'Excelente'
  if (pontuacao >= 75) return 'Muito Bom'
  if (pontuacao >= 65) return 'Bom'
  return 'Regular'
}

const cafesFiltrados = computed(() => {
  let lista = [...coffees]

  if (busca.value.trim()) {
    const termo = busca.value.toLowerCase().trim()
    lista = lista.filter((c) => c.nome.toLowerCase().includes(termo))
  }

  if (filtroClassificacao.value && filtroClassificacao.value !== 'Todos') {
    lista = lista.filter((c) => {
      if (c.pontuacaoTotal === 0) return false
      return classificar(c.pontuacaoTotal) === filtroClassificacao.value
    })
  }

  return lista
})

function abrirDetalhes(id) {
  router.push(`/ranking/${id}`)
}
</script>

<template>
  <div class="max-w-410 mx-auto px-6 sm:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-black text-stone-900 m-0">Catálogo de Cafés</h1>
      <p class="text-sm text-stone-500 mt-1 m-0">
        Explore todos os cafés cadastrados. {{ cafesFiltrados.length }} encontrados.
      </p>
    </div>

    <!-- Filtros -->
    <div class="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        v-model="busca"
        type="text"
        placeholder="Buscar por nome..."
        class="flex-1 px-4 py-2.5 border border-stone-300 rounded-xl text-sm outline-none focus:border-amber-600 transition-colors"
      />
      <select
        v-model="filtroClassificacao"
        class="px-4 py-2.5 border border-stone-300 rounded-xl text-sm outline-none focus:border-amber-600 transition-colors bg-white"
      >
        <option value="">Todas as classificações</option>
        <option v-for="c in classificacoes" :key="c" :value="c">{{ c }}</option>
      </select>
    </div>

    <!-- Grid -->
    <div
      v-if="cafesFiltrados.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
    >
      <CoffeeCard
        v-for="cafe in cafesFiltrados"
        :key="cafe.id"
        :cafe="cafe"
        @ver-detalhes="abrirDetalhes"
      />
    </div>

    <!-- Vazio -->
    <div
      v-else
      class="text-center py-20"
    >
      <div class="text-5xl mb-4">🔍</div>
      <h2 class="text-lg font-bold text-stone-700 m-0">Nenhum café encontrado</h2>
      <p class="text-sm text-stone-400 mt-1 m-0">
        Tente ajustar a busca ou o filtro.
      </p>
    </div>
  </div>
</template>
