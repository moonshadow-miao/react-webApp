import mongoose from './db.js';
const nodemailer = require('nodemailer');
let Schema = mongoose.Schema;

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