import React, {Component} from 'react';
import asyncComponent from "../utils/Bundlle";

const RegisterInput = asyncComponent(() => import("../components/login/RegisterInput"));
const HeaderNav = window.common.HeaderNav;
class ForgetPwd extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='container'>
        <HeaderNav title='忘记密码'/>
        <RegisterInput type='2' submit={()=>{}}/>
      </div>
    );
  }
}

export default ForgetPwd;