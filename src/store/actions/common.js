import * as actions from '../actionsType'
import {Api_getCities} from "../../services/api";

// 开启loading
export function loading() {
  return { type:actions.OPEN_LOADING }
}

// 关闭loading
export function loaded() {
  return  { type:actions.CLOSE_LOADING}
}

// 存储首页城市列表
export function storeCities() {
  return (dispatch)=>{
    Api_getCities().then(res=>{
      dispatch({ type:actions.STORE_INDEX_CITIES, payload: res.cities});
      dispatch(storeCityId(res.cities[0].city_id));
    });
  }
}

// 存储当前选择的城市
export function storeCityId(id) {
  return  { type:actions.STORE_CURRENT_CITY,payload:id}
}

// 存储当前搜索历史
export function storeSearchList(list) {
  return  { type:actions.STORE_SEARCH_LIST,payload:list}
}

