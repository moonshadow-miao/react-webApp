import KoaRouter from 'koa-router';
import User from '../model/user'

const user = KoaRouter();

user.get('/',
  async (ctx, next) => {
    ctx.response.type = 'json';
    ctx.status = 200;
    ctx.body = {data: 'Hello Worldsss'};
    let user = new User({
      username: 'miaody',                 //用户账号
      userpwd: '1339',                            //密码
      logindate: new Date()                      //最近登录时间
    });
    user.save(function (err, res) {
      if (err) {
        console.log("Error:" + err);
      }
      else {
        console.log("Res:" + res);
      }
    });
  });

export default user


