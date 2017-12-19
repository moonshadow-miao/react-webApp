import React, {Component} from 'react';
import '../assets/css/login.less'
import {Modal} from 'antd-mobile'
import {Link} from 'react-router-dom'
import asyncComponent from "../utils/Bundlle";
const Agreement = asyncComponent(() => import("../components/login/Agreement"));

const HeaderNav = window.common.HeaderNav;
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData:{
        active:'1' ,
      },
      modal:false
    };
  }

  componentDidMount(){
    document.body.className = 'loginContainer'
  }

  componentWillUnmount(){
    document.body.className = ''
  }

  changeTab(type){
    this.setState({
      formData: Object.assign(this.state.formData,{active:type})
    })
  }

  showPop = (e)=>{
    e.preventDefault()
    this.setState({
      modal:true
    })
  }

  hidePop = (e)=>{
    e.preventDefault()
    this.setState({
      modal:false
    })
  }

  render() {
    return (
      <div className='login container'>
        <div className="top">
          <HeaderNav/>
          <div className="logo">
            <img src='http://localhost:3030/image/login_logo.png' alt=""/>
            <div className="wave"><div></div></div>
            <div className="wave"><div></div></div>
            <div className="wave"><div></div></div>
          </div>
        </div>
        <ul className="tab">
          <li className = {this.state.formData.active === '1' ? "active tab_sub":"tab_sub"} onClick={this.changeTab.bind(this,'1')}>快速登录</li>
          <li className = {this.state.formData.active === '2'? "active tab_sub":"tab_sub"} onClick={this.changeTab.bind(this,'2')} >账号登录</li>
        </ul>
        <div className="form">
          <div className = {this.state.formData.active === '1' ? "":"hide"}>
            <div className="input">
              <em className='icon-envelope'></em>
              <input type="text" placeholder='请输入邮箱'/>
              <span>获取验证码</span>
            </div>
            <div className="input">
              <em className='icon-key'></em>
              <input type="text" placeholder='请输入验证码'/>
            </div>
            <div className="tip"><a href="http://www.benpig.com">查看收件箱(收不到验证码？请留意垃圾箱)</a></div>
          </div>
          <div className = {this.state.formData.active === '2' ? "":"hide"}>
            <div className="input">
              <em className='icon-envelope'></em>
              <input type="text" placeholder='请输入邮箱'/>
            </div>
            <div className="input">
              <em className='icon-key'></em>
              <input type="text" placeholder='请输入密码'/>
            </div>
            <div className='clearfix register'>
              <Link to='/forget-pwd'><span className='fl'>忘记密码</span></Link>
              <Link to='register'><span className='fr'>手机号注册</span></Link>
            </div>
          </div>
          <div className="load">
            <button type="submit" className="login_btn">登录</button>
          </div>
        </div>
        <div className="agreement">
          登录即视为同意
          <span onClick={this.showPop}>
            《巴乐兔服务协议》
          </span>
        </div>
        <Modal visible={this.state.modal} transparent onClose={this.hidePop} closable>
          <Agreement />
        </Modal>
      </div>
    );
  }
}

export default Login;