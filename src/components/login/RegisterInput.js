import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../assets/css/register.less'

class RegisterInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='register'>
        <div className="inputs">
          <div className="input">
            <em className='icon-envelope'></em>
            <input type="text" placeholder='请输入邮箱'/>
          </div>
          <div className="input">
            <em className='icon-key'></em>
            <input type="text" placeholder={this.props.type === '1' ? '请输入密码' : '请输入新密码'}/>
          </div>
          <div className="input">
            <em className='icon-key'></em>
            <input className='verify' type="text" placeholder='请输入验证码'/>
            <span className='fr'>获取验证码</span>
          </div>
        </div>
        <div className="submit">
          <button onClick={this.props.submit}>{this.props.type === '1' ? '注册' : '修改完成'}</button>
        </div>
      </div>
    );
  }
}

RegisterInput.propTypes = {
  type:PropTypes.string,
  submit:PropTypes.func.isRequired
}

RegisterInput.defaultProps = {
  type:'1'
}

export default RegisterInput;