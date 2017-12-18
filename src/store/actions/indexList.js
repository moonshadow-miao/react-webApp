import * as actions from '../actionsType'
import {Api_getBanner} from '../../services/api'
export function getBanner() {
  Api_getBanner().then(res=>{
    if(res) return { type:actions.GET_INDEX_BANNER, payload: res.imgUrl }
  }) ;
}
