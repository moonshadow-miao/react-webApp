import React from 'react';
import asyncComponent from "../utils/Bundlle";

const RegisterInput = asyncComponent(() => import("../components/login/RegisterInput"));
const HeaderNav = window.common.HeaderNav;
const ForgetPwd = () => {
  return (
      <div className='container'>
        <HeaderNav title='忘记密码'/>
        <RegisterInput type='2' submit={()=>{}}/>
      </div>
  );
}

export default ForgetPwd;