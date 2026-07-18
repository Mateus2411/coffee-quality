<script setup>
import { ref, reactive, computed } from 'vue'
import CafeDropdown from '@/components/CafeDropdown.vue'

const props = defineProps({
  cafes: { type: Array, required: true },
})

const emit = defineEmits(['salvar'])

const form = reactive({
  cafeId: null,
  fragrance: 0,
  flavor: 0,
  aftertaste: 0,
  acidity: 0,
  body: 0,
  uniformity: 0,
  cleanCup: 0,
  sweetness: 0,
  balance: 0,
  overall: 0,
  comentario: '',
})

const campos = [
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

const pontuacaoTotal = computed(() => {
  return Object.values(form).reduce((s, v) => (typeof v === 'number' ? s + v : s), 0)
})

function clampNota(key) {
  form[key] = Math.min(10, Math.max(0, Number(form[key]) || 0))
}

function limpar() {
  for (const campo of campos) {
    form[campo.key] = 0
  }
  form.cafeId = null
  form.comentario = ''
}

function salvar() {
  if (!form.cafeId) return

  const notas = {}
  for (const campo of campos) {
    clampNota(campo.key)
    notas[campo.key] = form[campo.key]
  }

  emit('salvar', {
    cafeId: form.cafeId,
    notas,
    pontuacaoTotal: pontuacaoTotal.value,
    comentario: form.comentario,
  })

  limpar()
}
</script>

<template>
  <div class="bg-white border border-stone-200 rounded-2xl shadow-sm p-6">
    <h2 class="flex items-center gap-2 text-lg font-black text-stone-900 mb-6 m-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5 text-stone-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1.8"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 3.75h6a1 1 0 011 1V6h1.5A1.5 1.5 0 0119 7.5v11A1.5 1.5 0 0117.5 20h-11A1.5 1.5 0 015 18.5v-11A1.5 1.5 0 016.5 6H8V4.75a1 1 0 011-1z"
        />
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 11h6M9 14h6M9 17h4" />
      </svg>
      Nova Avaliação
    </h2>

    <div class="mb-6">
      <label class="block text-xs font-semibold text-stone-600 mb-1.5">
        Selecione o Café
      </label>
      <CafeDropdown v-model="form.cafeId" :cafes="cafes" />
    </div>

    <p class="text-xs font-semibold text-stone-600 mb-3">
      Critérios SCA (0 a 10)
    </p>
    <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
      <div v-for="campo in campos" :key="campo.key">
        <label class="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5">
          {{ campo.label }}
        </label>
        <input
          v-model.number="form[campo.key]"
          @change="clampNota(campo.key)"
          type="number"
          min="0"
          max="10"
          step="0.1"
          class="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400"
        />
      </div>
    </div>

    <div class="mb-6">
      <label class="block text-xs font-semibold text-stone-600 mb-1.5">Comentário</label>
      <textarea
        v-model="form.comentario"
        maxlength="300"
        rows="3"
        placeholder="Digite suas observações sobre o café..."
        class="w-full text-sm border border-stone-200 rounded-lg px-3.5 py-2.5 resize-none placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400"
      ></textarea>
      <p class="text-[11px] text-stone-400 text-right mt-1 m-0">{{ form.comentario.length }}/300</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <div class="bg-amber-50 border border-amber-100 rounded-xl px-5 py-4 text-center">
        <p class="text-xs text-stone-500 m-0 leading-snug">
          Pontuação Total (soma dos 10 critérios)
        </p>
        <p class="text-3xl font-black text-emerald-700 mt-1 m-0">
          {{ pontuacaoTotal.toFixed(1) }}
        </p>
      </div>
      <div class="flex items-start gap-2.5 text-xs text-stone-500 bg-stone-50 border border-stone-100 rounded-xl px-4 py-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 18h6M10 21h4M12 3a6 6 0 00-3 11.2c.4.3.6.8.6 1.3v.5h4.8v-.5c0-.5.2-1 .6-1.3A6 6 0 0012 3z"
          />
        </svg>
        <div>
          <p class="m-0">A pontuação total é a soma de todos os 10 critérios SCA.</p>
          <p class="m-0 mt-1 text-stone-400">
            Excelente (≥85) · Muito Bom (≥75) · Bom (≥65) · Regular (&lt;65)
          </p>
        </div>
      </div>
    </div>

    <div class="flex justify-end gap-3">
      <button
        type="button"
        @click="limpar"
        class="flex items-center gap-2 text-sm font-semibold text-stone-600 border border-stone-200 px-4 py-2.5 rounded-lg hover:bg-stone-50 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h5M20 20v-5h-5M4.6 15a8 8 0 0014.4-3M19.4 9A8 8 0 005 12" />
        </svg>
        Limpar
      </button>
      <button
        type="button"
        @click="salvar"
        :disabled="!form.cafeId"
        class="flex items-center gap-2 text-sm font-semibold text-white bg-amber-900 px-5 py-2.5 rounded-lg transition-colors"
        :class="form.cafeId ? 'hover:bg-amber-950' : 'opacity-50 cursor-not-allowed'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 4h11l3 3v13H5V4z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 4v5h8V4M8 13h8v7H8v-7z" />
        </svg>
        Salvar Avaliação
      </button>
    </div>
  </div>
</template>
