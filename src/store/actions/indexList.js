import * as actions from '../actionsType'
import {Api_getIndexImg} from '../../services/api'

// 获取首页广告gif 和 首页banner图
export function getIndexImg() {
  return (dispatch)=>{
    Api_getIndexImg().then(res=>{
      dispatch({ type:actions.GET_INDEX_POSTER, payload: res.poster })
      dispatch({ type:actions.GET_INDEX_BANNER, payload: res.banner })
    }) ;
  }
}

// 存储首页滚动的位置
export function setIndexSite(site = 0) {
  return { type:actions.SET_INDEX_SITE, payload: site }
}

// 存储找房页滚动的位置
export function setFindSite(site = 0) {
  return { type:actions.SET_FIND_SITE, payload: site }
}


