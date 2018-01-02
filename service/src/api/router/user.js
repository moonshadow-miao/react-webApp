import KoaRouter from 'koa-router';
import User from '../model/user'
import {getMailHtml, DateParse, getCode, mailValid} from "../../utils/index";
import {code_session} from '../../utils/session'
import {returnMsg, isExpire} from '../../utils/index'
import nodemailer from 'nodemailer'
import md5 from 'md5';
import bcrypt  from 'bcrypt'
import {secret} from "../../congfig";

const user = KoaRouter();

// 邮件发出者配置项
let transporter = nodemailer.createTransport({
  host: '1536550929@qq.com',
  service: 'qq',
  secure: true,
  auth: {
    user: '1536550929@qq.com', //邮箱的账号
    pass: 'vsfiaaacwsdeiiif'   //邮箱的密码 授权码,通过QQ获取
  }
});

// 邮件接收方配置项
let mailOptions = {
  from: '1536550929@qq.com', //邮件来源
  to: '', //邮件发送到哪里，多个邮箱使用逗号隔开
  subject: '验证码', // 邮件主题
  html: '' // html类型的邮件正文
};

// 邮箱和验证码判断
const valid = (param, code_id) => {
  let code_info = code_session.find(v => (v.id = code_id));
  if (!mailValid(param.mail.trim())) throw new MyError('邮箱格式不正确!', 209);
  if (param.mail.trim() !== code_info.mail) throw new MyError('请重新获取验证码!', 209);
  if (!code_info) throw new MyError('验证码不存在!', 209);
  if (code_info.code !== param.code.trim() * 1) throw new MyError('验证码不正确!', 209);
  if (isExpire(code_info.date, null, 15)) throw new MyError('验证码过期!', 209);
  if (param.password && param.password.length < 6) throw new MyError('密码至少 6 个字符', 209);
  code_info.isLive = true;
};

// 发送验证码
user.get('/get-verify-code', async (ctx, next) => {
  if (!ctx.request.query.mail || !mailValid(ctx.request.query.mail.trim())) throw new MyError('邮箱格式不正确!', 209);
  let time = DateParse(new Date());
  let code = getCode();
  let id = md5(getCode());
  code_session.push({
    id: id,
    code: code,  //激活码，格式自己定义
    date: new Date().getTime() + 15 * 60 * 1000, //过期日期，过期后不能激活
    mail: ctx.request.query.mail.trim()
  });
  mailOptions.html = getMailHtml(code, time);
  mailOptions.to = ctx.request.query.mail;
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

// 注册帐号
user.post('/register', async (ctx, next) => {
  let code_id = ctx.cookies.get('code_id'),
    param = ctx.request.body;
  param.password = await bcrypt.hash(param.password, 6);
  console.log('param.password',param.password);
  if (!param.mail || !param.code || !param.password) throw new MyError('参数不全', 209)
  valid(param, code_id);

  let UserSchema = new User({
    mail: param.mail,                   // 用户邮箱
    password: param.password,                // 密码
  });
  try {
    await  UserSchema.save();
  } catch (err) {
    console.log("Error: " + err.errmsg);
    if(err.errmsg.indexOf('duplicate') !== -1){
      throw new MyError('邮箱已存在!',202);
    }
    throw new MyError('系统错误',400);
  }
  ctx.response.type = 'json';
  ctx.status = 200;
  ctx.body = {...returnMsg.success,msg: '注册成功',};
  next();
});

// 修改密码
user.patch('/update-pwd', async (ctx, next) => {
  let code_id = ctx.cookies.get('code_id'),
    param = ctx.request.body;
  if (!param.mail || !param.code || !param.password) throw new MyError('参数不全', 209)
  valid(param, code_id);
  let userInfo = await User.findByMail(param.mail);

  if(userInfo[0].password === param.password ) {
    throw new MyError('新密码和原密码相同!',202);
  }

  if(userInfo.length){
    try {
      await User.update({mail:param.mail},{password:param.password})
    }catch (err){
      throw new MyError(err.message,202);
    }
  }else {
    throw new MyError('邮箱不存在',202);
  }
  ctx.response.type = 'json';
  ctx.status = 200;
  ctx.body = {...returnMsg.success,msg: '密码更改成功'};
  next();
});

// 登录
user.post('/load', async (ctx, next) => {
  let code_id = ctx.cookies.get('code_id'),
    param = ctx.request.body;
  valid(param, code_id);
  if (param.type === '1') {  //  判断是验证码登录

    return
  }   // 判断是密码登录
  let userInfo = await User.findByMail(param.mail);
  if (userInfo.length) {
    let pwdRes = await  bcrypt.compare(param.password, userInfo.password);
    if(pwdRes){
      let token = jwt.sign(userInfo._id.toLocaleString(),secret,{expiresIn:60*60*2})
    }else {
      throw  MyError('密码不正确!',202)
    }
  }


  ctx.response.type = 'json';
  ctx.status = 200;
  ctx.body = {...returnMsg.success, msg: '登录成功!'};
});

export default user


