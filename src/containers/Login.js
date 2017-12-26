import React, {Component} from 'react';
import '../assets/css/login.less'
import {Modal, Toast} from 'antd-mobile'
import {Link} from 'react-router-dom'
import asyncComponent from "../utils/Bundlle";
import {Api_verifyCode,Api_load} from '../services/api'
import {mailValid} from '../utils/index'

const Agreement = asyncComponent(() => import("../components/login/Agreement"));
const HeaderNav = window.common.HeaderNav;
let time = null;
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        type: '1',
        mail: '',
        password: '',
        code: ''
      },
      modal: false,
      allowLoad: false ,
      allowSendCode:true,
      codeTip:'获取验证码'
    };
  }

  componentDidMount() {
    document.body.className = 'loginContainer'
  }

  componentWillUnmount() {
    document.body.className = '';
    clearInterval(time)
  }

  // 切换登录方式
  changeTab(type) {
    this.setState({
      formData: Object.assign(this.state.formData, {type: type}),
      allowLoad: false
    })
  }

  // 显示弹出框(协议)
  showPop = (e) => {
    e.preventDefault()
    this.setState({
      modal: true
    })
  }

  // 隐藏弹出框(协议)
  hidePop = (e) => {
    e.preventDefault()
    this.setState({
      modal: false
    })
  };

  // 获取验证码
  getCode = async () => {
    if(!this.state.allowSendCode) return
    if(!mailValid(this.state.formData.mail)) return Toast.info('请输入正确的邮箱', 1);
    await Api_verifyCode(this.state.formData.mail);
    Toast.success('验证码已发送!', 1);
    this.setState({allowSendCode:false});
    let num = 60;
    time = setInterval(()=>{
      if(num <= 0 ){
        this.setState({codeTip:'获取验证码',allowSendCode:true});
        clearInterval(time);
        return
      }
      this.setState({codeTip:`${num}秒后重新获取`});
      num--
    },1000);
  };

  // 输入框的双向数据绑定
  changeInput(value,e){
    this.setState({
      formData: {...this.state.formData, [value]: e.target.value},
      allowLoad: true
    })
  };

  load =async () => {
    if(!mailValid(this.state.formData.mail)) return Toast.info('请输入正确的邮箱', 1);
    if(this.state.formData.type === '1' && !this.state.formData.code) return Toast.info('请输入验证码', 1);
    if(this.state.formData.type === '2' && !this.state.formData.password) return Toast.info('请输入密码', 1);
    await Api_load(this.state.formData);

    Toast.info('登录成功!页面跳转中...', 1 ,()=>{
      this.props.history.push('/');
    });
  };

  render() {
    return (
      <div className='login container' style={{zIndex: '100', backgroundColor: '#fff'}}>
        <div className="top">
          <HeaderNav/>
          <div className="logo">
            <img src='http://localhost:3030/image/login_logo.png' alt=""/>
            <div className="wave">
              <div></div>
            </div>
            <div className="wave">
              <div></div>
            </div>
            <div className="wave">
              <div></div>
            </div>
          </div>
        </div>
        <ul className="tab">
          <li className={this.state.formData.type === '1' ? "active tab_sub" : "tab_sub"}
              onClick={this.changeTab.bind(this, '1')}>快速登录
          </li>
          <li className={this.state.formData.type === '2' ? "active tab_sub" : "tab_sub"}
              onClick={this.changeTab.bind(this, '2')}>账号登录
          </li>
        </ul>
        <div className="form">
          <div className={this.state.formData.type === '1' ? "" : "hide"}>
            <div className="input">
              <em className='icon-envelope'></em>
              <input type="text" placeholder='请输入邮箱' value={this.state.formData.mail} onChange={this.changeInput.bind(this,'mail')}/>
              <span onClick={this.getCode}>{this.state.codeTip}</span>
            </div>
            <div className="input">
              <em className='icon-key'></em>
              <input type="text" placeholder='请输入验证码' value={this.state.formData.code} onChange={this.changeInput.bind(this,'code')}/>
            </div>
            <div className="tip"><a href="http://www.benpig.com">查看收件箱( 验证码15分钟内有效 )</a></div>
          </div>
          <div className={this.state.formData.type === '2' ? "" : "hide"}>
            <div className="input">
              <em className='icon-envelope'></em>
              <input type="text" placeholder='请输入邮箱' value={this.state.formData.mail} onChange={this.changeInput.bind(this,'mail')}/>
            </div>
            <div className="input">
              <em className='icon-key'></em>
              <input type="text" placeholder='请输入密码' value={this.state.formData.password} onChange={this.changeInput(this,'password')}/>
            </div>
            <div className='clearfix register'>
              <Link to='/forget-pwd'><span className='fl'>忘记密码</span></Link>
              <Link to='register'><span className='fr'>手机号注册</span></Link>
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