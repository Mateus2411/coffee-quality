<script setup>
defineProps({
  coffees: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['ver-detalhes'])

function starsFor(nota) {
  const filled = Math.max(0, Math.min(5, Math.round((nota ?? 0) / 2)))
  return { filled, empty: 5 - filled }
}
</script>

<template>
  <div class="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-amber-50/60 border-b border-stone-200">
          <th class="text-left text-xs font-semibold text-stone-500 px-6 py-4">Posição</th>
          <th class="text-left text-xs font-semibold text-stone-500 px-4 py-4">Café</th>
          <th class="text-left text-xs font-semibold text-stone-500 px-4 py-4">Produtor</th>
          <th class="text-left text-xs font-semibold text-stone-500 px-4 py-4">
            Nota Final (Média SCA)
          </th>
          <th class="text-left text-xs font-semibold text-stone-500 px-6 py-4">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(coffee, index) in coffees"
          :key="coffee.id ?? index"
          class="border-b border-stone-100 last:border-0 transition-colors hover:bg-stone-50"
          :class="
            index === 0
              ? 'bg-yellow-100/80'
              : index === 1
                ? 'bg-slate-100/80'
                : index === 2
                  ? 'bg-amber-100/60'
                  : 'bg-white'
          "
        >
          <!-- Posição -->
          <td class="px-6 py-4">
            <span
              v-if="index < 3"
              class="inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm text-white"
              :class="
                index === 0 ? 'bg-amber-400' : index === 1 ? 'bg-stone-300' : 'bg-amber-700/80'
              "
            >
              {{ index + 1 }}
            </span>
            <span
              v-else
              class="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-stone-500"
            >
              {{ index + 1 }}
            </span>
          </td>

          <!-- Café -->
          <td class="px-4 py-4">
            <div class="flex items-center gap-3">
              <img
                v-if="coffee.imagem"
                :src="coffee.imagem"
                :alt="coffee.nome"
                class="w-10 h-10 rounded-full object-cover bg-stone-100"
              />
              <div
                v-else
                class="w-10 h-10 rounded-full bg-linear-to-br from-amber-100 to-amber-200 flex items-center justify-center text-amber-700 text-sm font-bold"
              >
                {{ coffee.nome?.charAt(0) }}
              </div>
              <span class="font-bold text-stone-900 text-sm">{{ coffee.nome }}</span>
            </div>
          </td>

          <!-- Produtor -->
          <td class="px-4 py-4 text-sm text-stone-500">{{ coffee.produtor }}</td>

          <!-- Nota -->
          <td class="px-4 py-4">
            <div class="flex items-center gap-3">
              <span class="text-lg font-black text-emerald-700">
                {{ coffee.pontuacaoTotal?.toFixed(1) ?? '—' }}
              </span>
              <span class="flex items-center gap-0.5">
                <svg
                  v-for="n in starsFor(coffee.pontuacaoTotal).filled"
                  :key="'f' + n"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 text-amber-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.9l-5.2 2.61.99-5.79-4.21-4.1 5.82-.85z"
                  />
                </svg>
                <svg
                  v-for="n in starsFor(coffee.pontuacaoTotal).empty"
                  :key="'e' + n"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 text-stone-200"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.9l-5.2 2.61.99-5.79-4.21-4.1 5.82-.85z"
                  />
                </svg>
              </span>
            </div>
          </td>

          <!-- Ações -->
          <td class="px-6 py-4">
            <button
              class="text-xs font-semibold text-stone-600 border border-stone-200 px-4 py-2 rounded-lg hover:bg-stone-50 hover:border-stone-300 transition-colors"
              @click="emit('ver-detalhes', coffee.id)"
            >
              Ver Detalhes
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
