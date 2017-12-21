import React from 'react';
import {Icon} from 'antd-mobile';

const FooterTip = () => {
  let footer = null,
    close = () => {
      footer.className += ' hide'
    };
  return (
    <div className='footer clearfix' ref={(node) => {
      footer = node;
    }}>
      <div className='close fl' onClick={close}>
        <Icon type='cross-circle' size='sm'/>
      </div>
      <div className="logo fl">
        <img src={RES_URL + "image/logo.png"} alt=""/>
      </div>
      <div className="text fl">
        <h3>租房就找巴乐兔</h3>
        <p>押1付1，0中介费，<em data-v-6c20eb43="">100%</em>实拍房源</p>
      </div>
      <a className="download fr" href="https://download.baletu.com/app?from=homeh5">下载APP</a>
    </div>
  );

}

export default FooterTip;