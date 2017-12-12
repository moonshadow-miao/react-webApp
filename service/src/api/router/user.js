import KoaRouter from 'koa-router';
import User from '../model/user'

const user = KoaRouter();

user.post('/get-verify-code', async () => {

});

user.post('/register', async (ctx, next) => {
  let param = ctx.request.body;
  // 邮箱的验证正则
  let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

  // 校验参数
  if (!(param.email && param.pwd && param.verify)) {
    throw new MyError('参数不全!')
  }
  if (!reg.test(param.email)) {
    throw new MyError('请正确输入邮箱!')
  }
  if (param.pwd.length < 6) {
    throw new MyError('密码至少 6 个字符')
  }
  if (param.verify === '5') {
    throw new MyError('验证码不正确!')
  }

  ctx.response.type = 'json';
  ctx.status = 200;
  ctx.body = {data: 'Hello Worldsss'};
  let user = new User();
  user.add({
    email: param.email,                  // 用户邮箱
    pwd: param.pwd,                     // 密码
    register_date: new Date(),               // 注册时间
    region: param.region                // 注册地址信息
  }, function (err, res) {
    if (err) {
      console.log("Error:" + err);
      throw new Error();
    }
    else {
      console.log("Res:" + res);
      next();
    }
  });
});

export default user


