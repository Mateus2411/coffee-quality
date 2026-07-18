<script setup>
import { ref } from 'vue'
import FooterInfo from '@/components/FooterInfo.vue'
import RatingForm from '@/components/RatingForm.vue'
import LeaderboardTable from '@/components/LeaderboardTable.vue'
import { avaliacoes } from '@/stores/avaliacoes.js'
import { addAvaliacao } from '@/utils/addAvaliacao.js'
import { rankingCoffees } from '@/utils/rankingCoffees'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

const router = useRouter()
const cafesLista = rankingCoffees()

function handleSalvar({ cafeId, notas, pontuacaoTotal, comentario }) {
  const nova = addAvaliacao(cafeId, notas, comentario)

  toast.success('Avaliação salva com sucesso!', {
    description: `Nota total: ${pontuacaoTotal.toFixed(1)} pts`,
  })
}

function handleDetalhes(id) {
  router.push(`/ranking/${id}`)
}
</script>

<template>
  <div class="min-h-screen bg-stone-50 font-sans">
    <div class="max-w-410 mx-auto px-4 sm:px-8 py-8">
      <!-- Title -->
      <div class="flex items-center gap-3 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-7 h-7 text-amber-800"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <ellipse cx="12" cy="12" rx="9" ry="7" transform="rotate(-40 12 12)" />
        </svg>
        <div>
          <h1 class="text-3xl font-black text-stone-900 leading-tight m-0">Avaliações de Cafés</h1>
          <p class="text-stone-500 text-sm mt-1 m-0">
            Avalie os cafés usando a metodologia SCA e veja o ranking parcial.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        <!-- Left: ranking parcial -->
        <div class="lg:col-span-2 flex flex-col gap-4 order-2 lg:order-1">
          <div class="bg-white border border-stone-200 rounded-2xl shadow-sm p-5">
            <h2 class="text-sm font-bold text-stone-700 mb-4 m-0">
              Ranking Parcial ({{ cafesLista.length }})
            </h2>
            <LeaderboardTable :coffees="cafesLista" @ver-detalhes="handleDetalhes" />
          </div>

          <div
            v-if="cafesLista.length === 0"
            class="bg-white border border-dashed border-stone-300 rounded-2xl px-6 py-10 flex flex-col items-center text-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-7 h-7 text-stone-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 8h13v5a5 5 0 01-5 5H8a5 5 0 01-5-5V8z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16 9h1.5a2.5 2.5 0 010 5H16"
              />
            </svg>
            <p class="text-sm text-stone-500 m-0">Nenhum café avaliado ainda.</p>
            <p class="text-sm text-stone-400 m-0">Adicione sua primeira avaliação ao lado.</p>
          </div>
        </div>

        <!-- Right: form -->
        <div class="lg:col-span-3 order-1 lg:order-2">
          <RatingForm :cafes="cafesLista" @salvar="handleSalvar" />
        </div>
      </div>

      <!-- Footer info -->
      <FooterInfo title="Metodologia SCA">
        <p class="text-sm text-stone-500 my-0.5 leading-relaxed">
          A Specialty Coffee Association define 10 critérios de avaliação sensorial, cada um de 0 a 10. A soma define a classificação final do café.
        </p>
      </FooterInfo>
    </div>
  </div>
</template>
