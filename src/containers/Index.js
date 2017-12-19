import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import {Icon} from 'antd-mobile';
import '../assets/css/index.less'
import asyncComponent from "../utils/Bundlle";
import {connect} from 'react-redux'
import {storeCityId} from '../store/actions/common'
import {setIndexSite} from '../store/actions/indexList'

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({storeCityId,setIndexSite}, dispatch) };
}

const RecommendList = asyncComponent(() => import("../components/index/RecommendList"));

const GoToTop = window.common.GoToTop,
  FooterTip = window.common.FooterTip;

@connect(state => ({...state.reducers.index,cities:state.reducers.common.cities,currentCityId:state.reducers.common.currentCityId}), mapDispatchToProps)
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city:this.props.cities.find(v=>v.city_id === this.props.currentCityId).city_name,
      cityControl: "cities hide",
    };
  }

  showCities = (event)=>{
    event.stopPropagation();
    let className = this.state.cityControl.indexOf('hide') === -1 ? 'cities hide' : 'cities';
    this.setState({
      cityControl: className
     })
  }

  componentWillUnmount() {

  }

  hideCities = ()=>{
    this.setState({
      cityControl: 'cities hide'
    })
  }
  
  changeCity(name,id){
    this.props.actions.storeCityId(id);
    this.setState({
      city:name
    })
  }

  render() {
    return (
      <div onClick={this.hideCities} className='index container' ref ='index'>
          <GoToTop site = {this.props.indexSite} setSite={this.props.actions.setIndexSite} />
          <FooterTip />
            {/*banner部分*/}
            <div className="banner">
              <img src={RES_URL + this.props.banner} alt="暂无图片"/>
              <div className="city_select">
                <span onClick={this.showCities}>{this.state.city}</span>
                <div className={this.state.cityControl} >
                  {
                    this.props.cities.map((v,i)=>(
                      <p key={i} onClick={this.changeCity.bind(this,v.city_name,v.city_id)}>{v.city_name}</p>
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
              <img src = {RES_URL + this.props.poster} alt=""/>
            </div>

            {/*租户列表部分*/}
            <RecommendList />
      </div>
    );
  }
}

export default Index;