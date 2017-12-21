import * as actions from '../actionsType'
import {Api_getCities} from "../../services/api";
import {setSession} from '../../utils/index'

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
      setSession('cities',res.cities);
      dispatch({ type:actions.STORE_INDEX_CITIES, payload: res.cities});
      dispatch(storeCity(res.cities[0]));
    });
  }
}

// 存储当前选择的城市
export function storeCity(city) {
  setSession('currentCity',city);
  return  { type:actions.STORE_CURRENT_CITY,payload:city}
}

// 存储当前搜索历史
export function storeSearchList(item) {
  return  { type:actions.STORE_SEARCH_LIST,payload:item}
}

// 清空当前搜索历史
export function clearSearchList(list) {
  return  { type:actions.CLEAR_SEARCH_LIST}
}