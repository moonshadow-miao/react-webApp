import request from './request'
import {request_param} from '../utils/index'

// 获取首页广告gif 和 首页banner图
export async function Api_getIndexImg(id = '1') {
  return request('/api/info/get-index-img/'+id);
}

// 获取首页城市列表
export async function Api_getCities() {
  return request('/api/info/get-cities');
}