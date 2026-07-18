<script setup>
import { ref } from 'vue'
import FooterInfo from '@/components/FooterInfo.vue'
import RatingForm from '@/components/RatingForm.vue'
import LeaderboardTable from '@/components/LeaderboardTable.vue'
import { avaliacoes } from '@/stores/avaliacoes.js'
import { coffees } from '@/stores/coffees.js'
import { addAvaliacao } from '@/utils/addAvaliacao.js'
import { rankingCoffees } from '@/utils/rankingCoffees'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

const router = useRouter()
const cafesLista = rankingCoffees()

function handleSalvar({ cafeId, notas, pontuacaoTotal, comentario }) {
  addAvaliacao(cafeId, notas, comentario)

  toast.success('Avaliação salva com sucesso!', {
    description: `Nota total: ${pontuacaoTotal.toFixed(1)} pts`,
  })
}

function handleDetalhes(id) {
  router.push(`/ranking/${id}`)
}

function getCafeNome(cafeId) {
  return coffees.find((c) => c.id === cafeId)?.nome ?? '—'
}

function getClassificacaoCor(cls) {
  if (cls === 'Excelente') return 'bg-emerald-100 text-emerald-800'
  if (cls === 'Muito Bom') return 'bg-amber-100 text-amber-800'
  if (cls === 'Bom') return 'bg-blue-100 text-blue-800'
  return 'bg-stone-100 text-stone-600'
}

// Ordena avaliações da mais recente pra mais antiga
const avaliacoesOrdenadas = [...avaliacoes].sort((a, b) => new Date(b.data) - new Date(a.data))
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
            Avalie os cafés usando a metodologia SCA e confira o histórico.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        <!-- Left: listagem + ranking -->
        <div class="lg:col-span-2 flex flex-col gap-4 order-2 lg:order-1">
          <!-- Ranking parcial -->
          <div class="bg-white border border-stone-200 rounded-2xl shadow-sm p-5">
            <h2 class="text-sm font-bold text-stone-700 mb-4 m-0">
              Ranking Parcial ({{ cafesLista.length }})
            </h2>
            <LeaderboardTable :coffees="cafesLista" @ver-detalhes="handleDetalhes" />
          </div>

          <!-- Listagem de avaliações -->
          <div class="bg-white border border-stone-200 rounded-2xl shadow-sm p-5">
            <h2 class="text-sm font-bold text-stone-700 mb-4 m-0">
              Histórico de Avaliações ({{ avaliacoesOrdenadas.length }})
            </h2>
            <div v-if="avaliacoesOrdenadas.length === 0" class="text-center py-8 text-stone-400 text-sm">
              Nenhuma avaliação registrada ainda.
            </div>
            <div class="flex flex-col gap-3 overflow-y-auto max-h-96 pr-1">
              <div
                v-for="av in avaliacoesOrdenadas"
                :key="av.id"
                class="bg-stone-50/70 border border-stone-100 rounded-xl px-4 py-3"
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-bold text-stone-900">
                    {{ getCafeNome(av.cafeId) }}
                  </span>
                  <span
                    class="text-[11px] font-bold px-2 py-0.5 rounded-full"
                    :class="getClassificacaoCor(av.classificacao)"
                  >
                    {{ av.classificacao }}
                  </span>
                </div>
                <div class="flex items-center justify-between text-xs text-stone-400">
                  <span>Nota: <strong class="text-emerald-700">{{ av.pontuacaoTotal }}</strong></span>
                  <span>{{ av.data }} · Avaliador #{{ av.userId }}</span>
                </div>
                <p v-if="av.comentario" class="text-xs text-stone-500 italic mt-1.5 m-0 leading-relaxed">
                  "{{ av.comentario }}"
                </p>
              </div>
            </div>
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
          A Specialty Coffee Association define 10 critérios de avaliação sensorial, cada um de 0 a 10.
          A soma total (máx. 100) define a classificação final do café.
        </p>
      </FooterInfo>
    </div>
  </div>
</template>
