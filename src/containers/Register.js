import React from 'react';
import asyncComponent from "../utils/Bundlle";

const RegisterInput = asyncComponent(() => import("../components/login/RegisterInput"));
const HeaderNav = window.common.HeaderNav;
const Register = (props) => {
  return (
    <div className='container'>
      <HeaderNav title='欢迎注册'/>
      <RegisterInput type='1' push={props.history.push}/>
    </div>
  );
}

export default Register;