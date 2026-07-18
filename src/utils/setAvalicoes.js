import { coffees } from '../stores/coffees.js'
import { avaliacoes } from '../stores/avaliacoes.js'
import { setNotas } from './setNotas.js'

// Recalcula as médias de todos os cafés do zero (seguro chamar N vezes)
function setAvaliacoes() {
  // Reseta todos os cafés
  for (const cafe of coffees) {
    cafe.avaliacoes = 0
    cafe.pontuacaoTotal = 0
    cafe.notas = {}
  }
  // Reaplica todas as avaliações do zero
  for (const avaliacao of avaliacoes) {
    setNotas(avaliacao.cafeId, avaliacao.pontuacaoTotal, avaliacao.notas)
  }
}
export { setAvaliacoes }
