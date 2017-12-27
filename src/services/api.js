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

// 获取邮箱验证码
export async function Api_verifyCode(mail) {
  return request('/api/user/get-verify-code'+ request_param({mail:mail}));
}

// 登录
export async function Api_load(obj) {
  return request('/api/user/load',{method:"POST", body:{...obj}});
}

// 注册
export async function Api_register(obj) {
  return request('/api/user/register',{method:"POST", body:{...obj}});
}

// 修改密码
export async function Api_updatePwd(obj) {
  return request('/api/user/update-pwd',{method:"PATCH", body:{...obj}});
}