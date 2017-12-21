import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'antd-mobile'
import {Link} from 'react-router-dom'

HeaderSearch.prototypes = {
  cities: PropTypes.array.isRequired,
  currentCity: PropTypes.object.isRequired,
  storeCity: PropTypes.func.isRequired
};


export default function HeaderSearch(prop) {
  let textInput = null

  const showControl = () => {
    let className = textInput.className.indexOf('hide') === -1 ? 'cities hide' : 'cities';
    textInput.className = className
  };

  return (<div className='search clearfix'>
    <Link to='/'>
      <div className="img fl">
        <img src={require('../../assets/image/home.png')} alt=""/>
      </div>
    </Link>
    <div className="city_select fl">
      <span onClick={showControl}>{prop.currentCity.city_name}</span>
      <div className='cities hide' ref={(input) => {
        textInput = input;
      }}>
        {
          prop.cities.map((v, i) => (
            <p key={i} onClick={prop.storeCity.bind(this, v)}>{v.city_name}</p>
          ))
        }
      </div>
    </div>
    <Link to='/search'>
      <div className="searchBox fl">
        <Icon size='lg' type='search'/>
        <span className='input'>输入区域,小区搜索房源</span>
      </div>
    </Link>
    <Link to='/login'>
      <div className="login fr">
        <img src={require('../../assets/image/my.png')} alt="暂无照片"/>
      </div>
    </Link>
  </div>)
}