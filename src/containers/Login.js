import React, {Component} from 'react';
import '../assets/css/login.less'
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='login'>
        <div className="top">
          <div className="back">
            <img className='fl' src={require('../assets/image/left.png')} alt=""/>
          </div>
          <div className="logo">
            <img src='http://localhost:3030/image/login_logo.png' alt=""/>
            <div className="wave"><div></div></div>
            <div className="wave"><div></div></div>
            <div className="wave"><div></div></div>
          </div>
        </div>
        <ul className="tab">
          <li className="tab_sub active">快速登录</li>
          <li className="tab_sub">账号登录</li>
        </ul>
      </div>
    );
  }
}

export default Login;