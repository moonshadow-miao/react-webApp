import * as actions from '../actionsType'
import {Toast} from 'antd-mobile';

const initState = {
  loading: false,
  cities: [],
  currentCityId: '',
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
    default:
      return state
  }
}

