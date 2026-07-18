import { coffees } from '../stores/coffees.js'
import { setAvaliacoes } from './setAvalicoes.js'

let initialized = false

export function rankingCoffees() {
  if (!initialized) {
    setAvaliacoes()
    initialized = true
  }
  // Ordena os cafés com base na pontuação total em ordem decrescente
  const sortedCoffees = [...coffees].sort((a, b) => b.pontuacaoTotal - a.pontuacaoTotal)
  return sortedCoffees
}
