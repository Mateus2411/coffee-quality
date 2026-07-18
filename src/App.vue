<script setup>
import { useRoute } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import { Toaster } from 'vue-sonner'

const route = useRoute()
</script>

<template>
  <Toaster
    position="top-right"
    rich-colors
    close-button
    :duration="3000"
  />
  <NavBar v-if="route.meta.showNavBar" />
  <router-view v-slot="{ Component }">
    <transition name="slide-up" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
.slide-up-enter-active {
  transition: all 0.3s ease-out;
}
.slide-up-leave-active {
  transition: all 0.15s ease-in;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(24px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
