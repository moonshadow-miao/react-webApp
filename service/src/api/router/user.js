import KoaRouter from 'koa-router';
import User from '../model/user'
import {getMailHtml, DateParse, getCode ,mailValid} from "../../utils/index";
import {code_session} from '../../utils/session'
import {returnMsg,isExpire} from '../../utils/index'
import nodemailer from 'nodemailer'
import md5 from 'md5';

const user = KoaRouter();
let transporter = nodemailer.createTransport({
  host: '1536550929@qq.com',
  service: 'qq',
  secure: true,
  auth: {
    user: '1536550929@qq.com', //邮箱的账号
    pass: 'vsfiaaacwsdeiiif'   //邮箱的密码 授权码,通过QQ获取
  }
});

let mailOptions = {
  from: '1536550929@qq.com', //邮件来源
  to: '1024104763@qq.com', //邮件发送到哪里，多个邮箱使用逗号隔开
  subject: '验证码', // 邮件主题
  html: '' // html类型的邮件正文
};

user.post('/get-verify-code', async (ctx, next) => {
  let time = DateParse(new Date());
  let code = getCode();
  let id = md5(getCode())
  code_session.push({
    id: id,
    code: code,  //激活码，格式自己定义
    date: new Date().getTime() + 15 * 60 * 1000, //过期日期，过期后不能激活
    isLive: false  //判断是否激活
  });
  mailOptions.html = getMailHtml(code, time);
  mailOptions.to = ctx.request.body.mail;
  try {
    let res = await transporter.sendMail(mailOptions);
    console.log('Message sent:', res.messageId, res.response);
    ctx.response.type = 'json';
    ctx.status = 200;
    ctx.body = returnMsg.success;
    ctx.cookies.set('code_id', id, {
      overwrite: true,
      maxAge: 15 * 60 * 1000,
      httpOnly: false
    });
  } catch (err) {
    console.log(err)
    ctx.throw('邮箱服务有误', 401);
  }
  next()
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

user.post('/load', async (ctx, next) => {
  let code_id = ctx.cookies.get('code_id'),
    param = ctx.request.body;
  if(param.type === '1'){  //  判断是验证码登录
    let code_info = code_session.find(v => (v.id = code_id));
    if(!mailValid(param.mail.trim())) throw new MyError('邮箱格式不正确!',209);
    if(!code_info)throw new MyError('验证码不存在!',209);
    if(code_info.code !== param.code.trim()*1) throw new MyError('验证码不正确!',209);
    if(isExpire(code_info.date,null,15)) throw new MyError('验证码过期!',209);
    code_info.isLive = true;
  }else {   // 判断是密码登录

  }

  ctx.response.type = 'json';
  ctx.status = 200;
  ctx.body = {...returnMsg.success, msg: '登录成功!'};
});

export default user


