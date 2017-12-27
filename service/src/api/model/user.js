import mongoose from './db.js';
let Schema = mongoose.Schema;
let UserSchema = new Schema({
  mail:  {     //用户账号
    type: String,
    unique: true,
    required:true
  },
  password: {type: String,required:true },                        //密码
  register_date: {type: Date,default: Date.now},                      //最近登录时间
});

UserSchema.static('findByMail', function (mail, callback) {
  return this.find({ mail: mail }, callback);
});

export default mongoose.model('User', UserSchema)