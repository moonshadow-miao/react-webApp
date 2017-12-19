import request from './request'
import {request_param} from '../utils/index'
export async function Api_getBanner() {
  return request('/api/info/get-banner');
}

export async function Api_getPoster() {
  return request('/api/info/get-poster');
}

export async function Api_getCities() {
  return request('/api/info/get-cities/');
}