<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <footer
    class="mt-6 bg-amber-50/50 border border-amber-100 rounded-2xl px-6 py-5 flex items-center justify-between gap-6 overflow-hidden"
  >
    <div class="flex items-start gap-4 max-w-xl">
      <div
        class="w-20 h-20 rounded-full bg-white flex items-center justify-center text-amber-700 shrink-0 shadow-md"
      >
        <img
          src="/megafone.png"
          alt="Megafone"
          class="w-14 h-14"
          style="filter: sepia(1) saturate(4) hue-rotate(-15deg)"
        />
      </div>
      <div>
        <h3 class="text-base font-bold text-stone-800 m-0 mb-1">{{ title }}</h3>
        <slot />
      </div>
    </div>

    <!-- Imagem de campo -->
    <img
      src="/farm.png"
      alt="Fazenda de café"
      class="hidden md:block w-56 h-auto shrink-0 object-contain"
      style="
        transform: scaleX(-1);
        filter: grayscale(1) sepia(1) saturate(2) hue-rotate(-10deg) opacity(0.6);
      "
    />
  </footer>
</template>
