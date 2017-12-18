import request from './request'

export async function Api_getBanner() {
  return request('/api/info/get-banner');
}

export async function Api_getPoster() {
  return request('/api/info/get-poster');
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}