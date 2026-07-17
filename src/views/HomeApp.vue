<script setup>
import { coffees } from '../stores/coffees.js'
import { avaliacoes } from '../stores/avaliacoes.js'

const totalCafesAvaliados = new Set(avaliacoes.map((a) => a.cafeId)).size

const melhorAvaliacao = avaliacoes.reduce((a, b) => (a.pontuacaoTotal > b.pontuacaoTotal ? a : b))
const melhor = {
  cafe: coffees.find((c) => c.id === melhorAvaliacao.cafeId),
  media: (melhorAvaliacao.pontuacaoTotal / 10).toFixed(1),
}

const ultimaAvaliacao = [...avaliacoes].sort((a, b) => new Date(b.data) - new Date(a.data))[0]
const ultima = {
  cafe: coffees.find((c) => c.id === ultimaAvaliacao.cafeId),
  nota: ultimaAvaliacao.pontuacaoTotal,
  data: new Date(ultimaAvaliacao.data).toLocaleDateString('pt-BR'),
}
</script>

<template>
  <section class="bg-[#F8F5F2] min-h-screen p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Hero -->
      <div class="bg-white border border-[#E8DDD2] rounded-2xl shadow-sm overflow-hidden">
        <div class="grid lg:grid-cols-2 items-center px-10 py-12">
          <!-- Imagem -->
          <div class="flex justify-center order-2 lg:order-1">
            <router-link to="/coffees">
              <img
                src="/coffee_cup.png"
                alt="Xícara de café"
                class="w-64 lg:w-80 hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
            </router-link>
          </div>

          <!-- Texto -->
          <div class="text-center order-1 lg:order-2">
            <h1 class="text-4xl lg:text-5xl font-bold text-[#1D1D1D] leading-tight">
              Campeonato de Avaliação
              <br />
              de Qualidade de Café
            </h1>

            <div class="w-16 h-1 bg-[#C7A47A] rounded-full mx-auto my-6"></div>

            <p class="text-xl text-[#555]">
              Avalie, compare e descubra os melhores
              <br />
              cafés especiais.
            </p>

            <router-link
              to="/coffees"
              class="mt-8 inline-block rounded-xl bg-[#8B5A2B] px-8 py-4 text-lg font-medium text-white transition hover:bg-[#73481f]"
            >
              Ver Cafés
            </router-link>
          </div>
        </div>
      </div>

      <!-- Cards -->

      <div class="grid lg:grid-cols-3 gap-6 mt-6">
        <!-- Total -->

        <div class="bg-white border border-[#E8DDD2] rounded-2xl shadow-sm p-8 text-center">
          <div class="w-24 h-24 mx-auto rounded-full bg-[#FBF2E7] flex items-center justify-center">
            <img src="/users.png" class="w-11" />
          </div>

          <h2 class="text-2xl font-medium mt-6">Total de Cafés Avaliados</h2>

          <p class="text-5xl font-bold text-[#5B2E11] mt-3">{{ totalCafesAvaliados }}</p>

          <span class="text-gray-500"> cafés </span>
        </div>

        <!-- Melhor Café -->

        <div class="bg-white border border-[#E8DDD2] rounded-2xl shadow-sm p-8 text-center">
          <div class="w-24 h-24 mx-auto rounded-full bg-[#EEF4E6] flex items-center justify-center">
            <img src="/trophy.png" class="w-11" />
          </div>

          <h2 class="text-2xl font-medium mt-6">Café com Maior Nota</h2>

          <p class="text-5xl font-bold text-[#3D6A23] mt-3">{{ melhor.media }}</p>

          <p class="text-2xl font-semibold mt-2">{{ melhor.cafe.nome }}</p>

          <span class="text-gray-500"> {{ melhor.cafe.produtor }} </span>
        </div>

        <!-- Última Avaliação -->

        <div class="bg-white border border-[#E8DDD2] rounded-2xl shadow-sm p-8 text-center">
          <div class="w-24 h-24 mx-auto rounded-full bg-[#EAF1FB] flex items-center justify-center">
            <img src="/clock.svg" class="w-11" />
          </div>

          <h2 class="text-2xl font-medium mt-6">Última Avaliação</h2>

          <p class="text-5xl font-bold text-[#23589B] mt-3">{{ ultima.nota }}</p>

          <p class="text-2xl font-semibold mt-2">{{ ultima.cafe.nome }}</p>

          <span class="text-gray-500"> {{ ultima.data }} </span>
        </div>
      </div>

      <!-- Botão -->

      <router-link
        to="/avaliacoes"
        class="mx-auto mt-8 flex items-center gap-3 bg-[#6F4323] hover:bg-[#5B3419] transition text-white font-semibold px-10 py-4 rounded-xl shadow-sm"
      >
        <img src="/checklist.svg" alt="Checklist" class="w-6 h-6" />

        <span>Ver Avaliações</span>
      </router-link>

      <!-- Banner -->

      <div
        class="mt-8 bg-white border border-[#E8DDD2] rounded-2xl shadow-sm p-8 flex flex-col lg:flex-row justify-between items-center gap-6"
      >
        <div>
          <h2 class="text-3xl font-semibold">Participe e faça a diferença!</h2>

          <p class="text-gray-600 mt-2 text-lg">
            Cada avaliação ajuda a reconhecer o trabalho dos produtores e a valorizar o café de
            qualidade.
          </p>
        </div>

        <img src="/farm.png" class="w-80" alt="Fazenda" />
      </div>
    </div>
  </section>
</template>
