<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import FooterInfo from '@/components/FooterInfo.vue'
import CafeDropdown from '@/components/CafeDropdown.vue'
import { avaliacoes } from '@/stores/avaliacoes.js'
import { addAvaliacao } from '@/utils/addAvaliacao.js'
import { toast } from 'vue-sonner'
import { rankingCoffees } from '@/utils/rankingCoffees'

const cafesLista = rankingCoffees()
const avaliacoesStore = avaliacoes

const formCardRef = ref(null)
const formHeight = ref(null)
let resizeObserver = null

onMounted(() => {
  if (formCardRef.value && 'ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(([entry]) => {
      formHeight.value = entry.contentRect.height
    })
    resizeObserver.observe(formCardRef.value)
  }
})

const form = reactive({
  cafeId: null,
  aroma: 0,
  sabor: 0,
  acidez: 0,
  corpo: 0,
  finalizacao: 0,
  observacoes: '',
})

const mediaCalculada = computed(() => {
  const soma = form.aroma + form.sabor + form.acidez + form.corpo + form.finalizacao
  return soma / 5
})

function getLastAvaliacao(cafeId) {
  const avals = avaliacoesStore.filter((a) => a.cafeId === cafeId)
  return avals.length > 0 ? avals[avals.length - 1] : null
}

function clampNota(campo) {
  form[campo] = Math.min(10, Math.max(0, Number(form[campo]) || 0))
}

function limparForm() {
  form.cafeId = null
  form.aroma = 0
  form.sabor = 0
  form.acidez = 0
  form.corpo = 0
  form.finalizacao = 0
  form.observacoes = ''
}

function salvarAvaliacao() {
  if (!form.cafeId) {
    toast.error('Selecione um café para avaliar.')
    return
  }

  // Garante que todas as notas estão dentro do limite
  const camposNota = ['aroma', 'sabor', 'acidez', 'corpo', 'finalizacao']
  for (const campo of camposNota) {
    clampNota(campo)
    if (form[campo] === 0) {
      toast.warning(`A nota de ${campo} está 0 — confirme se é isso mesmo.`)
    }
  }

  addAvaliacao(
    form.cafeId,
    {
      fragrance: form.aroma,
      flavor: form.sabor,
      aftertaste: form.finalizacao,
      acidity: form.acidez,
      body: form.corpo,
      uniformity: 10,
      cleanCup: 10,
      sweetness: 10,
      balance: form.sabor,
      overall: mediaCalculada.value,
    },
    form.observacoes,
  )

  toast.success('Avaliação salva com sucesso!', {
    description: `Nota total: ${(form.aroma + form.sabor + form.acidez + form.corpo + form.finalizacao).toFixed(1)} pts`,
  })

  limparForm()
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
            Veja os cafés já avaliados e adicione uma nova avaliação.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        <!-- Left: list -->
        <div class="lg:col-span-2 flex flex-col gap-4 order-2 lg:order-1">
          <div
            class="bg-white border border-stone-200 rounded-2xl shadow-sm p-5 flex flex-col min-h-0"
            :style="formHeight ? { maxHeight: formHeight + 49.6 + 'px' } : null"
          >
            <h2 class="text-sm font-bold text-stone-700 mb-4 m-0 shrink-0">
              Cafés Avaliados ({{ cafesLista.length }})
            </h2>

            <div class="flex flex-col gap-3 overflow-y-auto pr-1 min-h-0">
              <div
                v-for="coffee in cafesLista"
                :key="coffee.id"
                class="flex items-center gap-3 bg-stone-50/70 border border-stone-100 rounded-xl px-4 py-3"
              >
                <div
                  class="w-10 h-10 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 shrink-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1.8"
                  >
                    <ellipse cx="12" cy="12" rx="6" ry="8.5" />
                    <path stroke-linecap="round" d="M12 3.5v17" />
                  </svg>
                </div>
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-bold text-stone-900 m-0 truncate">{{ coffee.nome }}</p>
                  <p class="text-xs text-stone-500 m-0 truncate">Produtor: {{ coffee.produtor }}</p>
                  <p class="text-xs text-stone-400 m-0 truncate">
                    Avaliado em:
                    {{ getLastAvaliacao(coffee.id) ? getLastAvaliacao(coffee.id).data : 'Nenhuma' }}
                    avaliações
                  </p>
                </div>
                <div class="text-right shrink-0">
                  <p class="text-[11px] text-stone-400 m-0">Média SCA</p>
                  <p class="text-lg font-black text-emerald-700 m-0 leading-tight">
                    {{ coffee.pontuacaoTotal.toFixed(1) }}
                  </p>
                </div>
                <button
                  class="text-stone-400 hover:text-stone-600 p-1 shrink-0"
                  aria-label="Mais opções"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4.5 h-4.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="5" r="1.5" />
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="12" cy="19" r="1.5" />
                  </svg>
                </button>
              </div>
            </div>
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
        <div
          ref="formCardRef"
          class="lg:col-span-3 bg-white border border-stone-200 rounded-2xl shadow-sm p-6 order-1 lg:order-2"
        >
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
            <label class="block text-xs font-semibold text-stone-600 mb-1.5"
              >Selecione o Café</label
            >
            <CafeDropdown v-model="form.cafeId" :cafes="cafesLista" />
          </div>

          <p class="text-xs font-semibold text-stone-600 mb-3">Notas SCA (0 a 10)</p>
          <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
            <div
              v-for="field in [
                { key: 'aroma', label: 'Aroma' },
                { key: 'sabor', label: 'Sabor' },
                { key: 'acidez', label: 'Acidez' },
                { key: 'corpo', label: 'Corpo' },
                { key: 'finalizacao', label: 'Finalização' },
              ]"
              :key="field.key"
            >
              <label class="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5">{{
                field.label
              }}</label>
              <input
                v-model.number="form[field.key]"
                @change="clampNota(field.key)"
                type="number"
                min="0"
                max="10"
                step="0.1"
                class="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400"
              />
            </div>
          </div>

          <div class="mb-6">
            <label class="block text-xs font-semibold text-stone-600 mb-1.5">Observações</label>
            <textarea
              v-model="form.observacoes"
              maxlength="300"
              rows="3"
              placeholder="Digite suas observações sobre o café..."
              class="w-full text-sm border border-stone-200 rounded-lg px-3.5 py-2.5 resize-none placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400"
            ></textarea>
            <p class="text-[11px] text-stone-400 text-right mt-1 m-0">
              {{ form.observacoes.length }}/300
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div class="bg-amber-50 border border-amber-100 rounded-xl px-5 py-4 text-center">
              <p class="text-xs text-stone-500 m-0 leading-snug">
                Média SCA (calculada automaticamente)
              </p>
              <p class="text-3xl font-black text-emerald-700 mt-1 m-0">
                {{ mediaCalculada.toFixed(1) }}
              </p>
            </div>
            <div
              class="flex items-start gap-2.5 text-xs text-stone-500 bg-stone-50 border border-stone-100 rounded-xl px-4 py-4"
            >
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
                <p class="m-0">A média é calculada com base na soma das 5 notas dividida por 5.</p>
                <p class="m-0 mt-1 text-stone-400">
                  (Aroma + Sabor + Acidez + Corpo + Finalização) / 5
                </p>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-3">
            <button
              type="button"
              @click="limparForm"
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
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 4v5h5M20 20v-5h-5M4.6 15a8 8 0 0014.4-3M19.4 9A8 8 0 005 12"
                />
              </svg>
              Limpar
            </button>
            <button
              type="button"
              @click="salvarAvaliacao"
              class="flex items-center gap-2 text-sm font-semibold text-white bg-amber-900 px-5 py-2.5 rounded-lg hover:bg-amber-950 transition-colors"
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
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8 4v5h8V4M8 13h8v7H8v-7z"
                />
              </svg>
              Salvar Avaliação
            </button>
          </div>
        </div>
      </div>

      <!-- Footer info -->
      <FooterInfo title="Dicas de Avaliação">
        <ul class="text-sm text-stone-500 my-0.5 pl-4 space-y-0.5 list-disc">
          <li>Todas as notas devem estar entre 0 e 10.</li>
          <li>A média será atualizada automaticamente conforme você altera as notas.</li>
          <li>Após salvar, o café será adicionado à lista e ao ranking automaticamente.</li>
        </ul>
      </FooterInfo>
    </div>
  </div>
</template>
