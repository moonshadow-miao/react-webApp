import React, {Component} from 'react';
import {Toast} from 'antd-mobile'
import 'antd-mobile/lib/toast/style';
import PropTypes from 'prop-types';
import {is} from 'immutable'
import '../../assets/css/register.less'
import {Mixin} from '../../mixins/loginInput'
import {mailValid} from "../../utils";
import {Api_register,Api_updatePwd} from '../../services/api'
class RegisterInput extends Mixin(Component) {
  static propTypes = {
    type:PropTypes.string,
    submit:PropTypes.func.isRequired
  }

  static defaultProps = {
    type:'1'
  }

  shouldComponentUpdate (nextProps, nextState){
    return !(this.props === nextProps || is(this.props, nextProps)) ||
      !(this.state === nextState || is(this.state, nextState));
  }

  submit = ()=>{
    if (!mailValid(this.state.formData.mail)) return Toast.info('请输入正确的邮箱', 1);
    if (!this.state.formData.code) return Toast.info('请输入验证码', 1);
    if (!this.state.formData.password) return Toast.info('请输入密码', 1);

    if(this.props.type === '1'){   // 判断是注册
      Api_register(this.state.formData).then(res=>{
       if(res) {
         Toast.info('注册成功', 1);
         this.props.history.push('/login')
       }
      });
      return
    }
    // 判断是修改密码
    Api_updatePwd(this.state.formData).then(res=>{
      if(res) {
        Toast.info('修改成功', 1);
        this.props.history.push('/login')
      }
    })

  };

  render() {
    return (
      <div className='register'>
        <div className="inputs">
          <div className="input">
            <em className='icon-envelope'> </em>
            <input type="text" placeholder='请输入邮箱' value={this.state.formData.mail} onChange={this.changeInput.bind(this,'mail')}/>
            <span className='fr' onClick={this.getCode}>{this.state.codeTip}</span>
          </div>
          <div className="input">
            <em className='icon-key'> </em>
            <input type="password"  value={this.state.formData.password} onChange={this.changeInput.bind(this,'password')} placeholder={this.props.type === '1' ? '请输入密码' : '请输入新密码'}/>
          </div>
          <div className="input">
            <em className='icon-key'> </em>
            <input className='verify' type="text" value={this.state.formData.code} onChange={this.changeInput.bind(this,'code')} placeholder={this.props.type === '1' ? '请输入密码' : '请输入新密码'} placeholder='请输入验证码'/>
          </div>
        </div>
        <div className="submit">
          <button className={this.state.allowLoad ? 'active' : ''} onClick={this.submit}>{this.props.type === '1' ? '注册' : '修改完成'}</button>
        </div>
      </div>
    );
  }
}


export default RegisterInput;