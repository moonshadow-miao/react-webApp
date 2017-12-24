import * as actions from '../actionsType'

const index = {
  banner: '',  // 首页banner图
  poster: '',  // 首页中部广告动图
  city: [],    // 城市列表,顶部切换下拉框,
  recommendRoom: {},  // 精选房源
  roomList: [],
  indexSite: 0 , // 记录首页位置
  findSite: 0 , // 记录找房页面位置
  detailSite: 0 , // 记录房间详情页面位置
};

export default function list(state = index, action) {
  switch (action.type) {
    case actions.GET_INDEX_BANNER:
      return {...state, banner: action.payload};
    case actions.GET_INDEX_POSTER:
      return {...state, poster: action.payload};
    case actions.SET_INDEX_SITE :
      return {...state, indexSite: action.payload};
    case actions.SET_FIND_SITE :
      return {...state, findSite: action.payload};
    case actions.SET_DETAIL_SITE :
      return {...state, detailSite: action.payload};
    default:
      return state
  }
}