import {Toast,ActivityIndicator} from 'antd-mobile';

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
  Toast.loading('拼命加载中!', 0);
  return fetch(url, newOptions)
  .then(checkStatus)
  .then(response =>{
    Toast.hide();
    let res = response.json(),
        data = null;
    res.code === 200 ? data = res.data : Toast.fail(res.msg, 1.5);
    return data
  })
  .catch((error) => {
    Toast.hide();
    if (error.code) {
      Toast.fail(error.name + error.msg, 1.5)
    }
    if ('stack' in error && 'message' in error) {
      Toast.fail(`请求错误: ${url}`+ error.msg, 1.5)
    }
    return error;
  });
}
