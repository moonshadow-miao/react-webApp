import mongoose from './db.js';
const nodemailer = require('nodemailer');
let Schema = mongoose.Schema;
let transporter = nodemailer.createTransport({
  host: '1536550929@qq.com',
  service: 'qq',
  secure: true,
  auth: {
    user: '1536550929@qq.com', //邮箱的账号
    pass: 'vsfiaaacwsdeiiif'//邮箱的密码 授权码,通过QQ获取
  }
});
let mailOptions = {
  from: '1536550929@qq.com', //邮件来源
  to: '1024104763@qq.com', //邮件发送到哪里，多个邮箱使用逗号隔开
  subject: '验证码', // 邮件主题
  text: 'Hello world ?', // 存文本类型的邮件正文
  html: '<b>Hello world ?</b>' // html类型的邮件正文
};
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     return console.log(error);
//   }
//   console.log('Message %s sent: %s', info.messageId, info.response);
// });
let UserSchema = new Schema({
  email: {type: String},                    //用户账号
  pwd: {type: String},                        //密码
  register_date: {type: Date},                      //最近登录时间
  region: {
    latitude: Number,
    longitude: Number,
    city_name: String
  },                      //最近登录时间
});

export default mongoose.model('User', UserSchema)