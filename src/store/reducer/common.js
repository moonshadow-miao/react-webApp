import * as actions from '../actionsType'
import {Toast} from 'antd-mobile';

const initState = {
  loading:false
};

export default function list(state = initState, action) {
  switch (action.type) {
    case actions.OPEN_LOADING:
      if(!state.loading) Toast.loading('拼命加载中!', 0);
      return Object.assign({},...state,{loading: true});
    case actions.CLOSE_LOADING:
      if(state.loading) Toast.hide();
      return Object.assign({},...state,{loading: false});
    default:
      return state
  }
}

