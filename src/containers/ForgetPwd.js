import React from 'react';
import asyncComponent from "../utils/Bundlle";

const RegisterInput = asyncComponent(() => import("../components/login/RegisterInput"));
const HeaderNav = window.common.HeaderNav;
const ForgetPwd = (props) => {
  return (
      <div className='container'>
        <HeaderNav title='忘记密码'/>
        <RegisterInput type='2' push={props.history.push}/>
      </div>
  );
}

export default ForgetPwd;