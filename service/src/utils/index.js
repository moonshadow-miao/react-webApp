export const returnMsg = {
  success: {
    msg:'请求成功!',
    code:200
  },
  error_param_short: {
    msg:'参数不全',
    code:209
  },
  error_param: {
    msg:'参数错误',
    code:209
  },
}

// 发送验证码的html
export function getMailHtml(code,time) {
  return `<style>
          </style>
          <meta charset="UTF-8">
          <h3>亲爱的朋友 :</h3>
          <p>您好!</p>
          <p>感谢您访问我的个人项目,您正在获取邮箱验证码,请在验证码输入框输入如下:</p>
          <b>${code}</b> 以完成验证(验证码15分钟有效) .
          <p>如非本人操作,请忽略此邮件,由此给您带来的不便请谅解!</p>
          <br>
          <br>
          <p>庙同学</p>
          <p>${time}</p>`
}

// 时间转 年月日格式
export function DateParse(time) {
  return (time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日');
}

// 获取6位随机数字
export function getCode() {
  return parseInt(Math.random()*100000);
}

// 判断时间是否过期
export function isExpire(start = new Date().getTime(),end = new Date().getTime(),time) {
  time = time *1000 * 60;
  return (start - end) < time
}


// 验证邮箱合法性
export function mailValid(mail) {
  return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(mail);
}