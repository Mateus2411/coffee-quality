import {avaliacoes} from '../stores/avaliacoes.js'
import { setNotas } from './setNotas.js'

// set avaliações
function setAvaliacoes() {
  for(let avaliacao of avaliacoes){
    setNotas(avaliacao.cafeId, avaliacao.pontuacaoTotal, avaliacao.notas)
  }
}
export { setAvaliacoes }
