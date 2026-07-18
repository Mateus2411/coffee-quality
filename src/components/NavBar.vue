<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const links = [
  {
    label: 'Home',
    to: '/',
    icon: 'home',
  },
  {
    label: 'Avaliações',
    to: '/avaliacoes',
    icon: 'avaliacoes',
  },
  {
    label: 'Ranking',
    to: '/ranking',
    icon: 'ranking',
  },
]
</script>

<template>
  <header class="bg-white border-b border-stone-200">
    <div class="max-w-410 mx-auto px-6 sm:px-8 py-4 flex items-center justify-between gap-6">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2.5 no-underline">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-8 h-8 text-amber-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 8h13v5a5 5 0 01-5 5H8a5 5 0 01-5-5V8z"
          />
          <path stroke-linecap="round" stroke-linejoin="round" d="M16 9h1.5a2.5 2.5 0 010 5H16" />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 4c0 1 1 1 1 2s-1 1-1 2m4-4c0 1 1 1 1 2s-1 1-1 2"
          />
        </svg>
        <span
          class="text-sm sm:text-base font-black text-stone-900 leading-tight uppercase tracking-tight"
        >
          Coffee Quality<br />Challenge
        </span>
      </router-link>

      <!-- Nav links -->
      <nav class="hidden sm:flex items-center gap-8">
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav-link flex items-center gap-2 text-sm font-medium transition-colors no-underline"
          :class="
            route.path === link.to
              ? 'text-amber-700 font-bold active'
              : 'text-stone-500 hover:text-stone-800'
          "
        >
          <!-- Home icon -->
          <svg
            v-if="link.icon === 'home'"
            xmlns="http://www.w3.org/2000/svg"
            class="w-4.5 h-4.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10"
            />
          </svg>
          <!-- Avaliações icon -->
          <svg
            v-if="link.icon === 'avaliacoes'"
            xmlns="http://www.w3.org/2000/svg"
            class="w-4.5 h-4.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 3.75h6a1 1 0 011 1V6h1.5A1.5 1.5 0 0119 7.5v11A1.5 1.5 0 0117.5 20h-11A1.5 1.5 0 015 18.5v-11A1.5 1.5 0 016.5 6H8V4.75a1 1 0 011-1z"
            />
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 11h6M9 14h6M9 17h4" />
          </svg>
          <!-- Ranking icon -->
          <svg
            v-if="link.icon === 'ranking'"
            xmlns="http://www.w3.org/2000/svg"
            class="w-4.5 h-4.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
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
          {{ link.label }}
        </router-link>
      </nav>

      <!-- Avatar -->
      <div
        class="w-9 h-9 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 shrink-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 12a5 5 0 100-10 5 5 0 000 10zM4 22a8 8 0 0116 0H4z" />
        </svg>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav-link {
  position: relative;
  padding-bottom: 4px;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #8b5a2b;
  transform: scaleX(0);
  transition: transform 0.3s ease;
  transform-origin: center;
}
.nav-link.active::after {
  transform: scaleX(1);
}
</style>
