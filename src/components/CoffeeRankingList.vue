<script setup>
const props = defineProps({
  coffees: {
    type: Array,
    required: true,
  },
})
if(props.coffees.length === 0) {
  console.warn('A lista de cafés está vazia.')
}
</script>

<template>
  <section>
    <div v-for="coffee in coffees" :key="coffee.id">
      <h2>{{ coffee.nome }}</h2>
      <p>Produtor: {{ coffee.produtor }}</p>
      <p>Avaliações: {{ coffee.avaliacoes }}</p>
      <p>Pontuação Total: {{ coffee.pontuacaoTotal.toFixed(2) }}</p>
    </div>
  </section>
</template>
