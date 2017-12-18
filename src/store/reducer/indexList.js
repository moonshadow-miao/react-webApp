import * as actions from '../actionsType'

const index = {
  banner: '',  // 首页banner图
  poster: '',  // 首页中部广告动图
  city: [],    // 城市列表,顶部切换下拉框,
  recommendRoom: {},  // 精选房源
  roomList: []
};

export default function list(state = index, action) {
  switch (action.type) {
    case actions.GET_INDEX_BANNER:
      return {...state, banner: action.payload};
    case actions.GET_INDEX_POSTER:
      return {...state, poster: action.payload};
    default:
      return state
  }
}