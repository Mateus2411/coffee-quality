<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: { type: [Number, String, null], default: null },
  cafes: { type: Array, required: true },
})

const emit = defineEmits(['update:modelValue'])

const dropdownOpen = ref(false)
const dropdownRef = ref(null)

const cafeSelecionado = computed(() => props.cafes.find((c) => c.id === props.modelValue) || null)

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

function selecionarCafe(id) {
  emit('update:modelValue', id)
  dropdownOpen.value = false
}

function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    dropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<template>
  <div ref="dropdownRef" class="relative">
    <button
      type="button"
      @click="toggleDropdown"
      class="w-full flex items-center gap-3 text-sm border rounded-xl px-4 py-3 bg-white text-left transition-all focus:outline-none focus:ring-2 focus:ring-amber-200"
      :class="
        dropdownOpen
          ? 'border-amber-400 ring-2 ring-amber-200 shadow-sm'
          : 'border-stone-200 hover:border-stone-300 hover:shadow-sm'
      "
    >
      <span
        class="w-7 h-7 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 shrink-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.8"
        >
          <ellipse cx="12" cy="12" rx="6" ry="8.5" />
          <path stroke-linecap="round" d="M12 3.5v17" />
        </svg>
      </span>
      <span
        class="flex-1 min-w-0 truncate"
        :class="cafeSelecionado ? 'text-stone-800 font-medium' : 'text-stone-400'"
      >
        {{
          cafeSelecionado
            ? `${cafeSelecionado.nome} — ${cafeSelecionado.produtor}`
            : '— Escolha um café —'
        }}
      </span>
      <svg
        class="w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200"
        :class="dropdownOpen ? 'rotate-180' : ''"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <transition
      enter-active-class="transition ease-out duration-150"
      enter-from-class="opacity-0 -translate-y-1 scale-[0.98]"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-1 scale-[0.98]"
    >
      <div
        v-if="dropdownOpen"
        class="absolute z-20 mt-2 w-full bg-white border border-stone-200 rounded-xl shadow-lg shadow-stone-900/10 overflow-hidden origin-top"
      >
        <div class="max-h-64 overflow-y-auto py-1.5">
          <button
            v-for="cafe in props.cafes"
            :key="cafe.id"
            type="button"
            @click="selecionarCafe(cafe.id)"
            class="w-full flex items-center gap-3 px-3.5 py-2.5 text-sm text-left transition-colors"
            :class="
              modelValue === cafe.id
                ? 'bg-amber-50 text-stone-900'
                : 'text-stone-600 hover:bg-stone-50'
            "
          >
            <span
              class="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <ellipse cx="12" cy="12" rx="6" ry="8.5" />
                <path stroke-linecap="round" d="M12 3.5v17" />
              </svg>
            </span>
            <span class="min-w-0 flex-1">
              <span class="block font-semibold truncate">{{ cafe.nome }}</span>
              <span class="block text-xs text-stone-400 truncate">{{ cafe.produtor }}</span>
            </span>
            <svg
              v-if="modelValue === cafe.id"
              class="w-4 h-4 text-amber-600 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </button>

          <p v-if="props.cafes.length === 0" class="px-3.5 py-3 text-sm text-stone-400 text-center">
            Nenhum café disponível.
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>
