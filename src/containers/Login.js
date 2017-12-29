import React, {Component} from 'react';
import '../assets/css/login.less'
import {Modal, Toast} from 'antd-mobile'
import {Link} from 'react-router-dom'
import {is} from 'immutable'
import asyncComponent from "../utils/Bundlle";
import {Api_load} from '../services/api'
import {mailValid} from '../utils/index'
import {Mixin} from '../mixins/loginInput'

const Agreement = asyncComponent(() => import("../components/login/Agreement"));
const HeaderNav = window.common.HeaderNav;

class Login extends Mixin(Component) {
  state ={
    modal: false,
    ...this.state,
    formData:{ ...this.state.formData, type: '1'},
  };

  shouldComponentUpdate (nextProps, nextState){
    return !(this.props === nextProps || is(this.props, nextProps)) ||
      !(this.state === nextState || is(this.state, nextState));
  }

  componentDidMount() {
    document.body.className = 'loginContainer'
  }

  componentWillUnmount() {
    document.body.className = '';
    clearInterval(this.state.timer)
  }

  // 切换登录方式
  changeTab = type => {
    this.setState({
      formData: Object.assign(this.state.formData, {type: type}),
      allowLoad: false
    })
  }

  // 显示弹出框(协议)
  showPop = e => {
    e.preventDefault()
    this.setState({
      modal: true
    })
  }

  // 隐藏弹出框(协议)
  hidePop = e => {
    e.preventDefault()
    this.setState({
      modal: false
    })
  };

  // 登录/注册/修改密码
  load = async () => {
    if (!mailValid(this.state.formData.mail)) return Toast.info('请输入正确的邮箱', 1);
    if (this.state.formData.type === '1' && !this.state.formData.code) return Toast.info('请输入验证码', 1);
    if (this.state.formData.type === '2' && !this.state.formData.password) return Toast.info('请输入密码', 1);
    await Api_load(this.state.formData);

    Toast.info('登录成功!页面跳转中...', 1, () => {
      this.props.history.push('/');
    });
  };

  render() {
    return (
      <div className='login container' style={{zIndex: '100', backgroundColor: '#fff'}}>
        <div className="top">
          <HeaderNav/>
          <div className="logo">
            <img src={RES_URL+'image/login_logo.png'} alt=""/>
            <div className="wave">
              <div> </div>
            </div>
            <div className="wave">
              <div> </div>
            </div>
            <div className="wave">
              <div> </div>
            </div>
          </div>
        </div>
        <ul className="tab">
          <li className={this.state.formData.type === '1' ? "active tab_sub" : "tab_sub"}
              onClick={e =>this.changeTab('1',e)}>快速登录
          </li>
          <li className={this.state.formData.type === '2' ? "active tab_sub" : "tab_sub"}
              onClick={e =>this.changeTab('2',e)}>账号登录
          </li>
        </ul>
        <div className="form">
          <div className={this.state.formData.type === '1' ? "" : "hide"}>
            <div className="input">
              <em className='icon-envelope'> </em>
              <input type="text" placeholder='请输入邮箱' value={this.state.formData.mail}
                     onChange={e =>this.changeInput('mail',e)}/>
              <span onClick={this.getCode}>{this.state.codeTip}</span>
            </div>
            <div className="input">
              <em className='icon-key'> </em>
              <input type="text" placeholder='请输入验证码' value={this.state.formData.code}
                     onChange={e =>this.changeInput('code',e)}/>
            </div>
            <div className="tip"><a href="http://www.benpig.com">查看收件箱( 验证码15分钟内有效 )</a></div>
          </div>
          <div className={this.state.formData.type === '2' ? "" : "hide"}>
            <div className="input">
              <em className='icon-envelope'> </em>
              <input type="text" placeholder='请输入邮箱' value={this.state.formData.mail}
                     onChange={e =>this.changeInput('mail',e)}/>
            </div>
            <div className="input">
              <em className='icon-key'> </em>
              <input type="text" placeholder='请输入密码' value={this.state.formData.password}
                     onChange={e =>this.changeInput('password',e)}/>
            </div>
            <div className='clearfix register'>
              <Link to='/forget-pwd'><span className='fl'>忘记密码</span></Link>
              <Link to='register'><span className='fr'>邮箱注册</span></Link>
            </div>
          </div>
          <div className="load">
            <button onClick={this.load} type="submit" className={"login_btn" + (this.state.allowLoad ? ' active' : '')}>登录
            </button>
          </div>
        </div>
        <div className="agreement">
          登录即视为同意
          <span onClick={this.showPop}>
            《巴乐兔服务协议》
          </span>
        </div>
        <Modal visible={this.state.modal} transparent onClose={this.hidePop} closable>
          <Agreement/>
        </Modal>
      </div>
    );
  }
}

export default Login;