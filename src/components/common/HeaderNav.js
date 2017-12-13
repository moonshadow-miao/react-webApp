import React from 'react';
import PropTypes from 'prop-types';
const HeaderNav = (prop) => {
  let goback = () =>{window.history.back()}
  return (<div className="back">
    <img className='fl' onClick={goback} src={require('../../assets/image/left.png')} alt=""/>
    <span>{prop.title}</span>
  </div>)
}

HeaderNav.propTypes = {
  title:PropTypes.string,
}

HeaderNav.defaultProps  = {
  title:''
}

export default HeaderNav