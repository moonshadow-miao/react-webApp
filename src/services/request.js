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

export default function request(url, options) {
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

  return fetch(url, newOptions)
  .then(checkStatus)
  .then(response => response.json())
  .catch((error) => {
    if (error.code) {
      Toast.fail(error.name + error.message, 1.5)
    }
    if ('stack' in error && 'message' in error) {
      Toast.fail(`请求错误: ${url}`+ error.message, 1.5)
    }
    return error;
  });
}
