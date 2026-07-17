import { coffees } from '../stores/coffees.js'

export function setNotas(coffeeId, pontuacaoTotalAvaliado, notas) {
  const cafe = coffees.find((c) => c.id === coffeeId)
  if (!cafe) return

  // Média acumulada da pontuação total
  const somaTotalAnterior = cafe.pontuacaoTotal * cafe.avaliacoes
  cafe.avaliacoes++
  cafe.pontuacaoTotal = (somaTotalAnterior + pontuacaoTotalAvaliado) / cafe.avaliacoes

  // Média acumulada de cada atributo (fragrance, flavor, ...)
  // sei nem o que isso ↓ faz direito **revisar
  for (const atributo of Object.keys(notas)) {
    const somaAnterior = (cafe.notas[atributo] ?? 0) * (cafe.avaliacoes - 1)
    cafe.notas[atributo] = (somaAnterior + notas[atributo]) / cafe.avaliacoes
  }
}
