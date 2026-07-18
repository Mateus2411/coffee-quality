<script setup>
import { computed } from 'vue'
import { imagensCafes } from '@/utils/imagensCafes.js'

const props = defineProps({
  cafe: { type: Object, required: true },
  posicao: { type: Number, default: null },
})

const emit = defineEmits(['ver-detalhes'])

const imagem = computed(() => imagensCafes.find((i) => i.id === props.cafe.id)?.url || '')

function classificacao(pontuacao) {
  if (pontuacao >= 85) return { label: 'Excelente', cor: 'text-emerald-600 bg-emerald-50' }
  if (pontuacao >= 75) return { label: 'Muito Bom', cor: 'text-blue-600 bg-blue-50' }
  if (pontuacao >= 65) return { label: 'Bom', cor: 'text-amber-600 bg-amber-50' }
  return { label: 'Regular', cor: 'text-stone-500 bg-stone-100' }
}

const cls = computed(() => props.cafe.pontuacaoTotal > 0 ? classificacao(props.cafe.pontuacaoTotal) : null)

const badgeTop3 = computed(() => {
  if (!props.posicao || props.posicao > 3) return null
  const cores = ['bg-yellow-400 text-yellow-900', 'bg-stone-300 text-stone-800', 'bg-amber-600 text-white']
  return { cor: cores[props.posicao - 1], label: `#${props.posicao}` }
})
</script>

<template>
  <div
    class="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow"
  >
    <!-- Imagem -->
    <div class="aspect-[4/3] bg-stone-100 overflow-hidden">
      <img
        v-if="imagem"
        :src="imagem"
        :alt="cafe.nome"
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-stone-300 text-5xl">
        ☕
      </div>
    </div>

    <!-- Info -->
    <div class="p-4 flex flex-col gap-2 flex-1">
      <div class="flex items-start justify-between gap-2">
        <h3 class="text-base font-bold text-stone-800 leading-tight m-0">{{ cafe.nome }}</h3>
        <span
          v-if="badgeTop3"
          class="shrink-0 text-xs font-bold px-2 py-0.5 rounded-full"
          :class="badgeTop3.cor"
        >
          {{ badgeTop3.label }}
        </span>
      </div>

      <p class="text-sm text-stone-500 m-0">{{ cafe.produtor }}</p>

      <div v-if="cls" class="mt-auto pt-2 flex items-center justify-between gap-2">
        <span class="text-xs font-semibold px-2 py-0.5 rounded-full" :class="cls.cor">
          {{ cls.label }}
        </span>
        <span class="text-lg font-black text-stone-800">{{ cafe.pontuacaoTotal.toFixed(1) }}</span>
      </div>

      <div v-else class="mt-auto pt-2">
        <span class="text-xs text-stone-400">Sem avaliações</span>
      </div>

      <button
        class="mt-2 w-full text-sm font-semibold py-2 px-4 rounded-xl bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors border-none cursor-pointer"
        @click="emit('ver-detalhes', cafe.id)"
      >
        Ver Detalhes
      </button>
    </div>
  </div>
</template>
