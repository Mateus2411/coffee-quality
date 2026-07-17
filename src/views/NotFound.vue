<template>
  <section class="bg-[#f8f4f1] min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
    <div
      class="w-full max-w-6xl bg-white rounded-2xl sm:rounded-3xl border border-[#e7ddd4] shadow-[0_10px_35px_rgba(0,0,0,.08)] px-6 sm:px-12 md:px-16 py-10 sm:py-14"
    >
      <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        <!-- Left side -->
        <div class="flex flex-col items-center lg:items-start text-center lg:text-left flex-1">
          <h1
            class="text-6xl sm:text-7xl md:text-8xl lg:text-[8rem] leading-none font-extrabold text-[#8B5A2B]"
          >
            404
          </h1>

          <h2 class="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1f1f1f]">
            Café não encontrado
          </h2>

          <p
            class="mt-4 sm:mt-5 max-w-3xl text-base sm:text-lg md:text-xl lg:text-2xl text-[#555555] leading-relaxed"
          >
            Parece que você tentou acessar uma página que não existe no Campeonato Coffee Quality
            Challenge.
          </p>

          <div
            class="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5"
          >
            <router-link
              to="/"
              class="rounded-xl bg-[#8B5A2B] px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg md:text-xl font-medium text-white text-center transition hover:bg-[#73481f]"
            >
              Voltar ao Início
            </router-link>

            <router-link
              to="/ranking"
              class="rounded-xl bg-[#EEF0F4] px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg md:text-xl font-medium text-[#1f1f1f] text-center transition hover:bg-[#dfe3e8]"
            >
              Ver Ranking
            </router-link>
          </div>

          <p class="mt-8 sm:mt-10 text-sm sm:text-base md:text-lg text-[#8c8c8c]">
            Código do erro: Página não encontrada.
          </p>
        </div>

        <!-- Right side: image -->
        <div class="shrink-0">
          <img src="/coffee_logo.png" class="w-32 sm:w-40 md:w-52 lg:w-64" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
