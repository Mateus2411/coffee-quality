import { coffees } from '../stores/coffees.js'
import { setAvaliacoes } from './setAvalicoes.js'

export function rankingCoffees() {
  setAvaliacoes()
  // Ordena os cafés com base na pontuação total em ordem decrescente
  const sortedCoffees = [...coffees].sort((a, b) => b.pontuacaoTotal - a.pontuacaoTotal)

  // Retorna os cafés ordenados
  return sortedCoffees
}
