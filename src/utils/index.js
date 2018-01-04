// 节流函数
export let throttle = (fn, delay = 100) => {
  let timer = null;
  return function on() {
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

// 读取本地存储
export function getSession(key) {
  return window.sessionStorage.getItem(key) == null || window.sessionStorage.getItem(key) == 'undefined'  ? null :JSON.parse(window.sessionStorage.getItem(key))
}

// 设置本地存储
export function setSession(key,value) {
  window.sessionStorage.setItem(key,JSON.stringify(value));
}

// 验证邮箱合法性
export function mailValid(mail) {
  return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(mail);
}

// 混合
export function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list);
  };
}

export function mix(...mixins) {
  class Mix {}

  for (let mixin of mixins) {
    copyProperties(Mix, mixin); // 拷贝实例属性
    copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
  }

  return Mix;
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if ( key !== "constructor" && key !== "prototype" && key !== "name") {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}

