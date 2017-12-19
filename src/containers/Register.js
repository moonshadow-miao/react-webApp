import React, {Component} from 'react';
import asyncComponent from "../utils/Bundlle";

const RegisterInput = asyncComponent(() => import("../components/login/RegisterInput"));
const HeaderNav = window.common.HeaderNav;
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='container'>
        <HeaderNav title='欢迎注册'/>
        <RegisterInput type='1' submit={()=>{}}/>
      </div>
    );
  }
}

export default Register;