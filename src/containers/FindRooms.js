import React, {Component} from 'react';
import {Icon} from 'antd-mobile';
import '../assets/css/findRoom.less'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {setFindSite} from '../store/actions/indexList'
import {storeCity} from '../store/actions/common'
import asyncComponent from "../utils/Bundlle";

const GoodRooms = asyncComponent(() => import("../components/index/GoodRooms"));
const HeaderSearch = asyncComponent(() => import("../components/findRooms/HeaderSearch"));
const Filter = asyncComponent(() => import("../components/findRooms/Filter"));

const GoToTop = window.common.GoToTop,
  FooterTip = window.common.FooterTip;



@connect(state => ({
  findSite: state.reducers.index.findSite,
  cities: state.reducers.common.cities,
  currentCity: state.reducers.common.currentCity
}), dispatch => bindActionCreators({setFindSite, storeCity}, dispatch))
class FindRooms extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (<div className="container findRooms">
      <GoToTop site={this.props.findSite} setSite={this.props.setFindSite} container='.findRooms'/>
      <FooterTip/>
      <HeaderSearch cities={this.props.cities} currentCity={this.props.currentCity} storeCity={this.props.storeCity}/>
      <Filter/>
      <GoodRooms lists={[]}/>
    </div>)
  }
}

export default FindRooms