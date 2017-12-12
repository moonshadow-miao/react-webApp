import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import {Icon} from 'antd-mobile';
import '../assets/css/index.less'
import _map from 'lodash/map'
import asyncComponent from "../utils/Bundlle";

const RecommendList = asyncComponent(() => import("../components/index/RecommendList"));

let citys = {
  '0':'上海',
  '1':'北京',
  '2':'深圳',
  '3':'杭州',
  '4':'南京',
  '5':'苏州',
  '6':'广州',
}

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city:'上海',
      cityControl: "cities hide",
      banner:'',
      poster:''
    };
  }

  componentWillMount(){
    this.setState({
      banner:'http://localhost:3030/image/main.png',
      poster:'http://localhost:3030/image/post.gif'
    })
  }

  showCities = (event)=>{
    event.stopPropagation();
    let className = this.state.cityControl.indexOf('hide') === -1 ? 'cities hide' : 'cities';
    this.setState({
      cityControl: className
     })
  }

  hideCities = ()=>{
    this.setState({
      cityControl: 'cities hide'
    })
  }
  
  changeCity(id,name){
    console.log(id);
    this.setState({
      city:name
    })
  }

  render() {
    return (
      <div onClick={this.hideCities} className='index'>
        {/*banner部分*/}
        <div className="banner">
          <img src={this.state.banner} alt="暂无图片"/>
          <div className="city_select">
            <span onClick={this.showCities}>{this.state.city}</span>
            <div className={this.state.cityControl} >
              {
                _map(citys,(v,i)=>(
                  <p key={i} onClick={this.changeCity.bind(this,i,v)}>{v}</p>
                ))
              }
            </div>
          </div>
          <Link to='/login'>
            <div className="login">
              <img src={require('../assets/image/my.png')} alt=""/>
            </div>
          </Link>
          <div className="search">
            <Icon type='search' size='lg'/>
            <span> 输入区域，小区搜索房源</span>
          </div>
        </div>

        {/*分类导航和广告部分*/}
        <ul className='nav'>
          <li>
            <img src={require('../assets/image/nav1.png')} alt=""/>
          </li>
          <li>
            <img src={require('../assets/image/nav2.png')} alt=""/>
          </li>
          <li>
            <img src={require('../assets/image/nav3.png')} alt=""/>
          </li>
          <li>
            <img src={require('../assets/image/nav4.png')} alt=""/>
          </li>
        </ul>
        <div className="poster">
          <img src = {this.state.poster} alt=""/>
        </div>

        {/*租户列表部分*/}
        <RecommendList />
      </div>
    );
  }
}

export default Index;