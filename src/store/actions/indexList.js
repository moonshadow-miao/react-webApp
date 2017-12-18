import * as actions from '../actionsType'
import {Api_getBanner} from '../../services/api'
function getBanner(param) {
  Api_getBanner
  return { type:actions.GET_INDEX_BANNER, param }
}



