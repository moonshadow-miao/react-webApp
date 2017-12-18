import {Toast,ActivityIndicator} from 'antd-mobile';
import {loading,loaded} from '../store/actions/common'
import store from '../store/index'

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  Toast.fail(`请求错误 ${response.status}: ${response.url}`+response.statusText, 1.5)
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

const BASE_URL = 'http://localhost:3030'

export default function request(url, options) {
  url = BASE_URL + url;
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = {...defaultOptions, ...options};
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.headers = {
      "Accept": 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
      mode:'cors'
    };
    newOptions.body = JSON.stringify(newOptions.body);
  }
  store.dispatch(loading());
  return fetch(url, newOptions)
  .then(checkStatus)
  .then(async response =>{
    store.dispatch(loaded());
    let res = await response.json();
    if(res.code ===200){
      return Promise.resolve(res.data)
    }else {
      throw new Error(res.msg);
    }
  })
  .catch((error) => {
    store.dispatch(loaded());
    if (error.code) {
      Toast.fail(error.name + error.message, 1.5)
    }
    if ('message' in error) {
      Toast.fail(error.message, 1.5)
    }
    return error;
  });
}
