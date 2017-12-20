import * as actions from '../actionsType'
import {Toast} from 'antd-mobile';

const initState = {
  loading: false,   // 控制请求的loading的开关
  cities: [],       // 城市列表
  currentCityId: '', // 当前选择的城市id
  searchList: []
};
export default function list(state = initState, action) {
  switch (action.type) {
    case actions.OPEN_LOADING:
      if (!state.loading) Toast.loading('拼命加载中!', 0);
      return {...state, loading: true};
    case actions.CLOSE_LOADING:
      if (state.loading) Toast.hide();
      return {...state, loading: false};
    case actions.STORE_INDEX_CITIES :
      return Object.assign({}, state, {cities: action.payload});
    case actions.STORE_CURRENT_CITY :
      return {...state, currentCityId: action.payload};
    case actions.STORE_SEARCH_LIST :
      return Object.assign({}, state, {searchList: [...state.searchList, action.payload]});
    case actions.CLEAR_SEARCH_LIST :
      return Object.assign({}, state, {searchList: []});
    default:
      return state
  }
}

