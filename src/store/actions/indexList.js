import * as actions from '../actionsType'
import {Api_getBanner, Api_getPoster,Api_getCities} from '../../services/api'

// 获取首页banner图
export function getBanner() {
  return (dispatch)=>{
    Api_getBanner().then(res=>{
      dispatch({ type:actions.GET_INDEX_BANNER, payload: res.imgUrl })
    }) ;
  }
}

// 获取首页广告gif
export function getPoster() {
  return (dispatch)=>{
    Api_getPoster().then(res=>{
      dispatch({ type:actions.GET_INDEX_POSTER, payload: res.imgUrl })
    }) ;
  }
}

//

