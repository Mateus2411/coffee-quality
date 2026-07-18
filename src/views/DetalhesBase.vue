<script setup>
import { useRoute, useRouter } from 'vue-router'
import { coffees } from '../stores/coffees.js'
import { avaliacoes } from '../stores/avaliacoes.js'
import FooterInfo from '@/components/FooterInfo.vue'

const route = useRoute()
const router = useRouter()

const coffee = coffees.find((c) => c.id === Number(route.params.id))

if (!coffee) {
  router.replace('/ranking')
}

const avaliacoesDoCafe = avaliacoes.filter((a) => a.cafeId === coffee?.id)

const criterios = [
  { key: 'fragrance', label: 'Fragrância / Aroma' },
  { key: 'flavor', label: 'Sabor' },
  { key: 'aftertaste', label: 'Finalização' },
  { key: 'acidity', label: 'Acidez' },
  { key: 'body', label: 'Corpo' },
  { key: 'uniformity', label: 'Uniformidade' },
  { key: 'cleanCup', label: 'Xícara Limpa' },
  { key: 'sweetness', label: 'Doçura' },
  { key: 'balance', label: 'Equilíbrio' },
  { key: 'overall', label: 'Global' },
]

function notaMedia(cafeId, criterio) {
  const notas = avaliacoesDoCafe.map((a) => a.notas[criterio]).filter(Boolean)
  if (notas.length === 0) return '—'
  return (notas.reduce((s, n) => s + n, 0) / notas.length).toFixed(1)
}
</script>

<template>
  <div v-if="coffee" class="min-h-screen bg-stone-50 font-sans">
    <div class="max-w-410 mx-auto px-4 sm:px-8 py-8">
      <!-- Header -->
      <div class="flex items-center gap-4 mb-8">
        <button
          class="flex items-center gap-1 text-sm font-semibold text-stone-500 hover:text-stone-800 transition-colors"
          @click="router.push('/ranking')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </button>
      </div>

      <!-- Coffee Banner -->
      <div class="bg-white border border-stone-200 rounded-2xl shadow-sm p-8 mb-6">
        <div class="flex flex-col sm:flex-row items-start gap-6">
          <div
            class="w-20 h-20 rounded-full bg-linear-to-br from-amber-100 to-amber-200 flex items-center justify-center text-amber-700 text-2xl font-bold shrink-0"
          >
            {{ coffee.nome?.charAt(0) }}
          </div>
          <div class="flex-1">
            <h1 class="text-3xl font-black text-stone-900 m-0">{{ coffee.nome }}</h1>
            <p class="text-stone-500 mt-1">{{ coffee.produtor }}</p>
            <div class="flex items-center gap-4 mt-3">
              <div class="flex items-center gap-2">
                <span class="text-3xl font-black text-emerald-700">{{
                  coffee.pontuacaoTotal?.toFixed(1) ?? '—'
                }}</span>
                <span class="text-sm text-stone-400">/ 100</span>
              </div>
              <span
                class="px-3 py-1 rounded-full text-xs font-bold"
                :class="
                  coffee.pontuacaoTotal >= 85
                    ? 'bg-emerald-100 text-emerald-800'
                    : coffee.pontuacaoTotal >= 75
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-stone-100 text-stone-600'
                "
              >
                {{
                  coffee.pontuacaoTotal >= 85
                    ? 'Excelente'
                    : coffee.pontuacaoTotal >= 75
                      ? 'Muito Bom'
                      : 'Regular'
                }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Médias por Critério -->
      <div class="bg-white border border-stone-200 rounded-2xl shadow-sm p-8 mb-6">
        <h2 class="text-lg font-bold text-stone-800 m-0 mb-6">Médias dos Critérios SCA</h2>
        <div class="grid sm:grid-cols-2 gap-4">
          <div
            v-for="criterio in criterios"
            :key="criterio.key"
            class="flex items-center justify-between px-4 py-3 bg-stone-50 rounded-xl"
          >
            <span class="text-sm font-medium text-stone-600">{{ criterio.label }}</span>
            <span class="text-lg font-bold text-stone-900">{{
              notaMedia(coffee.id, criterio.key)
            }}</span>
          </div>
        </div>
      </div>

      <!-- Avaliações -->
      <div class="bg-white border border-stone-200 rounded-2xl shadow-sm p-8 mb-6">
        <h2 class="text-lg font-bold text-stone-800 m-0 mb-6">
          Avaliações ({{ avaliacoesDoCafe.length }})
        </h2>
        <div v-if="avaliacoesDoCafe.length === 0" class="text-stone-400 text-sm text-center py-8">
          Nenhuma avaliação disponível para este café.
        </div>
        <div
          v-for="av in avaliacoesDoCafe"
          :key="av.id"
          class="border-b border-stone-100 last:border-0 pb-4 mb-4 last:mb-0 last:pb-0"
        >
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-semibold text-stone-400">
              {{ new Date(av.data).toLocaleDateString('pt-BR') }} · Avaliador #{{ av.userId }}
            </span>
            <div class="flex items-center gap-2">
              <span class="font-black text-emerald-700">{{ av.pontuacaoTotal }}</span>
              <span
                class="px-2 py-0.5 rounded-full text-xs font-bold"
                :class="
                  av.pontuacaoTotal >= 85
                    ? 'bg-emerald-100 text-emerald-800'
                    : av.pontuacaoTotal >= 75
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-stone-100 text-stone-600'
                "
              >
                {{ av.classificacao }}
              </span>
            </div>
          </div>
          <div v-if="av.comentario" class="text-sm text-stone-500 italic mb-3">
            "{{ av.comentario }}"
          </div>
          <div class="grid grid-cols-5 sm:grid-cols-10 gap-2">
            <div v-for="c in criterios" :key="c.key" class="flex flex-col items-center">
              <span class="text-[10px] text-stone-400 mb-1">{{
                c.key.charAt(0).toUpperCase()
              }}</span>
              <span class="text-xs font-bold text-stone-700">{{ av.notas[c.key] ?? '—' }}</span>
            </div>
          </div>
        </div>
      </div>

      <FooterInfo title="Metodologia SCA">
        <p class="text-sm text-stone-500 my-0.5 leading-relaxed">
          A pontuação SCA avalia 10 critérios, cada um de 0 a 10. A nota final é a soma total.
        </p>
      </FooterInfo>
    </div>
  </div>
</template>
