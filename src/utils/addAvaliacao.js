import { avaliacoes } from '../stores/avaliacoes.js'
import { usersMoked } from '../stores/usersMoked.js'
import { setNotas } from './setNotas.js'

function classificar(pontuacao) {
  if (pontuacao >= 85) return 'Excelente'
  if (pontuacao >= 75) return 'Muito Bom'
  if (pontuacao >= 65) return 'Bom'
  return 'Regular'
}

function proximoId() {
  return Math.max(...avaliacoes.map((a) => a.id), 0) + 1
}

/**
 * Adiciona uma nova avaliação ao array `avaliacoes` e atualiza as médias do café.
 *
 * @param {number} cafeId - ID do café avaliado
 * @param {{ fragrance: number, flavor: number, aftertaste: number, acidity: number, body: number, uniformity: number, cleanCup: number, sweetness: number, balance: number, overall: number }} notas - Notas SCA (0-10)
 * @param {string} [comentario] - Comentário opcional
 * @returns {object} A avaliação recém-criada
 */
export function addAvaliacao(cafeId, notas, comentario = '') {
  const pontuacaoTotal = Object.values(notas).reduce((s, n) => s + n, 0)
  const userId = usersMoked[Math.floor(Math.random() * usersMoked.length)].id

  const nova = {
    id: proximoId(),
    cafeId,
    userId,
    data: new Date().toISOString().split('T')[0],
    notas,
    pontuacaoTotal,
    classificacao: classificar(pontuacaoTotal),
    comentario,
  }

  avaliacoes.push(nova)
  setNotas(cafeId, pontuacaoTotal, notas)

  return nova
}
