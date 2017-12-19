// 节流函数
export let throttle = (fn, delay = 100) => {
  let timer = null;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn && fn();
    }, delay);
  }
};

// 参数转化
export function request_param(paramObj) {
  let param = '?';
  for(let k in paramObj){
    param += k + '=' + paramObj[k] + '&';
  }
  return param.slice(0,-1);
}