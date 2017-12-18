import * as actions from '../actionsType'
import {Api_getBanner, Api_getPoster} from '../../services/api'

export function getBanner() {
  return (dispatch)=>{
    Api_getBanner().then(res=>{
      dispatch({ type:actions.GET_INDEX_BANNER, payload: res.imgUrl })
    }) ;
  }
}

export function getPoster() {
  return (dispatch)=>{
    Api_getPoster().then(res=>{
      dispatch({ type:actions.GET_INDEX_POSTER, payload: res.imgUrl })
    }) ;
  }
}
