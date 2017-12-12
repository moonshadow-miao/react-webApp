import mongoose from './db.js';
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  username : { type: String },                    //用户账号
  userpwd: {type: String},                        //密码
  logindate : { type: Date}                       //最近登录时间
});

export default mongoose.model('User',UserSchema)