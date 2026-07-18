<script setup>
import { rankingCoffees } from '@/utils/rankingCoffees'
import { useRouter } from 'vue-router'
import FooterInfo from '@/components/FooterInfo.vue'
import LeaderboardTable from '@/components/LeaderboardTable.vue'

const router = useRouter()
const coffees = rankingCoffees()
const totalCoffees = coffees.length

function handleDetalhes(id) {
  router.push(`/ranking/${id}`)
}
</script>

<template>
  <div class="min-h-screen bg-stone-50 font-sans">
    <div class="max-w-410 mx-auto px-4 sm:px-8 py-8">
      <!-- Title row -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div class="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-12 h-12 text-amber-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 21h8M12 17v4M7 4h10v4a5 5 0 01-10 0V4z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7 5H4v1a3 3 0 003 3M17 5h3v1a3 3 0 01-3 3"
            />
          </svg>
          <div>
            <h1 class="text-3xl font-black text-stone-900 leading-tight m-0">Ranking Geral</h1>
            <p class="text-stone-500 text-sm mt-1 m-0">
              Classificação dos melhores cafés do campeonato.
            </p>
          </div>
        </div>

        <div
          class="bg-white border border-stone-200 rounded-2xl px-5 py-3 shadow-sm flex items-center gap-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-amber-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 20V10m6 10V4m6 16v-7" />
          </svg>
          <div>
            <p class="text-xs text-stone-500 m-0">Total de Cafés Avaliados</p>
            <p class="text-2xl font-black text-stone-900 m-0 leading-tight">{{ totalCoffees }}</p>
          </div>
        </div>
      </div>

      <!-- Leaderboard -->
      <LeaderboardTable :coffees="coffees" @ver-detalhes="handleDetalhes" />

      <!-- Footer info -->
      <FooterInfo title="Como funciona a pontuação?">
        <p class="text-sm text-stone-500 my-0.5 leading-relaxed">
          As notas são baseadas na metodologia SCA (Specialty Coffee Association).
        </p>
        <p class="text-sm text-stone-500 my-0.5 leading-relaxed">
          Cada critério recebe uma nota de 0 a 10 e a média final determina a classificação.
        </p>
      </FooterInfo>
    </div>
  </div>
</template>
